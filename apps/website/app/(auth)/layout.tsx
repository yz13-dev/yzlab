


type LayoutProps = {
  children: React.ReactNode
}
export default function ({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-dvh items-center justify-center gap-6">
      {children}
    </div>
  )
}
