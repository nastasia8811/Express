import { fileDB } from '../fileDB.ts'
import type { CreateNewspostBody, UpdateNewspostBody } from '../types/types.ts'
import { newspostSchema } from '../schemas/newpostSchema.ts'

fileDB.registerSchema('newspost', newspostSchema)
const table = fileDB.getTable('newspost')

export const newspostRepository = {
  getAll: () => table.getAll(),
  getById: (id: number) => table.getById(id),
  create: (data: CreateNewspostBody) => table.create(data),
  update: (id: number, data: UpdateNewspostBody) => table.update(id, data),
  delete: (id: number) => table.delete(id),
}
