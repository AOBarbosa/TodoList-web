import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DeleteTodoDialogProps {
  handleDeleteTodo: () => Promise<void>
  todoTitle: string
}

export function DeleteTodoDialog({
  handleDeleteTodo,
  todoTitle,
}: DeleteTodoDialogProps) {
  function onDeleteTodo() {
    handleDeleteTodo()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'ghost'}
          className="hover:text-destructive"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deseja excluir esta todo?</DialogTitle>
        </DialogHeader>

        <span className="flex justify-center">{todoTitle}</span>

        <DialogFooter>
          <Button variant={'destructive'} onClick={onDeleteTodo}>
            Excluir
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
