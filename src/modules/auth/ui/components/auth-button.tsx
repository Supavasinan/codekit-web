"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { UserProfile } from "./user-profile"

export const AuthButton = ({
  className,
  variant = "both",
}: {
  className?: string
  variant?: "mobile" | "desktop" | "both"
}) => {
  const { data: session } = authClient.useSession()

  const visibilityClass = variant === "mobile" ? "block md:hidden" : variant === "desktop" ? "hidden md:block" : ""

  if (!session)
    return (
      <div className={cn("ml-auto space-x-3", visibilityClass, className)}>
        <Link href="/login" className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
          เข้าสู่ระบบ
        </Link>
        <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
          สมัครสมาชิก
        </Link>
      </div>
    )

  const userData = {
    image: session.user.image,
    name: session.user.name,
    email: session.user.email,
  }

  return <UserProfile {...userData} />
}
