import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from './ui/button'

interface TodoFormComponentProps {
  setIsListUpdated: Dispatch<SetStateAction<boolean>>
  isListUpdated?: boolean
}

const todoFormSchema = z.object({
  title: z.string().min(3, {
    message: 'Este campo precisa ter pelo menos 3 caracteres.',
  }),
  priority: z.string(),
})

type TodoFormSchema = z.infer<typeof todoFormSchema>

export function TodoForm({
  setIsListUpdated,
  isListUpdated,
}: TodoFormComponentProps) {
  const {
    handleSubmit,
    control,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TodoFormSchema>({
    resolver: zodResolver(todoFormSchema),
  })

  async function handleCreateTodo() {
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: getValues('title'),
        priority: getValues('priority'),
      }),
    }).then(() => {
      setIsListUpdated(!isListUpdated)

      reset()
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateTodo)}
        className="flex w-full flex-row items-center justify-between space-x-2"
      >
        <div className="w-2/3 space-y-1">
          <Label className="px-2 text-sm">Todo</Label>
          <Input placeholder="Crie uma nova todo" {...register('title')} />
          {errors && (
            <span className="text-destructive">{errors.title?.message}</span>
          )}
        </div>

        <Controller
          name="priority"
          defaultValue="low"
          control={control}
          render={({ field: { name, onChange, value } }) => {
            return (
              <div className="w-1/4 space-y-1">
                <Label className="px-2 text-sm">Prioridade</Label>
                <Select name={name} onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="low">baixa</SelectItem>

                    <SelectItem value="medium">média</SelectItem>

                    <SelectItem value="high">alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )
          }}
        />

        <Button className="mt-4 cursor-pointer" type="submit">
          Criar
        </Button>
      </form>
    </>
  )
}
