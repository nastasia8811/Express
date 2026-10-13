const port = process.env.PORT
const host = process.env.HOST

if (!port) throw new Error('PORT is not set in .env')
if (!host) throw new Error('HOST is not set in .env')

export const config = {
  port: Number(port),
  host: host,
}
