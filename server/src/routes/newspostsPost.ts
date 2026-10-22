import express, { type Request, type Response, type NextFunction } from 'express'
import { ErrorHandler } from '../error/errorHandler.ts'
import type { CreateNewspostRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.post('/', async (req: Request<CreateNewspostRequest>, res: Response, next: NextFunction) => {
  try {
    const newspost = await NewspostsService.create(req.body)
    return res.status(201).json(newspost)
  } catch (error) {
    next(new ErrorHandler('Internal server error', 500))
  }
})

export default app
