import { getContent } from '@/lib/content'
import { ContactForm } from '@/components/public/ContactForm'

export const revalidate = 60

export default async function HomePage() {
  const content = await getContent()

  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-lg">{content.hero.titulo}</span>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#portafolio" className="hover:text-gray-900 transition-colors">Portafolio</a>
            <a href="#servicios" className="hover:text-gray-900 transition-colors">Servicios</a>
            <a href="#sobre-mi" className="hover:text-gray-900 transition-colors">Sobre mí</a>
            <a href="#contacto" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 min-h-screen flex items-center bg-gray-950 text-white relative overflow-hidden">
        {content.hero.imagenUrl && (
          <div className="absolute inset-0">
            <img src={content.hero.imagenUrl} alt="Hero" className="w-full h-full object-cover opacity-40" />
          </div>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <p className="text-blue-400 font-medium text-sm tracking-widest uppercase mb-4">{content.hero.subtitulo}</p>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">{content.hero.titulo}</h1>
          <p className="text-xl text-gray-300 max-w-xl mb-10">{content.hero.descripcion}</p>
          <div className="flex gap-4">
            <a href="#portafolio" className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">Ver portafolio</a>
            <a href="#contacto" className="border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">Contáctame</a>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO */}
      <section id="portafolio" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-2">Trabajos</p>
            <h2 className="text-4xl font-bold text-gray-900">Portafolio</h2>
          </div>
          {content.portafolio.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.portafolio.map((item) => (
                <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  {item.imagenUrl && (
                    <img src={item.imagenUrl} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <div>
                      <p className="text-white font-semibold">{item.titulo}</p>
                      <p className="text-gray-300 text-sm">{item.categoria}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-4">📷</p>
              <p>Próximamente — agrega fotos desde el panel admin</p>
            </div>
          )}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-2">¿Qué ofrezco?</p>
            <h2 className="text-4xl font-bold text-gray-900">Servicios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.servicios.map((servicio) => (
              <div key={servicio.id} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                  <span className="text-2xl">📷</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{servicio.titulo}</h3>
                <p className="text-gray-500 mb-6">{servicio.descripcion}</p>
                <p className="text-blue-600 font-bold text-lg">{servicio.precio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-2">Conóceme</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{content.sobreMi.titulo}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{content.sobreMi.texto}</p>
            </div>
            <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden">
              {content.sobreMi.imagenUrl
                ? <img src={content.sobreMi.imagenUrl} alt="Diego Camacho" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-6xl">👨‍🎨</div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-2">Hablemos</p>
              <h2 className="text-4xl font-bold mb-6">Contáctame</h2>
              <div className="space-y-4 text-gray-300">
                {content.contacto.email && <p>📧 <a href={`mailto:${content.contacto.email}`} className="hover:text-white">{content.contacto.email}</a></p>}
                {content.contacto.telefono && <p>📱 {content.contacto.telefono}</p>}
                {content.contacto.instagram && <p>📸 <a href={`https://instagram.com/${content.contacto.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">@{content.contacto.instagram}</a></p>}
                {content.contacto.whatsapp && <p>💬 <a href={`https://wa.me/${content.contacto.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></p>}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        © {new Date().getFullYear()} {content.hero.titulo}. Todos los derechos reservados.
      </footer>
    </main>
  )
}
