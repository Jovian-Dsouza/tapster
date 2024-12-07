import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const walletAddress = searchParams.get('walletAddress');
    console.log('walletAddress:', walletAddress)

    if(walletAddress === null) return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { walletAddress }
    })
    const userId = user?.id;

    console.log('userId:', userId)

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const labellingJob = await prisma.labellingJob.findFirst({
      where: {
        NOT: {
          labellings: {
            some: {
              userId: userId
            }
          }
        }
      },
      include: {
        images: {
          where: {
            NOT: {
              labellings: {
                some: {
                  userId: userId
                }
              }
            }
          },
          take: 2
        }
      }
    })

    if (!labellingJob) {
      return NextResponse.json({ message: 'No more labelling jobs available' }, { status: 404 })
    }

    console.log(labellingJob)

    return NextResponse.json(labellingJob)
  } catch (error) {
    console.error('Error fetching labelling job:', error)
    return NextResponse.json({ error: 'Error fetching labelling job' }, { status: 500 })
  }
}

