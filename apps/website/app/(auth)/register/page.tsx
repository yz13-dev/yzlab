import { Button } from "@yzlab/ui/components/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Form from "./form";


export default function () {
  return (
    <div className="max-w-3xl w-full h-80 grid grid-cols-2 *:p-6 bg-card border rounded-2xl">
      <div className="w-full h-full">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="font-medium text-base" asChild>
              <Link href="/">
                <ArrowLeftIcon />
              </Link>
            </Button>
            <h1 className="text-2xl font-medium">Регистрация пользователя</h1>
          </div>
          <p className="block text-base text-muted-foreground">Создайте аккаунт для продолжения работы.</p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col">
        <Form />
      </div>
    </div>
  )
}
