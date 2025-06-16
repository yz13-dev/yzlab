"use client";

import { Button } from "ui/components/button";
import { Input } from "ui/components/input";



export default function () {
  return (
    <>
      <div className="space-y-3 *:h-10 *:!text-base">
        <Input placeholder="Логин" />
        <Input placeholder="Пароль" type="password" />
      </div>
      <Button variant="secondary" size="lg" className="mt-auto w-full font-medium text-base">
        Войти
      </Button>
    </>
  )
}
