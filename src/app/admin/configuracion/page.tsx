export default function ConfiguracionPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">Datos generales y ajustes del sitio.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {[
          { label: 'Nombre del sitio',   value: 'Diego Camacho' },
          { label: 'URL del sitio',       value: 'https://sitio-diego-camacho.netlify.app' },
          { label: 'Idioma',              value: 'Español (México)' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            <p className="text-sm text-gray-900 bg-surface-subtle rounded-lg px-3 py-2">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center">
        Configuración editable — Fase 2
      </p>
    </div>
  )
}
