import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import "server-only";

export const isUserEmailExists = async (email: string) => {
  const [output] = await db.select().from(user).where(eq(user.email, email));

  return Boolean(output);
};
