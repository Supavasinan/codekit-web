"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { addToCart } from "../actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const AddCartButton = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart(productId);
      setOpen(true);
    });
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        className="flex-1 gap-2"
        disabled={isPending}
      >
        <ShoppingCart className="h-5 w-5" />
        เพิ่มเข้าตะกร้า
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="text-green-500 w-10 h-10 mb-4" />
              เพิ่มสินค้าสำเร็จ
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-center mt-2">
              คุณสามารถดูรายการสินค้าได้ที่ตะกร้าสินค้า
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setOpen(false)} className="w-full mt-4">
            ปิด
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
