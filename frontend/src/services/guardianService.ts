import api from '@/lib/axios'
import { ApiResponse, Guardian, GuardianRequest, PageResponse } from '@/types'

const BASE = '/api/v1/guardians'

export const guardianService = {
  async findAll(unitId: string, params?: { name?: string; page?: number; size?: number }) {
    const response = await api.get<ApiResponse<PageResponse<Guardian>>>(BASE, {
      params: { unitId, ...params },
    })
    return response.data.data
  },

  async findById(id: string) {
    const response = await api.get<ApiResponse<Guardian>>(`${BASE}/${id}`)
    return response.data.data
  },

  async create(data: GuardianRequest) {
    const response = await api.post<ApiResponse<Guardian>>(BASE, data)
    return response.data.data
  },

  async update(id: string, data: GuardianRequest) {
    const response = await api.put<ApiResponse<Guardian>>(`${BASE}/${id}`, data)
    return response.data.data
  },

  async remove(id: string) {
    await api.delete(`${BASE}/${id}`)
  },
}
