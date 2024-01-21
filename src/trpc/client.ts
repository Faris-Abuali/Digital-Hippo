import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './'

// Now the frontend knows the type of the backend
export const trpc = createTRPCReact<AppRouter>({})
