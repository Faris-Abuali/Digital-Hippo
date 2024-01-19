import express from 'express'
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils'

const app = express()

// In production, the PORT environment variable will be set
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                // This is where you can add any custom express middleware
                // app.use(...)
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
            },
        },
    })

    app.use((req, res) => nextHandler(req, res))

    nextApp.prepare().then(() => {
        payload.logger.info(`Next.js started`)

        app.listen(PORT, async () => {
            payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        })
    })
}

start()
