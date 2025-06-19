import { resend } from "@/extensions/resend"
import { isValidEmail } from "@/lib/validators/email"




export const checkEmail = (email: string) => {

  const isEmpty = email.trim().length === 0

  if (isEmpty) return { email: null, valid: false }

  const isValid = isValidEmail(email.trim())

  return { email, valid: isValid }

}


export const sendWelcomeEmail = async (email: string) => {
  return await resend.emails.send({
    from: "yz13@yz13.ru",
    to: email,
    subject: "Спасибо за подписку!",
    text: "Привет! Вы видите это письмо, потому что вы подписались на рассылку новый сайтов и ресурсов.",
  })
}
