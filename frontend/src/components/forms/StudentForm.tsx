'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Student, StudentRequest } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento obrigatória'),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().max(2).optional(),
  zipCode: z.string().optional(),
  medicalNotes: z.string().optional(),
  medicalRestrictions: z.string().optional(),
  status: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface StudentFormProps {
  defaultValues?: Partial<Student>
  onSubmit: (data: StudentRequest) => Promise<void>
  isLoading?: boolean
}

const UNIT_ID = '00000000-0000-0000-0000-000000000001'

export function StudentForm({ defaultValues, onSubmit, isLoading }: StudentFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      birthDate: defaultValues?.birthDate ?? '',
      cpf: defaultValues?.cpf ?? '',
      rg: defaultValues?.rg ?? '',
      address: defaultValues?.address ?? '',
      city: defaultValues?.city ?? '',
      state: defaultValues?.state ?? '',
      zipCode: defaultValues?.zipCode ?? '',
      medicalNotes: defaultValues?.medicalNotes ?? '',
      medicalRestrictions: defaultValues?.medicalRestrictions ?? '',
      status: defaultValues?.status ?? 'ACTIVE',
    },
  })

  async function handleFormSubmit(data: FormData) {
    await onSubmit({ ...data, unitId: UNIT_ID })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Dados Pessoais</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input label="Nome completo *" error={errors.name?.message} {...register('name')} />
          </div>
          <Input label="Data de nascimento *" type="date" error={errors.birthDate?.message} {...register('birthDate')} />
          <Input label="CPF" placeholder="000.000.000-00" {...register('cpf')} />
          <Input label="RG" {...register('rg')} />
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="SUSPENDED">Suspenso</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Endereço</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input label="Endereço" {...register('address')} />
          </div>
          <Input label="Cidade" {...register('city')} />
          <Input label="Estado (UF)" maxLength={2} {...register('state')} />
          <Input label="CEP" {...register('zipCode')} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Informações Médicas</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Observações médicas</label>
            <textarea
              {...register('medicalNotes')}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Restrições médicas</label>
            <textarea
              {...register('medicalRestrictions')}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Salvar
        </Button>
      </div>
    </form>
  )
}
