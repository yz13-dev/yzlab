import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar"

interface AvatarProps {
  src: string
  fallback: string
  size?: number
  alt: string
}

const FullAvatar = ({ fallback, src, size = 24, alt }: AvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} width={size} height={size} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
export { FullAvatar }
