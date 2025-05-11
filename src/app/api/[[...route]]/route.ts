import { withUser } from "@/lib/context";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import charts from "./chart";
const app = new Hono().basePath("/api");

app.use("/charts", withUser);

const routes = app.route("/charts", charts);

export const GET = handle(routes);
export const POST = handle(routes);
export const PATCH = handle(routes);

export type AppType = typeof routes;
