import { fileDB } from './src/fileDB.ts'
import { newspostSchema } from './src/schemas/newpostSchema.js'
//import type { NewpostSchema } from './src/schemas/newpostSchema.ts'
import express, { type Request, type Response } from 'express'
import { config } from './config.ts'
import path from 'node:path'

const app = express()
app.use(express.json())
app.use(express.static(path.join(import.meta.dirname, '../client/dist')))

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(config.port, config.host, (): void => {
  console.log(`Listening on ${config.host}:${config.port}`)
})

fileDB.registerSchema('newspost', newspostSchema)
//const newspostTable = fileDB.getTable<NewpostSchema>('newspost')

console.log('ENV check:', process.env.PORT)
