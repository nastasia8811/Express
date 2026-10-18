import express, { type Response, type NextFunction } from 'express'
import { ErrorHandler } from './../error/errorHandler.ts'
import type { DeleteNewspostRequest } from './../types/types.ts'
import { newspostRepository } from '../repositories/newspost.repository.ts'
const app = express()
app.use(express.json())

app.delete('/:id', async (req: DeleteNewspostRequest, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) return res.status(404).json({ message: 'Newspost not found' })

    const deletedPost = await newspostRepository.delete(id)
    if (!deletedPost) return res.status(404).json({ message: 'Newspost not found' })

    await newspostRepository.delete(id)
    return res.status(200).json({ message: 'Newspost deleted' })
  } catch (error) {
    next(new ErrorHandler('Internal server error', 500))
  }
})

export default app

app.delete('/:id', async (req: DeleteNewspostRequest, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) return res.status(404).json({ message: 'Newspost not found' })

    const post = await newspostRepository.getById(id)
    if (!post) return res.status(404).json({ message: 'Newspost not found' })

    await newspostRepository.delete(id)
    return res.status(200).json({ message: 'Newspost deleted' })
  } catch (error) {
    console.error(error)
    next(new ErrorHandler('Internal server error', 500))
  }
})
