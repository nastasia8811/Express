import express, { type Response, type NextFunction } from 'express'
import { ErrorHandler } from '../error/errorHandler.ts'
import type { NewspostByIdRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.get('/:id', async (req: NewspostByIdRequest, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    const newspost = await NewspostsService.getById(id)

    if (!newspost) return res.status(404).json({ message: 'Newspost not found' })

    return res.json(newspost)
  } catch (error) {
    next(new ErrorHandler('Internal server error', 500))
  }
})

export default app
