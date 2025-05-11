import { db } from "@/db";
import { cartItems } from "@/db/schema/app";
import { Env } from "@/lib/context";
import { eq } from "drizzle-orm"; // Make sure to import eq
import { Hono } from "hono";

const app = new Hono<Env>().get("/count", async (c) => {
  const user = c.get("user");

  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const items = await db
    .select({ quantity: cartItems.quantity })
    .from(cartItems)
    .where(eq(cartItems.userId, user.id));

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return c.json({ totalItems });
});

export default app;
