import { Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import type { products } from "@/db/schema/app";
import { cn } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import Link from "next/link";

export type ProductsType = { className?: string } & InferSelectModel<
  typeof products
>;

export const ProductCard = ({
  imageUrl,
  name,
  description,
  shortDescription,
  price,
  discountTo,
  isDiscount,
  isAvailable,
  reviewStar,
  className,
  id,
}: ProductsType & { reviewStar: "0" | "1" | "2" | "3" | "4" | "5" }) => {
  const discountPercentage =
    isDiscount && discountTo
      ? Math.round(((price - discountTo) / price) * 100)
      : null;

  return (
    <Link
      href={`/products/${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md",
        className
      )}
    >
      {isDiscount && discountPercentage && (
        <Badge className="absolute right-1 top-1 z-10" variant={"destructive"}>
          - {discountPercentage}%
        </Badge>
      )}
      {!isAvailable && (
        <Badge
          variant="outline"
          className="absolute right-2 top-2 z-10 bg-muted/80 text-muted-foreground"
        >
          Out of Stock
        </Badge>
      )}

      <div className="relative aspect-square overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform group-hover:scale-105"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3",
                  i < Number.parseInt(reviewStar || "0", 10)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-foreground/30 text-foreground/60"
                )}
              />
            ))}
          </div>
        </div>

        <h3 className="mb-1 line-clamp-1 text-base font-medium">{name}</h3>

        <p className="mb-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {shortDescription || description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold">
            {isDiscount && discountTo ? (
              <>{discountTo.toFixed(2)}</>
            ) : (
              <>{price.toFixed(2)}</>
            )}
            {" "}บาท
          </span>
        </div>
      </div>
    </Link>
  );
};
