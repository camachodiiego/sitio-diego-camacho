'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, FileText, Mail, Settings, LogOut, Globe } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { href: '/admin/dashboard',     label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/paginas',       label: 'Contenido',    icon: FileText },
  { href: '/admin/media',         label: 'Mensajes',     icon: Mail },
  { href: '/admin/configuracion', label: 'Configuración',icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><span className="text-white text-xs font-bold">DC</span></div>
          <div><p className="text-sm font-semibold text-gray-900">Diego Camacho</p><p className="text-xs text-gray-400">Panel admin</p></div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href} className={clsx('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors', isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}>
              <Icon size={17} />{label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"><Globe size={17}/>Ver sitio</a>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"><LogOut size={17}/>Cerrar sesión</button>
      </div>
    </aside>
  )
}
