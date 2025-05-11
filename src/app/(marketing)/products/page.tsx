import { db } from "@/db";
import { products } from "@/db/schema/app";
import { ProductCard } from "@/components/product-card";
import type { ProductsType } from "@/components/product-card";
import { like, eq, and } from "drizzle-orm";

type Props = {
  searchParams: { search?: string; category?: string };
};

export default async function AllProductsPage({ searchParams }: Props) {
  const { search, category } = searchParams;

  // Build where clause
  const whereClause = [];
  if (search) whereClause.push(like(products.name, `%${search}%`));
  if (category) whereClause.push(eq(products.categoryId, category));

  const items = await db
    .select()
    .from(products)
    .where(whereClause.length > 0 ? and(...whereClause) : undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        {search
          ? `ผลการค้นหา: ${search}`
          : category
          ? "สินค้าตามหมวดหมู่"
          : "สินค้าทั้งหมด"}
      </h1>

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
