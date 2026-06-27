import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { FileText, Image, Settings, Globe } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  {
    href:  '/admin/paginas',
    label: 'Editar páginas',
    desc:  'Gestiona el contenido de cada sección',
    icon:  FileText,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href:  '/admin/media',
    label: 'Archivos y fotos',
    desc:  'Sube y organiza imágenes',
    icon:  Image,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    href:  '/admin/configuracion',
    label: 'Configuración',
    desc:  'Datos generales del sitio',
    icon:  Settings,
    color: 'bg-gray-50 text-gray-600',
  },
]

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {session?.user?.name ?? 'Admin'} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Este es tu panel de administración. Fase 1 activa.
        </p>
      </div>

      {/* Status card */}
      <div className="bg-brand-500 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-brand-100 text-sm font-medium">Estado del sitio</p>
            <p className="text-2xl font-bold mt-1">En línea</p>
            <p className="text-brand-100 text-sm mt-1">Deployed en Netlify · Fase 1</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
            <Globe size={28} className="text-white" />
          </div>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm font-medium
                     bg-white/20 hover:bg-white/30 transition-colors
                     px-4 py-2 rounded-lg"
        >
          Ver sitio público →
        </a>
      </div>

      {/* Quick links */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Accesos rápidos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map(({ href, label, desc, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl border border-gray-100 p-5
                       hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-4`}>
              <Icon size={20} />
            </div>
            <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors">
              {label}
            </p>
            <p className="text-gray-400 text-xs mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
