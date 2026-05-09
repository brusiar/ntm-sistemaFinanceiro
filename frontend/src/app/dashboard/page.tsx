'use client'

import { Users, UserCheck, AlertCircle, TrendingUp, GraduationCap, Calendar } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/contexts/AuthContext'

const metrics = [
  {
    label: 'Total de Alunos',
    value: '—',
    icon: Users,
    borderColor: 'border-l-navy-900',
    iconBg: 'bg-navy-900',
    description: 'Alunos cadastrados',
  },
  {
    label: 'Alunos Ativos',
    value: '—',
    icon: UserCheck,
    borderColor: 'border-l-emerald-600',
    iconBg: 'bg-emerald-600',
    description: 'Em atividade',
  },
  {
    label: 'Inadimplentes',
    value: '—',
    icon: AlertCircle,
    borderColor: 'border-l-primary-500',
    iconBg: 'bg-primary-500',
    description: 'Pagamentos em atraso',
  },
  {
    label: 'Receita Mensal',
    value: '—',
    icon: TrendingUp,
    borderColor: 'border-l-amber-500',
    iconBg: 'bg-amber-500',
    description: 'Mês atual',
  },
]

const quickLinks = [
  { label: 'Cadastrar Aluno', href: '/students/new', icon: GraduationCap, bg: '#233045' },
  { label: 'Ver Agenda',      href: '/schedule',      icon: Calendar,      bg: '#F25C3B' },
  { label: 'Financeiro',      href: '/financial',     icon: TrendingUp,    bg: '#16a34a' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0]

  return (
    <>
      <Header
        title="Dashboard"
        subtitle={`Bem-vindo de volta, ${firstName}!`}
      />

      <div className="flex-1 p-6 overflow-auto space-y-6">

        {/* ── Cards de métricas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map(({ label, value, icon: Icon, borderColor, iconBg, description }) => (
            <div
              key={label}
              className={`bg-white rounded-xl border border-gray-200 border-l-4 ${borderColor} p-5 shadow-card hover:shadow-card-hover transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-ink-light font-medium">{label}</p>
                  <p className="font-bold text-3xl text-navy-900 mt-1">{value}</p>
                  <p className="text-xs text-ink-muted mt-1">{description}</p>
                </div>
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Linha inferior ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Gráfico placeholder */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-navy-900 text-lg">Receita Mensal</h3>
                <p className="text-xs text-gray-400 mt-0.5">Gráfico disponível em breve</p>
              </div>
              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                2024
              </span>
            </div>
            <div className="flex items-end justify-center h-40 gap-2">
              {[40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-sm transition-colors"
                    style={{ height: `${h}%`, backgroundColor: i === 11 ? '#F25C3B' : '#23304520' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'].map((m) => (
                <span key={m} className="flex-1 text-center text-[10px] text-gray-400">{m}</span>
              ))}
            </div>
          </div>

          {/* Acesso rápido */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-card p-6">
            <h3 className="font-bold text-navy-900 text-lg mb-4">Acesso Rápido</h3>
            <div className="space-y-3">
              {quickLinks.map(({ label, href, icon: Icon, bg }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors group"
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-navy-900 transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Faixa institucional NTM */}
            <div
              className="mt-6 rounded-lg p-4 relative overflow-hidden"
              style={{ backgroundColor: '#233045' }}
            >
              <div
                className="absolute top-0 right-0 w-16 h-full opacity-30"
                style={{ background: 'linear-gradient(135deg, transparent 50%, #F25C3B 50%)' }}
              />
              <p className="font-bold text-white text-sm relative z-10">
                Núcleo de Treinamento Mirim
              </p>
              <p className="text-white/50 text-xs mt-1 relative z-10">
                Formando os heróis de amanhã
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
