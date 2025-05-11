import { db } from "@/db";
import { products } from "@/db/schema/app";
import { ProductCard } from "@/components/product-card";
import type { ProductsType } from "@/components/product-card";

export default async function AllProductsPage() {
  const items = await db.select().from(products);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">สินค้าทั้งหมด</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            {...(product as ProductsType)}
            reviewStar={(product.reviewStar || "0") as ProductsType["reviewStar"]}
          />
        ))}
      </div>
    </div>
  );
}
