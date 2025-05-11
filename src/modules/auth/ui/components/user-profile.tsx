"use client"

import { useRouter } from "next/navigation"
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

const UserProfileSection = ({
  image,
  name,
}: {
  image: string
  name: string
}) => {
  return (
    <Avatar className="w-8 h-8 rounded-lg">
      <AvatarImage src={image || "/placeholder.svg"} alt={name} />
      <AvatarFallback className="rounded-lg">{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export const UserProfile = ({
  image,
  name,
  email,
}: {
  image: string | null | undefined
  name: string
  email: string
}) => {
  const router = useRouter()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        },
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <UserProfileSection image={image || ""} name={name || "User"} />
          <div className="grid flex-1 text-sm leading-tight text-left">
            <span className="font-medium truncate">{name}</span>
            <span className="text-xs truncate">{email}</span>
          </div>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserProfileSection image={image || ""} name={name || "User"} />
            <div className="grid flex-1 text-sm leading-tight text-left">
              <span className="font-medium truncate">{name}</span>
              <span className="text-xs truncate">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="w-4 h-4 mr-2" />
            <span>Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
