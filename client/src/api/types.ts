export interface NewsPost {
  id: number
  title: string
  text: string
  createDate?: string
  genre: string
  isPrivate: boolean
}

export interface NewsInput {
  title: string
  text: string
}
