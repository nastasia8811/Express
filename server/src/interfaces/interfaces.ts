// Repository Pattern - Доступ до даних інкапсульований у стандартному наборі операцій.
// Логіка зберігання відокремлена від решти коду, тому спосіб зберігання в майбутньому можна змінити без змін в інших модулях.
import type { CreateNewspostBody } from '../types/types.ts'

interface Table<T> {
  getAll(): T[]
  getById(id: number): T | undefined
  create(data: CreateNewspostBody): T
  update(id: number, data: Partial<Omit<T, 'id' | 'createDate'>>): T | null
  delete(id: number): number | null
}

export type { Table }
