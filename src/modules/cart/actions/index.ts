"use server";

import { db } from "@/db";
import { cartItems } from "@/db/schema/app";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateCartItemQuantity(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  const itemId = formData.get("itemId")?.toString();
  const quantity = parseInt(formData.get("quantity")?.toString() || "1");

  if (!itemId || isNaN(quantity) || quantity < 1) return;

  await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, itemId));

  revalidatePath("/cart"); // make sure this matches your route
}

export async function removeFromCart(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return;

  const itemId = formData.get("itemId")?.toString();

  if (!itemId) return;

  await db.delete(cartItems).where(eq(cartItems.id, itemId));

  revalidatePath("/cart");
}

export async function addToCart(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  if (!productId) return;

  const existingItem = await db
    .select()
    .from(cartItems)
    .where(
      eq(cartItems.userId, session.user.id) &&
        eq(cartItems.productId, productId)
    )
    .limit(1)
    .execute();

  if (existingItem.length > 0) {
    await db
      .update(cartItems)
      .set({ quantity: existingItem[0].quantity + 1 })
      .where(eq(cartItems.id, existingItem[0].id));
  } else {
    await db.insert(cartItems).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      productId,
      quantity: 1,
    });
  }

  revalidatePath("/cart");
}
