import express, { type Response } from 'express'

import type { NewspostByIdRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.get('/:id', async (req: NewspostByIdRequest, res: Response) => {
  const id = parseInt(req.params.id)
  const newspost = await NewspostsService.getById(id)

  if (!newspost) return res.status(404).json({ message: 'Newspost not found' })

  return res.json(newspost)
})

export default app
