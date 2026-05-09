'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useStudents, useDeleteStudent } from '@/hooks/useStudents'
import { formatDate, getStatusLabel, getStatusColor } from '@/lib/utils'

// ID fixo da unidade matriz para a primeira entrega
const UNIT_ID = '00000000-0000-0000-0000-000000000001'

export default function StudentsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const { data, isLoading } = useStudents(UNIT_ID, { name: search || undefined, page })
  const deleteStudent = useDeleteStudent()

  function handleDelete(id: string, name: string) {
    if (confirm(`Deseja remover o aluno "${name}"?`)) {
      deleteStudent.mutate(id)
    }
  }

  return (
    <>
      <Header title="Alunos" subtitle="Gestão de alunos cadastrados" />
      <div className="flex-1 p-6 overflow-auto">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-700 transition"
            />
          </div>
          <Link href="/students/new">
            <Button>
              <Plus className="w-4 h-4" />
              Novo Aluno
            </Button>
          </Link>
        </div>

        {/* Tabela */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Nome</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Nascimento</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">CPF</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Matrícula</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      Carregando...
                    </td>
                  </tr>
                ) : data?.content.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      Nenhum aluno encontrado
                    </td>
                  </tr>
                ) : (
                  data?.content.map((student) => (
                    <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(student.birthDate)}</td>
                      <td className="px-6 py-4 text-gray-600">{student.cpf ?? '—'}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(student.enrollmentDate)}</td>
                      <td className="px-6 py-4">
                        <Badge
                          label={getStatusLabel(student.status)}
                          className={getStatusColor(student.status)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/students/${student.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(student.id, student.name)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {data.totalElements} aluno{data.totalElements !== 1 ? 's' : ''} encontrado{data.totalElements !== 1 ? 's' : ''}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={data.first}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={data.last}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  )
}
