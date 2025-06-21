"use client";

import { Button } from "@yzlab/ui/components/button";
import { Input } from "@yzlab/ui/components/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@yzlab/ui/components/input-otp";
import { useState } from "react";


type FormProps = {
  admin?: boolean
}
export default function ({ admin = false }: FormProps) {

  const [confirm, setConfirm] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [otp, setOtp] = useState<string>("")

  return (
    <>
      <VerifyForm />
    </>
  )
}

const RegisterForm = () => {
  return (
    <>
      <div className="space-y-3 *:h-10 *:!text-base">
        <Input placeholder="Имя пользователя" />
        <Input placeholder="Логин" />
        <Input placeholder="Пароль" type="password" />
      </div>
      <Button variant="secondary" size="lg" className="mt-auto w-full font-medium text-base">
        Войти
      </Button>
    </>
  )
}

const VerifyForm = () => {
  return (
    <>
      <div className="space-y-3 w-full">
        <span className="text-sm block text-muted-foreground">Введите код подтверждения</span>
        <InputOTP maxLength={6}>
          <InputOTPGroup className="w-full *:w-1/4 *:h-12 *:text-2xl *:font-medium">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button variant="secondary" size="lg" className="mt-auto w-full font-medium text-base">
        Войти
      </Button>
    </>
  )
}
