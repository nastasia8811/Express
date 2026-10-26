import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv.default()
addFormats.default(ajv)

const newsProperties = {
  title: { type: 'string', maxLength: 50 },
  text: { type: 'string', maxLength: 256 },
  genre: { type: 'string', enum: ['Politic', 'Business', 'Sport', 'Other'] },
  isPrivate: { type: 'boolean' },
}
const registrationProperties = {
  email: { type: 'string', format: 'email' },
  password: { type: 'string', minLength: 1 },
  confirmPassword: { type: 'string' },
}
const loginProperties = {
  email: { type: 'string', format: 'email' },
  password: { type: 'string' },
}

const validateCreate = ajv.compile({
  type: 'object',
  properties: newsProperties,
  required: ['title', 'text', 'genre', 'isPrivate'],
  additionalProperties: false,
})

const validateUpdate = ajv.compile({
  type: 'object',
  properties: newsProperties,
  minProperties: 1,
  additionalProperties: false,
})

const validateRegistration = {
  type: 'object',
  properties: registrationProperties,
  required: ['email', 'password', 'confirmPassword'],
  additionalProperties: false,
}

const validateAuthentification = {
  type: 'object',
  properties: loginProperties,
  required: ['email', 'password'],
  additionalProperties: false,
}

export { ajv, validateCreate, validateUpdate, validateRegistration, validateAuthentification }
