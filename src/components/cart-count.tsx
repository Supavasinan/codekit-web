import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useQueryChartCount } from "@/modules/cart/client";
import { ShoppingBasket } from "lucide-react";

import Link from "next/link";

export const CartCount = () => {
  // const queryChartCount = useQueryChartCount();

  // const count = queryChartCount.data || 0;

  return (
    <Link
      href="/cart"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "relative w-full justify-start md:justify-center gap-3 rounded-md md:size-10 md:rounded-full"
      )}
    >
      <ShoppingBasket className="size-5" />
      <span className="md:hidden text-sm font-medium">ตะกร้าสินค้า</span>

      {/* <span className="absolute top-0 right-0 md:right-1 md:top-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
        {count}
      </span> */}
    </Link>
  );
};
