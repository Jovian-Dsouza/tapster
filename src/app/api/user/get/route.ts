import prisma from '@/lib/db'
import { NextResponse } from 'next/server'


export default async function GET(req: Request) {
  try {
    const { walletAddress } = await req.json();
    const user = await prisma.user.findUnique({
        where: { walletAddress }
    }) 

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error getting users:', error)
    return NextResponse.json({ error: 'Error getting users' }, { status: 500 })
  }
}