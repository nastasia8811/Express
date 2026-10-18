import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { newsApi } from './api/newsposts'
import type { NewsInput, NewsPost } from './api/types'

export const newsKeys = {
  list: ['news', 'list'] as const,
  detail: (id: string | number) => ['news', 'detail', id] as const,
}

export function useNewsList() {
  return useQuery({
    queryKey: newsKeys.list,
    queryFn: ({ signal }) => newsApi.list(signal),
  })
}

export function useNewsPost(id: string) {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: ({ signal }) => newsApi.get(id, signal),
  })
}

export function useCreateNews() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: NewsInput) => newsApi.create(data),
    onSuccess: post => {
      queryClient.setQueryData(newsKeys.detail(post.id), post)
      return queryClient.invalidateQueries({ queryKey: newsKeys.list })
    },
  })
}

export function useUpdateNews(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<NewsInput>) => newsApi.update(id, data),
    onSuccess: post => {
      queryClient.setQueryData(newsKeys.detail(id), post)
      return queryClient.invalidateQueries({ queryKey: newsKeys.list })
    },
  })
}

export function useDeleteNews() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string | number) => newsApi.remove(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData<NewsPost[]>(newsKeys.list, posts =>
        posts?.filter(post => String(post.id) !== String(id))
      )
      return queryClient.invalidateQueries({ queryKey: newsKeys.list })
    },
  })
}
