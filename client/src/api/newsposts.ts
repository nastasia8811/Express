import { request } from './client'
import type { NewsInput, NewsPost } from './types'

// signal дає змогу скасувати запит.React Query сам передає його,
// коли користувач іде зі сторінки до того, як дані прийшли.
export const newsApi = {
  list(page: number, size: number, signal?: AbortSignal) {
    return request<NewsPost[]>(`/newsposts?page=${page}&size=${size}`, { signal })
  },

  get(id: string | number, signal?: AbortSignal) {
    return request<NewsPost>(`/newsposts/${id}`, { signal })
  },

  create(data: NewsInput) {
    return request<NewsPost>('/newsposts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  //Partial<NewsInput> робить усі поля необов'язковими
  update(id: string | number, data: Partial<NewsInput>) {
    return request<NewsPost>(`/newsposts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  remove(id: string | number) {
    return request<void>(`/newsposts/${id}`, { method: 'DELETE' })
  },
}
