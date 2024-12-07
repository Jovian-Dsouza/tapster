import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { title, description, reward, creatorId, imageUrls } = await req.json()

    if (!title || !reward || !creatorId || !imageUrls || !Array.isArray(imageUrls)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }

    const labellingJob = await prisma.labellingJob.create({
      data: {
        title,
        description,
        reward,
        creator: { connect: { id: creatorId } },
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      }
    })

    return NextResponse.json(labellingJob)
  } catch (error) {
    console.error('Error creating labelling job:', error)
    return NextResponse.json({ error: 'Error creating labelling job' }, { status: 500 })
  }
}

