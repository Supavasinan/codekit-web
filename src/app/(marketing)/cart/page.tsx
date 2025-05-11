import { SectionContainer } from "@/components/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import Image from "next/image";
const cartItems = [
  {
    id: 1,
    name: "สินค้า A",
    price: 199,
    quantity: 1,
    image: "https://media.discordapp.net/attachments/1266372728504455269/1370963705633706074/zeroday_nanyang.png?ex=682168f2&is=68201772&hm=cd9325306577eed8c8e73b9cc2215d82da2cca51c26cccb6e5d70fbc1a96850c&=&format=webp&quality=lossless&width=1564&height=1564",
  },
  {
    id: 2,
    name: "สินค้า B",
    price: 299,
    quantity: 2,
    image: "https://media.discordapp.net/attachments/1266372728504455269/1370963705633706074/zeroday_nanyang.png?ex=682168f2&is=68201772&hm=cd9325306577eed8c8e73b9cc2215d82da2cca51c26cccb6e5d70fbc1a96850c&=&format=webp&quality=lossless&width=1564&height=1564",
  },
];

const Carts = () => {
  return (
    <SectionContainer>
      <h2 className="font-bold text-xl mb-4">ตะกร้าสินค้า</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="bg-background text-foreground">
              <CardContent className="flex items-center gap-4 p-4">
                <Image src={item.image} alt={item.name} width={1500} height={1500} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm opacity-70">{item.price} บาท</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon">-</Button>
                  <Input value={item.quantity} className="w-12 text-center" readOnly />
                  <Button size="icon">+</Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card className="bg-background text-foreground">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">สรุปคำสั่งซื้อ</h3>
              <div className="flex justify-between">
                <span>ยอดรวม</span>
                <span>
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}{" "}
                  บาท
                </span>
              </div>
              <Separator />
              <Link hre>
                <Button className="w-full">ดำเนินการชำระเงิน</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Carts;
