import prisma from '@/lib/db'
import { NextResponse } from 'next/server';


export default async function GET(req: Request) {
    try{
        const {walletAddress} = await req.json();
        const org = await prisma.enterpriseOrg.findUnique({
            where: {walletAddress}
        })
        return NextResponse.json(org)
    }catch(err){
        console.error('Error getting org:', err)
        return NextResponse.json({error: 'Error getting org'}, {status: 500})
    }
}