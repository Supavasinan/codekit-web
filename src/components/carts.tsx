import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Carts = () => {
  return (
    <Button className="rounded-full size-10" variant="ghost">
      <ShoppingBasket className="size-5" />
    </Button>
  );
};
