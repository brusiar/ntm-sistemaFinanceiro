'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  DollarSign,
  Bell,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { href: '/dashboard',     label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/students',      label: 'Alunos',        icon: Users },
  { href: '/guardians',     label: 'Responsáveis',  icon: UserCheck },
  { href: '/courses',       label: 'Cursos',        icon: BookOpen },
  { href: '/schedule',      label: 'Agenda',        icon: Calendar },
  { href: '/financial',     label: 'Financeiro',    icon: DollarSign },
  { href: '/notifications', label: 'Notificações',  icon: Bell },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const initials = user?.name
    ?.split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-navy-900 border-r border-navy-800 scrollbar-thin overflow-y-auto">

      {/* ── Logo oficial NTM ── */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-navy-800">
        <Image
          src="/logo-ntm.png"
          alt="Núcleo de Treinamento Mirim"
          width={120}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      {/* ── Navegação ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-navy-500/60">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-primary-500/15 text-white border-l-2 border-primary-500 pl-[10px]'
                  : 'text-sidebar-text hover:bg-navy-800 hover:text-white border-l-2 border-transparent'
              )}
            >
              <Icon className={cn(
                'w-4 h-4 shrink-0 transition-colors',
                active ? 'text-primary-500' : 'text-sidebar-text group-hover:text-white'
              )} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── Usuário + Logout ── */}
      <div className="px-3 py-4 border-t border-navy-800 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate leading-tight">{user?.name}</p>
            <p className="text-[11px] text-sidebar-text truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-text hover:bg-red-900/30 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
