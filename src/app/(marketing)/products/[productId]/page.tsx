import { SectionContainer } from "@/components/section-container";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { products } from "@/db/schema/app";
import { cn } from "@/lib/utils";
import { AddCartButton } from "@/modules/cart/components/add-cart-button";
import { eq } from "drizzle-orm";
import { CreditCard, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { productId: string };
};

const ProductDetail = async ({ params }: Props) => {
  const { productId } = params;

  // Fetch product from database
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  // If product not found, return 404
  if (!product) {
    notFound();
  }

  // Calculate final price
  const finalPrice =
    product.isDiscount && product.discountTo
      ? product.discountTo
      : product.price;

  // Calculate discount percentage if applicable
  const discountPercentage =
    product.isDiscount && product.discountTo
      ? Math.round(((product.price - product.discountTo) / product.price) * 100)
      : 0;

  // Format prices
  const formattedOriginalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
  }).format(product.price);

  const formattedFinalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
  }).format(finalPrice);

  // Convert review star to number for rendering
  const reviewStarNumber = Number.parseInt(product.reviewStar) || 0;

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden bg-white">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-contain aspect-square"
              priority
            />
          </div>
          {/* <div className="grid grid-cols-5 gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <button
                  key={i}
                  className="border rounded-lg overflow-hidden hover:border-primary"
                >
                  <Image
                    src={
                      product.imageUrl ||
                      "/placeholder.svg?height=100&width=100"
                    }
                    alt={`${product.name} thumbnail ${i + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </button>
              ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviewStarNumber
                          ? "fill-amber-400 text-amber-400"
                          : "fill-foreground/30 text-foreground/60"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-lg font-semibold">{reviewStarNumber}</span>
              <span className="text-gray-500">
                {product.reviewByCnt} คน
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">
                ขายแล้ว  {product.sold} ชิ้น
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              {formattedFinalPrice}
            </span>
            {product.isDiscount && (
              <>
                <span className="text-gray-500 line-through">
                  {formattedOriginalPrice}
                </span>
                <Badge variant="destructive" className="ml-2">
                  -{discountPercentage}%
                </Badge>
              </>
            )}
          </div>

          <Separator />
          <div>
            <p className="">{product.shortDescription}</p>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <h3 className="font-medium">จำนวน</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="rounded-r-none">
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 w-12 flex items-center justify-center border-y">
                1
              </div>
              <Button variant="outline" size="icon" className="rounded-l-none">
                <Plus className="h-4 w-4" />
              </Button>
              <span className="ml-4 text-gray-500">
                {product.stock} พร้อมจำหน่าย
              </span>
            </div>
          </div>

          {/* Add to Cart and Buy Now */}
          <div className="flex gap-4 pt-4">
            <AddCartButton productId={productId} />
            <Link
              href="/checkout"
              className={cn(
                buttonVariants(),
                "flex-1 gap-2 popover-foreground hover:popover-foreground/80"
              )}
            >
              <CreditCard className="h-5 w-5" />
              ซื้อเลย
            </Link>
          </div>

          {/* Shipping */}
          <div className="border rounded-lg p-4 bg-background">
            <h3 className="font-medium mb-2">การจัดส่ง</h3>
            <div className="flex items-center gap-2">
              <div className="text-green-600">
                ใช้เวลาจัดส่ง 3-5 วันตามเวลาทำการ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Product Description</h2>
        <Separator className="mb-6" />
        <div className="prose max-w-none">
          <p>{product.description}</p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ProductDetail;
