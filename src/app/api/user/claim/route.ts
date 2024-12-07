import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const claimableRewards = user.claimableRewards

    await prisma.user.update({
      where: { id: userId },
      data: { claimableRewards: 0 }
    })

    // initiate a blockchain transaction here to transfer the rewards

    return NextResponse.json({ success: true, claimedRewards: claimableRewards })
  } catch (error) {
    console.error('Error claiming rewards:', error)
    return NextResponse.json({ error: 'Error claiming rewards' }, { status: 500 })
  }
}

