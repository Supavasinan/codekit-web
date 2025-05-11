"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import clsx from "clsx";
import { SectionContainer } from "./section-container";
import { BuyProduct } from "@/modules/products/action";

const paymentOptions = [
  {
    id: "promptpay",
    name: "พร้อมเพย์",
    icon: "https://cdn.discordapp.com/attachments/1266372728504455269/1370994277240279081/promptpay.png?ex=6821856b&is=682033eb&hm=ded662c714db342ed7e9c27245770b84aceb61567c5e5f2dc1f3609fd121920f&",
  },
  {
    id: "bank",
    name: "โอนผ่านธนาคาร",
    icon: "https://whatphone.net/wp-content/uploads/2018/10/new-k-plus-logo.png",
  },
  {
    id: "truemoney",
    name: "TrueMoney Wallet",
    icon: "https://cdn.discordapp.com/attachments/1266372728504455269/1370994790111379478/truemoney-wallet-logo-png_seeklogo-367826.png?ex=682185e5&is=68203465&hm=a96363c24a15c1ddad03f1e6da4cdcd5f3ca996cffe913e7a21ba8ef13246614&",
  },
];

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
};

type Props = {
  items: CartItem[];
  total: number;
};

export const CheckoutPayment = ({ items, total }: Props) => {
  const [selected, setSelected] = useState("promptpay");
  const [open, setOpen] = useState(false);

  const handleCheckout = async () => {
    try {
      await BuyProduct({
        productIds: items.map((item) => item.product.id),
      });
      setOpen(true);
    } catch (err) {
      console.error(err);
      alert("ชำระเงินไม่สำเร็จ: " + (err as Error).message);
    }
  };

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ช่องทางการชำระเงิน */}
        <Card className="bg-background text-foreground">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-lg">เลือกช่องทางการชำระเงิน</h3>
            <RadioGroup value={selected} onValueChange={setSelected}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paymentOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className={clsx(
                      "cursor-pointer rounded-md p-4 flex flex-col items-center justify-center gap-2 bg-foreground/10 hover:bg-foreground/20 transition",
                      selected === option.id && "ring-2 ring-primary"
                    )}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="sr-only"
                    />
                    <Image
                      src={option.icon}
                      alt={option.name}
                      width={40}
                      height={40}
                      className="object-contain rounded-lg"
                    />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {option.name}
                    </span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
            <div className="space-y-2 pt-4">
              <Label htmlFor="address">ที่อยู่สำหรับจัดส่ง</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="กรอกที่อยู่ของคุณ"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* สรุปคำสั่งซื้อ */}
        <Card className="bg-background text-foreground">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-lg">สรุปคำสั่งซื้อ</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Image
                    src={item.product.imageUrl || "/placeholder.svg"}
                    alt={item.product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} x {item.product.price} บาท
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {(item.quantity * item.product.price).toFixed(2)} บาท
                  </p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>รวมทั้งหมด</span>
              <span>{total.toFixed(2)} บาท</span>
            </div>
            <Button onClick={handleCheckout} className="w-full">
              ยืนยันการชำระเงิน
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Dialog แสดงหลังชำระเงิน */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>ชำระเงินสำเร็จ</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              ขอบคุณสำหรับการสั่งซื้อของคุณ 🎉<br />
              กรุณารอการยืนยันจากระบบ
            </DialogDescription>
          </DialogHeader>
          <Button className="mt-4 w-full" onClick={() => setOpen(false)}>
            ปิด
          </Button>
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
};