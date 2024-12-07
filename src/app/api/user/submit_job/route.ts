import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId, labellingJobId, imageId } = await req.json()

    if (!userId || !labellingJobId || !imageId) {
      return NextResponse.json({ error: 'User ID, labelling job ID, and image ID are required' }, { status: 400 })
    }

    const labelling = await prisma.labelling.create({
      data: {
        user: { connect: { id: userId } },
        labellingJob: { connect: { id: labellingJobId } },
        image: { connect: { id: imageId } }
      }
    })

    const labellingJob = await prisma.labellingJob.findUnique({
      where: { id: labellingJobId },
      select: { reward: true }
    })

    if (!labellingJob) {
      return NextResponse.json({ error: 'Labelling job not found' }, { status: 404 })
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        tasksCompleted: { increment: 1 },
        claimableRewards: { increment: labellingJob.reward }
      }
    })

    await prisma.labellingJob.update({
      where: { id: labellingJobId },
      data: { labelledByCount: { increment: 1 } }
    })

    return NextResponse.json({ success: true, labelling })
  } catch (error) {
    console.error('Error submitting labelling:', error)
    return NextResponse.json({ error: 'Error submitting labelling' }, { status: 500 })
  }
}

