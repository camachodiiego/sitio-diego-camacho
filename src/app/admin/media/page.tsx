import { Mail, Clock } from 'lucide-react'

async function getMensajes() {
  try {
    const { getStore } = await import('@netlify/blobs')
    const store = getStore('mensajes')
    const { blobs } = await store.list()
    const mensajes = await Promise.all(blobs.map(async b => {
      const raw = await store.get(b.key, { type: 'text' })
      return raw ? JSON.parse(raw) : null
    }))
    return mensajes.filter(Boolean).sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  } catch { return [] }
}

export default async function MensajesPage() {
  const mensajes = await getMensajes()
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mensajes de contacto</h1>
        <p className="text-gray-500 mt-1">{mensajes.length} mensaje{mensajes.length !== 1 ? 's' : ''} recibido{mensajes.length !== 1 ? 's' : ''}</p>
      </div>
      {mensajes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <Mail size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="font-medium text-gray-500">No hay mensajes todavía</p>
          <p className="text-sm text-gray-400 mt-1">Cuando alguien llene el formulario de contacto, aparecerá aquí</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mensajes.map((m: any) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{m.nombre}</p>
                  <a href={`mailto:${m.email}`} className="text-sm text-blue-600 hover:text-blue-700">{m.email}</a>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400"><Clock size={12}/>{new Date(m.fecha).toLocaleDateString('es-MX', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{m.mensaje}</p>
              <a href={`mailto:${m.email}?subject=Re: Tu mensaje&body=Hola ${m.nombre},%0A%0A`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"><Mail size={13}/>Responder</a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
