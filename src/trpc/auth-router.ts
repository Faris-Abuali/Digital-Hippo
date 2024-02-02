import { AuthCredentialsValidator } from '../lib/validators/account-credentials'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'

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
        }),

    verifyEmail: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input: { token } }) => {
            const payload = await getPayloadClient()

            const isVerified = await payload.verifyEmail({
                collection: 'users',
                token,
            })

            console.log(token)
            console.log(isVerified)

            if (!isVerified)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            return {
                success: true,
            }
        }),

    signIn: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input: { email, password }, ctx }) => {
            const { res } = ctx
            const payload = await getPayloadClient()

            try {
                await payload.login({
                    collection: 'users',
                    data: {
                        email,
                        password,
                    },
                    res, // attach a cookie that contains the user's session
                });

                return {
                    success: true,
                }
            }
            catch (error) {
                throw new TRPCError({ code: 'UNAUTHORIZED' })
            }
        })
})

