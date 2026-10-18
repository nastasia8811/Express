import type { NewpostSchema } from '../schemas/newpostSchema.ts'
import type { Request } from 'express'

type PlainObject = Record<string, unknown>

type Item = PlainObject & { id: number }
//type Item = { id: number; [key: string]: unknown }

type NewspostByIdRequest = Request<{ id: string }>

type CreateNewspostBody = Omit<NewpostSchema, 'id' | 'createDate'>
type CreateNewspostRequest = Request<object, object, CreateNewspostBody>

type UpdateNewspostBody = Partial<Omit<NewpostSchema, 'id' | 'createDate'>>
type UpdateNewspostRequest = Request<{ id: string }, object, UpdateNewspostBody>

type DeleteNewspostRequest = Request<{ id: string }>

export type {
  PlainObject,
  Item,
  NewspostByIdRequest,
  CreateNewspostBody,
  CreateNewspostRequest,
  UpdateNewspostBody,
  UpdateNewspostRequest,
  DeleteNewspostRequest,
}
