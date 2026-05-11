'use client'

import { UserCheck } from 'lucide-react'
import { Header } from '@/components/layout/Header'

export default function GuardiansPage() {
  return (
    <>
      <Header title="Responsáveis" subtitle="Gestão de responsáveis dos alunos" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4" style={{ backgroundColor: '#233045' }}>
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-bold text-xl text-navy-900 mb-2">Módulo de Responsáveis</h2>
          <p className="text-ink-light text-sm max-w-xs">Em desenvolvimento. Em breve você poderá gerenciar os responsáveis vinculados aos alunos.</p>
        </div>
      </div>
    </>
  )
}
