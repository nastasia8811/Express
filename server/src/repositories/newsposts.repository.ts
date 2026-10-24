import { fileDB } from '../fileDB.ts'
import type { CreateNewspostBody, PaginationParams, UpdateNewspostBody } from '../types/types.ts'
import { newspostSchema } from '../schemas/newspostSchema.ts'

fileDB.registerSchema('newspost', newspostSchema)
const table = fileDB.getTable('newspost')

/* export const newspostRepository = {
  getAll: () => table.getAll(),
  getById: (id: number) => table.getById(id),
  create: (data: CreateNewspostBody) => table.create(data),
  update: (id: number, data: UpdateNewspostBody) => table.update(id, data),
  delete: (id: number) => table.delete(id),
}*/

export class NewspostsRepository {
  static getAll({ page, size }: PaginationParams) {
    const all = table.getAll()
    const start = page * size
    return all.slice(start, start + size)
  }

  static getById(id: number) {
    return table.getById(id)
  }

  static create(data: CreateNewspostBody) {
    return table.create(data)
  }

  static update(id: number, data: UpdateNewspostBody) {
    return table.update(id, data)
  }

  static delete(id: number) {
    return table.delete(id)
  }
}
