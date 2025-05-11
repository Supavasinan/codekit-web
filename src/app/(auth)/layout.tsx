import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) redirect("/");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col justify-center gap-2 md:justify-start relative">
          <div className="flex items-center gap-2 font-medium">
            <Logo />
          </div>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-fit absolute top-16"
            )}
          >
            <ChevronLeft />
            กลับ
          </Link>
        </div>
        {children}
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://media.discordapp.net/attachments/1266372728504455269/1371032525257969674/bglogin.png?ex=6821a90a&is=6820578a&hm=5a7550e6e656ebe6c47274d8ef038f43df48eccf003cd223dbf417095ad73267&=&format=webp&quality=lossless"
          alt="auth"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
