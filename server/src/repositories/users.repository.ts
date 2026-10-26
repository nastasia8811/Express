import { fileDB } from '../fileDB.ts'
import type { UserSchema } from '../interfaces/interfaces.ts'

fileDB.registerSchema('users', {
  email: String,
  password: String,
})

const users = fileDB.getTable<UserSchema>('users')

const findUserByEmail = (email: string) => users.getAll().find(user => user.email === email)

const findUserById = (id: number) => users.getById(id)

const createUser = (email: string, password: string) => users.create({ email, password })

export { findUserByEmail, findUserById, createUser }
