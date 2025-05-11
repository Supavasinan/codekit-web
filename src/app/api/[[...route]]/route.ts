import { withUser } from '@/lib/context'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.use('/favorites', withUser)

const routes = app

export const GET = handle(routes)
export const POST = handle(routes)
export const PATCH = handle(routes)

export type AppType = typeof routes