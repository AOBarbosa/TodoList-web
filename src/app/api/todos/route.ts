import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {
  const todos = await prisma.todo.findMany()

  return NextResponse.json(todos)
}

const todoSchema = z.object({
  title: z.string(),
  priority: z.string(),
})

export async function POST(req: NextRequest) {
  const todo = await req.json()

  const { title, priority } = todoSchema.parse(todo)

  const newTodo = await prisma.todo.create({
    data: {
      title,
      priority,
    },
  })

  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  const todo = await req.json()

  const { title, priority } = todoSchema.parse(todo)

  await prisma.todo.update({
    where: {
      id: id as string,
    },
    data: {
      title,
      priority,
    },
  })

  return NextResponse.json({ success: 'Sucessfully updated' })
}

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  const todoParams = z.object({
    isCompleted: z.boolean(),
  })

  const todo = await req.json()

  const { isCompleted } = todoParams.parse(todo)

  await prisma.todo.update({
    where: {
      id: id as string,
    },
    data: {
      isCompleted,
    },
  })

  return NextResponse.json({ success: 'Sucessfully updated' })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  await prisma.todo.delete({
    where: {
      id: id as string,
    },
  })

  return NextResponse.json(
    { success: 'Sucessfully deleted' },
    {
      status: 204,
    },
  )
}
