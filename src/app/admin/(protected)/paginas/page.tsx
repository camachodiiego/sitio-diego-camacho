export default function PaginasPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Páginas</h1>
        <p className="text-gray-500 mt-1">Gestiona el contenido de las secciones del sitio.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {['Inicio', 'Sobre mí', 'Portafolio', 'Contacto'].map((page) => (
          <div key={page} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-medium text-gray-900 text-sm">{page}</p>
              <p className="text-xs text-gray-400 mt-0.5">/{page.toLowerCase().replace(' ', '-')}</p>
            </div>
            <button className="text-xs font-medium text-brand-500 hover:text-brand-600 transition-colors">
              Editar →
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center">
        Editor de contenido completo — Fase 2
      </p>
    </div>
  )
}
