import Ajv from 'ajv'

const ajv = new Ajv({ allErrors: true })

const properties = {
  title: { type: 'string', maxLength: 50 },
  text: { type: 'string', maxLength: 256 },
  genre: { type: 'string', enum: ['Politic', 'Business', 'Sport', 'Other'] },
  isPrivate: { type: 'boolean' },
}

const validateCreate = ajv.compile({
  type: 'object',
  properties,
  required: ['title', 'text', 'genre', 'isPrivate'],
  additionalProperties: false,
})

const validateUpdate = ajv.compile({
  type: 'object',
  properties,
  minProperties: 1,
  additionalProperties: false,
})

export { ajv, validateCreate, validateUpdate }
