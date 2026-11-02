// Repository Pattern - Доступ до даних інкапсульований у стандартному наборі операцій.
// Логіка зберігання відокремлена від решти коду, тому спосіб зберігання в майбутньому можна змінити без змін в інших модулях.

interface NewspostSchema {
  id: number
  title: string
  text: string
  createDate: Date
  genre: string
  isPrivate: boolean
}

interface UserSchema {
  id: number
  email: string
  password: string
  createDate: Date
}

interface Table<T> {
  getAll(): T[]
  getById(id: number): T | undefined
  create(data: Omit<T, 'id' | 'createDate'>): T
  update(id: number, data: Partial<Omit<T, 'id' | 'createDate'>>): T | null
  delete(id: number): number | null
}

export type { Table, NewspostSchema, UserSchema }
