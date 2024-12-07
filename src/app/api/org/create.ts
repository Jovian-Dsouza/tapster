import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, walletAddress } = await req.json()

    if (!name || !walletAddress) {
      return NextResponse.json({ error: 'Name and wallet address are required' }, { status: 400 })
    }

    const enterpriseOrg = await prisma.enterpriseOrg.create({
      data: {
        name,
        walletAddress,
      },
    })

    return NextResponse.json(enterpriseOrg)
  } catch (error) {
    console.error('Error creating enterprise organization:', error)
    return NextResponse.json({ error: 'Error creating enterprise organization' }, { status: 500 })
  }
}

