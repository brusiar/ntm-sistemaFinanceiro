'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { StudentForm } from '@/components/forms/StudentForm'
import { useStudent, useUpdateStudent } from '@/hooks/useStudents'
import { StudentRequest } from '@/types'

export default function EditStudentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: student, isLoading } = useStudent(params.id)
  const updateStudent = useUpdateStudent(params.id)

  async function handleSubmit(data: StudentRequest) {
    await updateStudent.mutateAsync(data)
    router.push('/students')
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Header title="Editar Aluno" subtitle={student?.name} />
      <div className="flex-1 p-6 overflow-auto max-w-3xl">
        <StudentForm
          defaultValues={student}
          onSubmit={handleSubmit}
          isLoading={updateStudent.isPending}
        />
      </div>
    </>
  )
}
