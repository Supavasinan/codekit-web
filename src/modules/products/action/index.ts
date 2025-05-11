// app/modules/products/action.ts
"use server";

import { db } from "@/db";
import { orders, products } from "@/db/schema/app";
import { auth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";

export const BuyProduct = async ({ productIds }: { productIds: string[] }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const dbProducts = await db
    .select()
    .from(products)
    .where(inArray(products.id, productIds));

  if (dbProducts.length !== productIds.length) {
    throw new Error("One or more products not found");
  }

  for (const product of dbProducts) {
    if (!product.isAvailable || product.stock <= 0) {
      throw new Error(`Product ${product.name} is out of stock or unavailable`);
    }
  }

  let totalAmount = 0;

  for (const product of dbProducts) {
    const price = product.isDiscount
      ? product.discountTo ?? product.price
      : product.price;

    totalAmount += price;

    await db
      .update(products)
      .set({
        stock: product.stock - 1,
        sold: product.sold + 1,
        updatedAt: new Date(),
      })
      .where(eq(products.id, product.id));
  }

  await db.insert(orders).values({
    id: randomUUID(),
    userId,
    productIds,
    totalAmount,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};
