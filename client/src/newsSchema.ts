import { z } from 'zod'

export const TITLE_MAX = 120
export const TEXT_MAX = 5000

export const newsSchema = z.object({
  title: z.string().trim().min(3, 'validation.titleMin').max(TITLE_MAX, 'validation.titleMax'),
  text: z.string().trim().min(10, 'validation.textMin').max(TEXT_MAX, 'validation.textMax'),
})

export type NewsFormValues = z.infer<typeof newsSchema>
