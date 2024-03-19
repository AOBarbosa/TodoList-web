'use client'

import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { DeleteTodoDialog } from './delete-todo-dialog'
import { EditTodoDialog } from './edit-todo-dialog'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

interface TodoComponentProps {
  id: string
  title: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high'
  setIsListUpdated: Dispatch<SetStateAction<boolean>>
  isListUpdated?: boolean
}

export function TodoCard({
  id,
  title,
  isCompleted,
  priority,
  setIsListUpdated,
  isListUpdated,
}: TodoComponentProps) {
  async function handleToggleTodo() {
    await fetch(`http://localhost:3000/api/todos?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    }).then(() => {
      setIsListUpdated(!isListUpdated)
    })
  }

  async function handleDeleteTodo() {
    await fetch(`http://localhost:3000/api/todos?id=${id}`, {
      method: 'DELETE',
    }).then(() => {
      setIsListUpdated(!isListUpdated)

      toast.success('Todo apagada com sucesso.')
    })
  }

  return (
    <Card className="flex h-12 w-full flex-row items-center justify-between">
      <div className="flex items-center space-x-2 px-2">
        <Checkbox
          id="isCompleted"
          onClick={handleToggleTodo}
          checked={isCompleted}
        />
        <Label
          className={isCompleted ? `text-muted-foreground line-through` : ``}
        >
          {title}
        </Label>
      </div>

      <div className="space-x-2">
        <EditTodoDialog
          todoId={id}
          todoTitle={title}
          todoPriority={priority}
          setIsListUpdated={setIsListUpdated}
          isListUpdated={isListUpdated}
        />

        <DeleteTodoDialog
          handleDeleteTodo={handleDeleteTodo}
          todoTitle={title}
        />
      </div>
    </Card>
  )
}
