"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "../actions";

export const AddCartButton = ({ productId }: { productId: string }) => {
  return (
    <Button
      onClick={() => addToCart(productId)}
      variant="outline"
      className="flex-1 gap-2"
    >
      <ShoppingCart className="h-5 w-5" />
      เพิ่มเข้าตะกร้า
    </Button>
  );
};
