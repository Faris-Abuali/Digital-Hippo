import next from 'next'

const PORT = Number(process.env.PORT) || 3000

export const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    port: PORT,
})

// This allows us to self-host the next.js app so we don't need to use Vercel
export const nextHandler = nextApp.getRequestHandler()
