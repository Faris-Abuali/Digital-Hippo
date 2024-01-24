"use client"

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCredentialsValidator, type TAuthCredentialsValidator } from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'

export const SignUpPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })

    const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({})

    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        mutate({ email, password })
    }

    return (
        <>
            <div
                className="container relative flex py-20 flex-col items-center justify-center lg:px-0"
            >
                <div
                    className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
                >
                    <div
                        className="flex flex-col items-center space-y-2 text-center"
                    >
                        <Icons.logo className="w-20 h-20" />
                        <h1 className="text-2xl font-bold">
                            Create an account
                        </h1>

                        <Link
                            href='/sign-in'
                            className={
                                buttonVariants({
                                    variant: "link",
                                    className: "gap-1.5"
                                })
                            }
                        >
                            Already have an account? Sign in
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className='grid gap-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid gap-2'>
                                <div className='grid gap-1 py-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        {...register('email')}
                                        className={cn({
                                            'focus-visible:ring-red-500': errors.email
                                        })}
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className='grid gap-1 py-2'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input
                                        {...register('password')}
                                        className={cn({
                                            'focus-visible:ring-red-500': errors.password
                                        })}
                                        type="password"
                                    />
                                </div>

                                <Button>Sign up</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage
