'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Bell, Search } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth()

  const initials = user?.name
    ?.split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
      <div>
        <h1 className="font-bold text-2xl text-navy-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-ink-light mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {/* Busca global */}
        <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors">
          <Search className="w-4 h-4" />
          <span>Buscar...</span>
        </button>

        {/* Notificações */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: '#F25C3B' }} />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold"
            style={{ backgroundColor: '#F25C3B' }}
          >
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-navy-900 leading-tight">{user?.name?.split(' ')[0]}</p>
            <p className="text-[11px] text-ink-muted">{user?.roles?.[0]?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
