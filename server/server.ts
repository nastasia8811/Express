import { fileDB } from './src/fileDB.ts'
import type { NewpostSchema } from './src/schemas/newpostSchema.ts'
import express, { type Express, type Request, type Response, type NextFunction } from 'express'
//import newsposts from './src/routes/newsposts.ts'
//import newspostsId from './src/routes/newpostsId.ts'

const app: Express = express()
import { config } from './config.ts'
import path from 'node:path'
import { ErrorHandler } from './src/error/errorHandler.ts'
import { newspostSchema } from './src/schemas/newpostSchema.js'

app.use(express.json())
app.use(express.static(path.join(import.meta.dirname, '../client/dist')))

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }))

app.post('/', (_req: Request, res: Response) => {
  res.send('POST request to the homepage')
})

/* ---------------------------- Routes --------------------------- */
// app.use('/api/newsposts', newsposts)
// app.use('/api//newsposts/:id', newspostsId)

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ErrorHandler ? err.statusCode : 500
  res.status(statusCode).json({
    success: false,
    message: err.message,
  })
  next()
})

app.listen(config.port, config.host, (): void => {
  console.log(`Listening on ${config.host}:${config.port}`)
})

fileDB.registerSchema('newspost', newspostSchema)
const newspostTable = fileDB.getTable<NewpostSchema>('newspost')

const data = {
  title: 'У зоопарку Чернігова лисичка народила лисеня',
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
}

// додаємо новий запис, та повертаємо його з новим id
const createdNewspost = newspostTable.create(data)
console.log('create:', createdNewspost)

// повертаємо усі записи у базі у вигляді масиву
const newsposts = newspostTable.getAll()
console.log('getAll:', newsposts)

// повертаємо запис за вказаним id
const newspost = newspostTable.getById(createdNewspost.id)
console.log('getById:', newspost)

// оновлюємо поле title за вказаним id та повертаємо оновлений запис
const updatedNewsposts = newspostTable.update(createdNewspost.id, {
  title: 'Маленька лисичка',
  size: 2,
})
console.log('update:', updatedNewsposts)

// видаляємо запис за вказаним id та повертаємо id видаленого запису
const deletedId = newspostTable.delete(createdNewspost.id)
console.log('delete:', deletedId)

const getAllAfterDelete = newspostTable.getAll()
console.log('getAll після delete:', getAllAfterDelete)
