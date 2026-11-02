import express, { type Response } from 'express'
import type { GetNewspostsRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.get('/error', () => {
  NewspostsService.throwError()
})

app.get('/', async (req: GetNewspostsRequest, res: Response) => {
  const page = Number(req.query.page) || 0
  const size = Number(req.query.size) || 10
  const newsposts = await NewspostsService.getAll({ page, size })
  return res.json(newsposts)
})

export default app
