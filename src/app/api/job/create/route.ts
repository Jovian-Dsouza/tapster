import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import JSZip from 'jszip'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const { publisher,name, type, reward, data } = await req.json();

    console.log('walletAddress:', publisher)
    console.log('name:', name)
    console.log('type:', type)
    console.log('reward:', reward)
    console.log('data:', data)

    return NextResponse.json({result:"labellingJob"})
  } catch (error) {
    console.error('Error creating labelling job:', error)
    return NextResponse.json({ error: 'Error creating labelling job' }, { status: 500 })
  }
}

