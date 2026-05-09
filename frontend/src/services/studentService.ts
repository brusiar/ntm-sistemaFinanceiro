import api from '@/lib/axios'
import { ApiResponse, PageResponse, Student, StudentRequest } from '@/types'

const BASE = '/api/v1/students'

export const studentService = {
  async findAll(unitId: string, params?: { name?: string; status?: string; page?: number; size?: number }) {
    const response = await api.get<ApiResponse<PageResponse<Student>>>(BASE, {
      params: { unitId, ...params },
    })
    return response.data.data
  },

  async findById(id: string) {
    const response = await api.get<ApiResponse<Student>>(`${BASE}/${id}`)
    return response.data.data
  },

  async create(data: StudentRequest) {
    const response = await api.post<ApiResponse<Student>>(BASE, data)
    return response.data.data
  },

  async update(id: string, data: StudentRequest) {
    const response = await api.put<ApiResponse<Student>>(`${BASE}/${id}`, data)
    return response.data.data
  },

  async remove(id: string) {
    await api.delete(`${BASE}/${id}`)
  },
}
