'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { StudentForm } from '@/components/forms/StudentForm'
import { useCreateStudent } from '@/hooks/useStudents'
import { StudentRequest } from '@/types'

export default function NewStudentPage() {
  const router = useRouter()
  const createStudent = useCreateStudent()

  async function handleSubmit(data: StudentRequest) {
    await createStudent.mutateAsync(data)
    router.push('/students')
  }

  return (
    <>
      <Header title="Novo Aluno" subtitle="Preencha os dados do aluno" />
      <div className="flex-1 p-6 overflow-auto max-w-3xl">
        <StudentForm onSubmit={handleSubmit} isLoading={createStudent.isPending} />
      </div>
    </>
  )
}
