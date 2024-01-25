import dotenv from 'dotenv'
import path from 'path'
import type { InitOptions } from 'payload/config'
import payload, { Payload } from 'payload'
import nodemailer from 'nodemailer'

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: "faris.abuali@outlook.com",
        pass: "Fhaartie$m2123720",
    },
    tls: {
        rejectUnauthorized: false
    },
})


let cached = (global as any).payload

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    }
}

interface Args {
    initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET environment variable is not set')
    }

    if (cached.client) {
        return cached.client
    }

    if (!cached.promise) {
        cached.promise = payload.init({
            email: {
                transport: transporter,
                // fromAddress: 'onboarding@resend.com',
                // fromAddress: 'onboarding@resend.dev',
                fromAddress: 'faris.abuali@outlook.com',
                fromName: 'DigitalHippo',
            },
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {}),
        })
    }

    try {
        cached.client = await cached.promise
    }
    catch (error: unknown) {
        cached.promise = null
        throw error
    }

    return cached.client
}
