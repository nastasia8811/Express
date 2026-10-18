import express, { type Response, type NextFunction } from 'express'
import { ErrorHandler } from './../error/errorHandler.ts'
import type { UpdateNewspostRequest } from './../types/types.ts'
import { newspostRepository } from '../repositories/newspost.repository.ts'
const app = express()
app.use(express.json())

app.put('/:id', async (req: UpdateNewspostRequest, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    const updatedPost = await newspostRepository.update(id, req.body)

    if (!updatedPost) return res.status(404).json({ message: 'Newspost not found' })

    return res.json(updatedPost)
  } catch (error) {
    next(new ErrorHandler('Internal server error', 500))
  }
})

export default app
