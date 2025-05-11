"use client";

import { SectionContainer } from "@/components/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const paymentOptions = [
  {
    id: "promptpay",
    name: "พร้อมเพย์",
    icon: "https://media.discordapp.net/attachments/1266372728504455269/1370994277240279081/promptpay.png?ex=6821856b&is=682033eb&hm=ded662c714db342ed7e9c27245770b84aceb61567c5e5f2dc1f3609fd121920f&=&format=webp&quality=lossless&width=922&height=922",
  },
  {
    id: "bank",
    name: "โอนผ่านธนาคาร",
    icon: "https://whatphone.net/wp-content/uploads/2018/10/new-k-plus-logo.png",
  },
  {
    id: "truemoney",
    name: "TrueMoney Wallet",
    icon: "https://media.discordapp.net/attachments/1266372728504455269/1370994790111379478/truemoney-wallet-logo-png_seeklogo-367826.png?ex=682185e5&is=68203465&hm=a96363c24a15c1ddad03f1e6da4cdcd5f3ca996cffe913e7a21ba8ef13246614&=&format=webp&quality=lossless&width=1080&height=1080",
  },
];

const Checkout = () => {
  const [selected, setSelected] = useState("promptpay");

  return (
    <SectionContainer>
      <h2 className="font-bold text-xl mb-4">ชำระเงิน</h2>
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
                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    <Image
                      src={option.icon}
                      alt={option.name}
                      width={40}
                      height={40}
                      className="object-contain rounded-lg"
                    />
                    <span className="text-sm font-medium whitespace-nowrap">{option.name}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* สรุปคำสั่งซื้อ */}
        <Card className="bg-background text-foreground">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-lg">สรุปคำสั่งซื้อ</h3>
            <div className="flex justify-between">
              <span>สินค้า</span>
              <span>2 รายการ</span>
            </div>
            <div className="flex justify-between">
              <span>รวมทั้งหมด</span>
              <span>797 บาท</span>
            </div>
            <Separator />
            <Button className="w-full">ยืนยันการชำระเงิน</Button>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
};

export default Checkout;
