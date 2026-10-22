import { NewspostsRepository } from '../repositories/newsposts.repository.ts'
import type { CreateNewspostBody, UpdateNewspostBody, PaginationParams } from '../types/types.ts'

export class NewspostsService {
  static getAll(params: PaginationParams) {
    return NewspostsRepository.getAll(params)
  }

  static getById(id: number) {
    return NewspostsRepository.getById(id)
  }

  static create(data: CreateNewspostBody) {
    return NewspostsRepository.create(data)
  }

  static update(id: number, update: UpdateNewspostBody) {
    return NewspostsRepository.update(id, update)
  }

  static delete(id: number) {
    return NewspostsRepository.delete(id)
  }
}
