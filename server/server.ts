import path from 'node:path'
import { config } from './config.ts'
import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import newspostsRouter from './src/routes/newsposts.ts'
import newspostsIdRouter from './src/routes/newspostsId.ts'
import newspostsPostRouter from './src/routes/newspostsPost.ts'
import newspostsUpdateRouter from './src/routes/newspostsUpdate.ts'
import newspostsDeleteRouter from './src/routes/newspostsDelete.ts'
import { ErrorHandler } from './src/error/errorHandler.ts'

const app: Express = express()
const clientDistPath = path.join(import.meta.dirname, '../client/dist')
app.use(express.json())
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }))

app.use('/api/newsposts', newspostsRouter)
app.use('/api/newsposts', newspostsIdRouter)
app.use('/api/newsposts', newspostsPostRouter)
app.use('/api/newsposts', newspostsUpdateRouter)
app.use('/api/newsposts', newspostsDeleteRouter)

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.use(express.static(clientDistPath))

app.get('/{*splat}', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }
  console.error(err)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  })
})

app.listen(config.port, config.host, (): void => {
  console.log(`Listening on ${config.host}:${config.port}`)
})
