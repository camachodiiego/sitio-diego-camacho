export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Diego Camacho
        </h1>
        <p className="text-xl text-gray-500 mb-10">
          Sitio en construcción. Pronto estará listo.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-brand-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          Fase 1 activa
        </div>
      </div>
    </main>
  )
}
