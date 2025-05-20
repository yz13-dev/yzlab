"use client"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider


const ToastViewport = ({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>) => {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
}
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-error bg-error-background text-error-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ToastProps = React.ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>;
const Toast =
  ({ className, variant, ref, ...props }: ToastProps) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    )
  }
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = ({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitives.Action>) => {
  return <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary/20 focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-border/40 group-[.destructive]:hover:border-error-border/30 group-[.destructive]:hover:bg-error-background group-[.destructive]:hover:text-error-foreground group-[.destructive]:focus:ring-error",
      className
    )}
    {...props}
  />
}
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = ({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitives.Close>) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-error-foreground group-[.destructive]:hover:text-error-foreground/60 group-[.destructive]:focus:ring-error group-[.destructive]:focus:ring-offset-error",
      className
    )}
    toast-close=""
    {...props}
  >
    <XIcon className="h-4 w-4" />
  </ToastPrimitives.Close>
)
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle =
  ({ ref, className, ...props }: React.ComponentProps<typeof ToastPrimitives.Title>) => (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold [&+div]:text-xs", className)}
      {...props}
    />
  )
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription =
  ({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitives.Description>) => {
    return <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  }
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, type ToastActionElement, type ToastProps
}
