// ============================================================
// Auth
// ============================================================
export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  name: string
  email: string
  roles: string[]
}

export interface AuthUser {
  name: string
  email: string
  roles: string[]
  token: string
}

// ============================================================
// API
// ============================================================
export interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
  timestamp: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

// ============================================================
// Student
// ============================================================
export interface Student {
  id: string
  unitId: string
  unitName: string
  name: string
  birthDate: string
  cpf: string | null
  rg: string | null
  photoUrl: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  medicalNotes: string | null
  medicalRestrictions: string | null
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  enrollmentDate: string
  createdAt: string
}

export interface StudentRequest {
  unitId: string
  name: string
  birthDate: string
  cpf?: string
  rg?: string
  photoUrl?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  medicalNotes?: string
  medicalRestrictions?: string
  status?: string
}

// ============================================================
// Guardian
// ============================================================
export interface Guardian {
  id: string
  unitId: string
  unitName: string
  name: string
  cpf: string | null
  email: string | null
  phone: string | null
  phoneAlt: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  active: boolean
  createdAt: string
}

export interface GuardianRequest {
  unitId: string
  name: string
  cpf?: string
  email?: string
  phone?: string
  phoneAlt?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

// ============================================================
// Unit
// ============================================================
export interface Unit {
  id: string
  name: string
  cnpj: string | null
  email: string | null
  phone: string | null
  city: string | null
  state: string | null
  active: boolean
}
