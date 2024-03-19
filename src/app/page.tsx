'use client'

import { useEffect, useState } from 'react'

import { NoTodos } from '@/components/no-todos'
import { ThemeToggle } from '@/components/theme-toggle'
import { TodoCard } from '@/components/todo-card'
import { TodoCardsSkeleton } from '@/components/todo-cards-skeleton'
import { TodoForm } from '@/components/todo-form'
import { Separator } from '@/components/ui/separator'

export interface TodoProps {
  id: string
  title: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>([])
  const [isListUpdated, setIsListUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function getTodos() {
    await fetch('http://localhost:3000/api/todos')
      .then((response) => {
        return response.json()
      })
      .then((data: TodoProps[]) => {
        setTodos(data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getTodos()
  }, [isListUpdated])

  function sortTodos(a: TodoProps, b: TodoProps) {
    if (a.priority === 'high' && b.priority !== 'high') {
      return -1
    } else if (a.priority !== 'high' && b.priority === 'high') {
      return 1
    } else if (a.priority === 'medium' && b.priority === 'low') {
      return -1
    } else if (a.priority === 'low' && b.priority === 'medium') {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center space-y-6">
      <header className="flex w-2/3 flex-row items-center justify-between">
        <h1 className="text-6xl font-extrabold">
          to<span className="text-primary">do</span>
        </h1>

        <ThemeToggle />
      </header>

      <main className="flex w-2/3 flex-col items-center justify-center space-y-6">
        <TodoForm
          setIsListUpdated={setIsListUpdated}
          isListUpdated={isListUpdated}
        />

        <Separator />

        {isLoading ? (
          <TodoCardsSkeleton />
        ) : todos.length === 0 ? (
          <NoTodos />
        ) : (
          todos
            .sort((a, b) => {
              return sortTodos(a, b)
            })
            .map((todo) => {
              return (
                <TodoCard
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  priority={todo.priority}
                  isCompleted={todo.isCompleted}
                  setIsListUpdated={setIsListUpdated}
                  isListUpdated={isListUpdated}
                />
              )
            })
        )}
      </main>
    </div>
  )
}
