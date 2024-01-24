import { AuthCredentialsValidator } from '../lib/validators/account-credentials'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { publicProcedure, router } from './trpc'

export const authRouter = router({
    createPayloadUser: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input }) => {
            const { email, password } = input
            const payload = await getPayloadClient()

            // Check if user already exists
            const { docs: users } = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email,
                    }
                }
            })

            if (users.length)
                throw new TRPCError({ code: 'CONFLICT' })

            // Create user
            const user = await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: 'user',
                }
            })

            return {
                success: true,
                sentToEmail: user.email,
            }
        })
})
