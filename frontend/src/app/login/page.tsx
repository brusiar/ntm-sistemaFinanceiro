'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      setError('')
      await login(data)
    } catch {
      setError('Email ou senha inválidos. Verifique suas credenciais.')
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Painel esquerdo — identidade visual NTM ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-12"
        style={{ backgroundColor: '#233045' }}
      >
        {/* Overlay com gradiente sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(160deg, rgba(242,92,59,0.18) 0%, transparent 55%)',
          }}
        />

        {/* Detalhe geométrico canto inferior */}
        <div
          className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-10"
          style={{
            background: 'radial-gradient(circle at bottom right, #F25C3B, transparent 70%)',
          }}
        />

        {/* Logo topo */}
        <div className="relative z-10">
          <Image
            src="/logo-ntm.png"
            alt="Núcleo de Treinamento Mirim"
            width={160}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Texto central */}
        <div className="relative z-10">
          <div className="w-10 h-1 rounded mb-6" style={{ backgroundColor: '#F25C3B' }} />
          <h2 className="font-bold text-white text-5xl leading-tight mb-5">
            Aprender é<br />
            uma aventura!
          </h2>
          <p className="text-white/50 text-base max-w-xs leading-relaxed">
            Sistema de gestão para o Núcleo de Treinamento Mirim.
            Organização, segurança e profissionalismo em cada detalhe.
          </p>
        </div>

        {/* Rodapé esquerdo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F25C3B' }} />
          <p className="text-white/30 text-xs">
            Formando os heróis de amanhã
          </p>
        </div>
      </div>

      {/* ── Painel direito — formulário ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12">

        {/* Logo mobile */}
        <div className="flex lg:hidden flex-col items-center mb-10">
          <Image
            src="/logo-ntm.png"
            alt="Núcleo de Treinamento Mirim"
            width={140}
            height={70}
            className="object-contain"
            priority
          />
        </div>

        <div className="w-full max-w-sm">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="font-bold text-navy-900 text-3xl leading-tight">
              Acesso ao Sistema
            </h1>
            <p className="text-ink-light text-sm mt-1">
              Entre com suas credenciais para continuar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-ink">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="seu@email.com.br"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
                  style={{ '--tw-ring-color': '#F25C3B' } as React.CSSProperties}
                  onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #F25C3B'}
                  onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-ink">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-ink placeholder:text-gray-400 focus:outline-none transition"
                  onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #F25C3B'}
                  onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                  {...register('password')}
                />
              </div>
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>

            {/* Erro geral */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Botão — cor exata do site #F25C3B */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-full text-white font-semibold text-sm tracking-wide transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#F25C3B' }}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Rodapé */}
          <p className="text-center text-gray-400 text-xs mt-10">
            © {new Date().getFullYear()} Núcleo de Treinamento Mirim
          </p>
        </div>
      </div>
    </div>
  )
}
