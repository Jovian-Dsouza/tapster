import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { publisher,name, type, reward, data } = await req.json();
    const floatReward = parseFloat(reward)
    const creator = await prisma.user.findFirst({
      where: {
        walletAddress: publisher
      }
    })

    if(creator){
      const labellingJob = await prisma.labellingJob.create({
        data: {
          title:name,
          description:'TODO',
          reward:floatReward,
          creator: { connect: { id: creator.id } },
          images: {
            create: data.map((url:any) => ({ url }))
          }
        }
      })
      return NextResponse.json(labellingJob);
    }
    else{
      return NextResponse.json({ error: 'User not found' }, { status
      : 404 })
    }
  } catch (error) {
    console.error('Error creating labelling job:', error)
    return NextResponse.json({ error: 'Error creating labelling job' }, { status: 500 })
  }
}

