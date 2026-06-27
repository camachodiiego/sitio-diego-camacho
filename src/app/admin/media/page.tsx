export default function MediaPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Archivos y fotos</h1>
        <p className="text-gray-500 mt-1">Sube y organiza los archivos multimedia del sitio.</p>
      </div>

      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
        <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🖼️</span>
        </div>
        <p className="font-medium text-gray-700">Gestor de archivos</p>
        <p className="text-sm text-gray-400 mt-1">Disponible en Fase 2</p>
      </div>
    </div>
  )
}
