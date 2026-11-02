import express, { type Response } from 'express'
import type { UpdateNewspostRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'
import { ErrorHandler } from '../error/errorHandler.ts'

const app = express()
app.use(express.json())

app.put('/:id', async (req: UpdateNewspostRequest, res: Response) => {
  const id = parseInt(req.params.id)
  const updatedPost = await NewspostsService.update(id, req.body)

  if (!updatedPost) throw new ErrorHandler('Newspost not found', 404)
  return res.json(updatedPost)
})

export default app
