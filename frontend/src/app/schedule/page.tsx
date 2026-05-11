'use client'

import { Calendar } from 'lucide-react'
import { Header } from '@/components/layout/Header'

export default function SchedulePage() {
  return (
    <>
      <Header title="Agenda" subtitle="Agenda escolar e eventos" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4" style={{ backgroundColor: '#F25C3B' }}>
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-bold text-xl text-navy-900 mb-2">Agenda Escolar</h2>
          <p className="text-ink-light text-sm max-w-xs">Em desenvolvimento. Em breve você poderá visualizar e gerenciar a agenda de atividades e eventos.</p>
        </div>
      </div>
    </>
  )
}
