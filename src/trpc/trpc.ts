import { ExpressContext } from '@/server'
import { initTRPC } from '@trpc/server'

const t = initTRPC.context<ExpressContext>().create()

export const router = t.router

// publicProcedure is a procedure that is accessible to the public
// (i.e. not authenticated API endpoint)
export const publicProcedure = t.procedure