import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn(className)}>
      <Image src="/images/logo.png" width={120} height={120} alt="Zeroday" />
    </Link>
  );
};
