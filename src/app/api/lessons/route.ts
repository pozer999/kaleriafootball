import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Category, Level } from '@/app/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') as Category | null
    const level = searchParams.get('level') as Level | null
    const sortBy = searchParams.get('sortBy') || 'newest'

    // Build where clause
    const where: any = {
      isPublished: true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ]
    }

    if (category) {
      where.category = category
    }

    if (level) {
      where.level = level
    }

    // Build orderBy
    let orderBy: any = {}
    switch (sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'popular':
        orderBy = { views: 'desc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy,
      include: {
        gallery: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    return NextResponse.json(lessons)
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

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
        duration: body.duration,
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

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}