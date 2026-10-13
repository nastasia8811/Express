const port = process.env.PORT
const host = process.env.HOST ?? 'localhost'

const portNumber = Number(port)

if (!Number.isInteger(portNumber) || portNumber <= 0) {
  throw new Error(`PORT must be a positive integer, got "${port}"`)
}

export const config = {
  port: portNumber,
  host,
}
