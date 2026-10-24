import express, { type Response } from 'express'
import type { DeleteNewspostRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.delete('/:id', async (req: DeleteNewspostRequest, res: Response) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) return res.status(404).json({ message: 'Newspost not found' })

  const deletedPost = await NewspostsService.delete(id)
  if (!deletedPost) return res.status(404).json({ message: 'Newspost not found' })

  await NewspostsService.delete(id)
  return res.status(200).json({ message: 'Newspost deleted' })
})

export default app
