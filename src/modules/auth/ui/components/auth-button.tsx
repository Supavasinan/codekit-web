import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const AuthButton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("ml-auto space-x-3", className)}>
      <Link
        href="/login"
        className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
      >
        เข้าสู่ระบบ
      </Link>
      <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
        สมัครสมาชิก
      </Link>
    </div>
  );
};
