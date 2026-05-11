'use client'

import { BookOpen } from 'lucide-react'
import { Header } from '@/components/layout/Header'

export default function CoursesPage() {
  return (
    <>
      <Header title="Cursos" subtitle="Gestão de turmas e matrículas" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4" style={{ backgroundColor: '#233045' }}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-bold text-xl text-navy-900 mb-2">Módulo de Cursos</h2>
          <p className="text-ink-light text-sm max-w-xs">Em desenvolvimento. Em breve você poderá gerenciar turmas, matrículas e controle de presença.</p>
        </div>
      </div>
    </>
  )
}
