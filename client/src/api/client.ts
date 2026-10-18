import { ApiError } from '../error/ApiError.ts'

const BASE_URL = '/api'

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }

  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}
