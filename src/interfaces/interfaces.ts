// Repository Pattern - Доступ до даних інкапсульований у стандартному наборі операцій.
// Логіка зберігання відокремлена від решти коду, тому спосіб зберігання в майбутньому можна змінити без змін в інших модулях.
import type { Data } from '../types/types.ts'

interface Table<T> {
  getAll(): T[]
  getById(id: number): T | undefined
  create(data: Data): T
  update(id: number, data: Data): T | null
  delete(id: number): number | null
}

export type { Table }
