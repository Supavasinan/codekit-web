import { auth } from "@/lib/auth";
import { Context } from "hono";

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type Env = {
  Variables: {
    user: User | null;
  };
};

export const withUser = async (c: Context<Env>, next: () => Promise<void>) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || undefined,
  } : null;

  c.set("user", user);

  await next();
};