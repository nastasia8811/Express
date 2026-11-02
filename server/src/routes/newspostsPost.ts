import express, { type Response } from 'express'
import type { CreateNewspostRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.post('/', async (req: CreateNewspostRequest, res: Response) => {
  const newspost = await NewspostsService.create(req.body)
  return res.status(201).json(newspost)
})

export default app
