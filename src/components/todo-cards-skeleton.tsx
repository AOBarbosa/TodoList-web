import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

export function TodoCardsSkeleton() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Card className="flex h-14 w-full flex-row items-center justify-between">
        <div className="flex items-center space-x-2 px-2">
          <Skeleton className="size-6 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
      </Card>

      <Card className="flex h-14 w-full flex-row items-center justify-between">
        <div className="flex items-center space-x-2 px-2">
          <Skeleton className="size-6 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
      </Card>

      <Card className="flex h-14 w-full flex-row items-center justify-between">
        <div className="flex items-center space-x-2 px-2">
          <Skeleton className="size-6 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
      </Card>
    </div>
  )
}
