import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

export const Carts = () => {
  return (
    <Link
      href="/cart"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "w-full justify-start md:justify-center gap-3 rounded-md md:size-10 md:rounded-full"
      )}
    >
      <ShoppingBasket className="size-5 px-auto py-auto" />
      <span className="md:hidden text-sm font-medium">ตะกร้าสินค้า</span>
    </Link>
  );
};
