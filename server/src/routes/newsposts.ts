import express, { type Response, type NextFunction } from 'express'
import { ErrorHandler } from '../error/errorHandler.ts'
import type { GetNewspostsRequest } from '../types/types.ts'
import { NewspostsService } from '../services/newsposts.service.ts'

const app = express()
app.use(express.json())

app.get('/', async (req: GetNewspostsRequest, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 0
    const size = Number(req.query.size) || 10
    const newsposts = await NewspostsService.getAll({ page, size })
    return res.json(newsposts)
  } catch (error) {
    console.error(error)
    next(new ErrorHandler('Internal server error', 500))
  }
})

export default app
