import { z } from 'zod'

export const TITLE_MAX = 50
export const TEXT_MAX = 256
export const GENRES = ['Politic', 'Business', 'Sport', 'Other'] as const

export const newsSchema = z.object({
  title: z.string().trim().min(3, 'validation.titleMin').max(TITLE_MAX, 'validation.titleMax'),
  text: z.string().trim().min(10, 'validation.textMin').max(TEXT_MAX, 'validation.textMax'),
  genre: z.enum(GENRES, { message: 'validation.genre' }),
  isPrivate: z.boolean(),
})

export type NewsFormValues = z.infer<typeof newsSchema>
