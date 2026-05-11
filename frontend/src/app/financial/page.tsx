'use client'

import { DollarSign } from 'lucide-react'
import { Header } from '@/components/layout/Header'

export default function FinancialPage() {
  return (
    <>
      <Header title="Financeiro" subtitle="Gestão financeira e cobranças" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4" style={{ backgroundColor: '#233045' }}>
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-bold text-xl text-navy-900 mb-2">Módulo Financeiro</h2>
          <p className="text-ink-light text-sm max-w-xs">Em desenvolvimento. Em breve você poderá gerenciar cobranças, invoices e integrações com Asaas.</p>
        </div>
      </div>
    </>
  )
}
