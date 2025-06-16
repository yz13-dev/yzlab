import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "ui/components/button";
import Form from "./form";


export default function () {
  return (
    <div className="max-w-3xl w-full h-80 grid grid-cols-2 *:p-6 bg-card border rounded-2xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="font-medium text-base" asChild>
            <Link href="/">
              <ArrowLeftIcon />
            </Link>
          </Button>
          <h1 className="text-2xl font-medium">Авторизация</h1>
        </div>
        <p className="block text-base text-muted-foreground">Войдите в систему для продолжения работы.</p>
      </div>
      <div className="w-full h-full flex flex-col">
        <Form />
      </div>
    </div>
  )
}
