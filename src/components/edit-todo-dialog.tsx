import { zodResolver } from '@hookform/resolvers/zod'
import { Pen } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface EditTodoDialogComponentProps {
  todoId: string
  todoTitle: string
  todoPriority: 'low' | 'medium' | 'high'
  setIsListUpdated: Dispatch<SetStateAction<boolean>>
  isListUpdated?: boolean
}

const editTodoFormSchema = z.object({
  title: z.string(),
  priority: z.string(),
})

type EditTodoFormSchema = z.infer<typeof editTodoFormSchema>

export function EditTodoDialog({
  todoId,
  todoTitle,
  todoPriority,
  setIsListUpdated,
  isListUpdated,
}: EditTodoDialogComponentProps) {
  const { handleSubmit, control, register, getValues } =
    useForm<EditTodoFormSchema>({
      resolver: zodResolver(editTodoFormSchema),
    })

  async function handleEditTodo() {
    await fetch(`http://localhost:3000/api/todos?id=${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: getValues('title'),
        priority: getValues('priority'),
      }),
    }).then(() => {
      setIsListUpdated(!isListUpdated)

      toast.success('Todo editada com sucesso!')
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'ghost'}>
          <Pen />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar todo</DialogTitle>

          <DialogDescription>
            O que deseja editar na sua todo?
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleEditTodo)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>

            <Input
              id="title"
              defaultValue={todoTitle}
              className="col-span-3"
              {...register('title')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Prioridade
            </Label>

            <Controller
              name="priority"
              defaultValue={todoPriority}
              control={control}
              render={({ field: { name, onChange, value } }) => {
                return (
                  <>
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
                  </>
                )
              }}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Salvar</Button>

            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
