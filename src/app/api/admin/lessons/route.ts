import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// GET /api/admin/lessons - получить все уроки
export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        gallery: {
          orderBy: { sortOrder: 'asc' }
        },
        author: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(lessons)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
  }
}

// POST /api/admin/lessons - создать новый урок
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const lesson = await prisma.lesson.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        category: body.category,
        level: body.level,
        duration: body.duration ? parseInt(body.duration) : null,
        mainImage: body.mainImage,
        videoUrl: body.videoUrl,
        tags: body.tags || [],
        isPublished: body.isPublished || false,
        authorId: body.authorId,
        gallery: {
          create: body.gallery?.map((img: any, index: number) => ({
            url: img.url,
            caption: img.caption,
            sortOrder: img.sortOrder || index
          }))
        }
      },
      include: {
        gallery: true
      }
    })

    revalidatePath('/admin')
    revalidatePath('/lessons')
    
    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 })
  }
}

// PUT /api/admin/lessons - обновить урок
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    // Обновляем урок
    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        level: data.level,
        duration: data.duration ? parseInt(data.duration) : null,
        mainImage: data.mainImage,
        videoUrl: data.videoUrl,
        tags: data.tags || [],
        isPublished: data.isPublished || false,
      },
      include: {
        gallery: true
      }
    })

    // Обновляем галерею если есть изменения
    if (data.gallery) {
      // Удаляем старые изображения
      await prisma.galleryImage.deleteMany({
        where: { lessonId: id }
      })

      // Создаем новые
      if (data.gallery.length > 0) {
        await prisma.galleryImage.createMany({
          data: data.gallery.map((img: any, index: number) => ({
            url: img.url,
            caption: img.caption,
            sortOrder: img.sortOrder || index,
            lessonId: id
          }))
        })
      }
    }

    revalidatePath('/admin')
    revalidatePath('/lessons')
    revalidatePath(`/lessons/${id}`)
    
    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 })
  }
}

// DELETE /api/admin/lessons?id=xxx - удалить урок
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    await prisma.lesson.delete({
      where: { id }
    })

    revalidatePath('/admin')
    revalidatePath('/lessons')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 })
  }
}