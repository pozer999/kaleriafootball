import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Calendar, Eye, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { GalleryImage } from '@/app/types'

interface LessonPageProps {
  params: {
    id: string
  }
}

async function getLesson(id: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      gallery: {
        orderBy: { sortOrder: 'asc' }
      },
      author: {
        select: { name: true }
      }
    }
  })

  if (!lesson) return null

  // Increment views
  await prisma.lesson.update({
    where: { id },
    data: { views: { increment: 1 } }
  })

  return lesson
}

const categoryLabels = {
  FOOTBALL: '⚽ Футбол',
  FITNESS: '💪 Фитнес',
  STRETCHING: '🧘 Растяжка',
  GAMES: '🎮 Игры'
}

const levelLabels = {
  BEGINNER: 'Начинающий',
  INTERMEDIATE: 'Средний',
  ADVANCED: 'Продвинутый'
}

const levelColors = {
  BEGINNER: 'bg-green-500',
  INTERMEDIATE: 'bg-yellow-500',
  ADVANCED: 'bg-red-500'
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLesson(params.id)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Button variant="ghost" className="mb-8">
          <Link href="/lessons">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к урокам
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            {lesson.mainImage ? (
              <Image
                src={lesson.mainImage}
                alt={lesson.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-8xl">⚽</span>
              </div>
            )}
          </div>

          Title and Meta
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {/* <Badge variant="outline" className="text-lg px-4 py-1">
                {categoryLabels[lesson.category]}
              </Badge>
              <Badge className={`${levelColors[lesson.level]} text-white px-4 py-1`}>
                {levelLabels[lesson.level]}
              </Badge> */}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(lesson.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {lesson.views} просмотров
              </div>
              {lesson.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {lesson.duration} минут
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {lesson.description && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-muted-foreground">{lesson.description}</p>
            </div>
          )}

          {/* Main Content */}
          {lesson.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          )}

          {/* Video */}
          {lesson.videoUrl && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Видеоурок</h2>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={lesson.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Gallery */}
          {lesson.gallery && lesson.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Галерея</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lesson.gallery.map((image: GalleryImage) => (
                  <div
                    key={image.id}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={image.caption || lesson.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {lesson.tags && lesson.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Теги</h2>
              <div className="flex flex-wrap gap-2">
                {lesson.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Ерина Калерия - Учитель физической культуры</p>
        </div>
      </footer>
    </div>
  )
}