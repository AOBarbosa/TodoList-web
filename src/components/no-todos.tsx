export function NoTodos() {
  return (
    <div className="flex w-full flex-col items-center space-y-12">
      <h1 className="text-2xl text-primary">
        Você ainda não tem nenhuma todo...
      </h1>

      <p className="text-lg text-muted-foreground">
        Preencha os campos acima e comece a organizar seu dia!
      </p>
    </div>
  )
}
