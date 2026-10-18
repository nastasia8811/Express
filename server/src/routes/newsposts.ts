import express, { type Request, type Response, type NextFunction } from 'express'
import { ErrorHandler } from './../error/errorHandler.ts'
import { newspostRepository } from '../repositories/newspost.repository.ts'

const app = express()
app.use(express.json())

app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const newsposts = await newspostRepository.getAll()
    return res.json(newsposts)
  } catch (error) {
    console.error(error)
    next(new ErrorHandler('Internal server error', 500))
  }
})

export default app
