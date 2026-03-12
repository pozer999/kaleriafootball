export interface Advantage {
  title: string
  description: string
  icon?: string
}

export interface Lesson {
  id: string
  title: string
  description: string | null
  content: string | null
  category: Category
  level: Level
  duration: number | null
  mainImage: string | null
  videoUrl: string | null
  tags: string[]
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
  gallery?: GalleryImage[]
  authorId?: string | null
  author?: {
    name: string | null
    email: string
  } | null
}

export interface GalleryImage {
  id: string
  url: string
  caption: string | null
  sortOrder: number
  createdAt: Date
}

export type Category = 'FOOTBALL' | 'FITNESS' | 'STRETCHING' | 'GAMES'

export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export interface LessonFilters {
  search?: string
  category?: Category | 'ALL'
  level?: Level | 'ALL'
  sortBy?: 'newest' | 'oldest' | 'popular'
}

export interface User {
  id: string
  email: string
  name: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}