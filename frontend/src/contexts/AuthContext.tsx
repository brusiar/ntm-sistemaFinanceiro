'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AuthUser, LoginRequest } from '@/types'
import api from '@/lib/axios'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = Cookies.get('ntm_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        Cookies.remove('ntm_user')
        Cookies.remove('ntm_token')
      }
    }
    setIsLoading(false)
  }, [])

  async function login(data: LoginRequest) {
    const response = await api.post('/api/v1/auth/login', data)
    const { accessToken, expiresIn, name, email, roles } = response.data.data

    const authUser: AuthUser = { name, email, roles, token: accessToken }

    Cookies.set('ntm_token', accessToken, { expires: expiresIn / 86400000 })
    Cookies.set('ntm_user', JSON.stringify(authUser), { expires: expiresIn / 86400000 })

    setUser(authUser)
    router.push('/dashboard')
  }

  function logout() {
    Cookies.remove('ntm_token')
    Cookies.remove('ntm_user')
    setUser(null)
    router.push('/login')
  }

  function hasRole(role: string): boolean {
    return user?.roles.includes(role) ?? false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
