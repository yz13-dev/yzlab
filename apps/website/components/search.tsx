import { Command, CommandEmpty, CommandInput, CommandList } from "ui/components/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "ui/components/dialog";



type Props = {
  children?: React.ReactNode
}
export default function ({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild={!!children}>{children}</DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Поиск</DialogTitle>
        <DialogDescription className="sr-only">Найдем всё что сможем.</DialogDescription>
        <Command>
          <div className="h-12 *:h-full [&>div>svg]:size-5">
            <CommandInput
              className="text-base"
              placeholder="Начните вводить для начала поиска..."
            />
          </div>
          <CommandList className="min-h-96">
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
