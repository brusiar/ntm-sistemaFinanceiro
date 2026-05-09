import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { studentService } from '@/services/studentService'
import { StudentRequest } from '@/types'

export function useStudents(unitId: string, filters?: { name?: string; status?: string; page?: number }) {
  return useQuery({
    queryKey: ['students', unitId, filters],
    queryFn: () => studentService.findAll(unitId, filters),
    enabled: !!unitId,
  })
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => studentService.findById(id),
    enabled: !!id,
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: StudentRequest) => studentService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  })
}

export function useUpdateStudent(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: StudentRequest) => studentService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  })
}

export function useDeleteStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => studentService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  })
}
