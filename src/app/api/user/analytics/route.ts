import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const walletAddress = searchParams.get('walletAddress')

    console.log("got the requests: walletAddress:", walletAddress);

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const labellingJobsProgress = await prisma.labellingJob.findMany({
      where: {
        creatorId: user.id
      },
      select: {
        id: true,
        title: true,
        images: {
          select: { id: true }
        },
        labellings: {
          select: { id: true }
        }
      }
    });

    const topLabelers = await prisma.user.findMany({
      where: {
        labellings: {
          some: {
            labellingJob: {
              creatorId: user.id
            }
          }
        }
      },
      orderBy: { tasksCompleted: 'desc' },
      take: 5,
      select: {
        id: true,
        walletAddress: true,
        tasksCompleted: true
      }
    });

    const totalLabels = await prisma.labelling.count({
      where: {
        labellingJob: {
          creatorId: user.id
        }
      }
    });

    const totalComparisons = await prisma.comparison.count({
      where: {
        labellingJob: {
          creatorId: user.id
        }
      }
    });

    const totalUsers = await prisma.user.count({
      where: {
        labellings: {
          some: {
            labellingJob: {
              creatorId: user.id
            }
          }
        }
      }
    });

    const recentActivity = await prisma.labelling.findMany({
      where: {
        labellingJob: {
          creatorId: user.id
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        labellingJob: true
      }
    });

    console.log('labellingJobsProgress:', labellingJobsProgress);
    console.log('topLabelers:', topLabelers);
    console.log('totalLabels:', totalLabels);
    console.log('totalComparisons:', totalComparisons);
    console.log('totalUsers:', totalUsers);
    console.log('recentActivity:', recentActivity);


    return NextResponse.json({
      labellingJobsProgress,
      topLabelers,
      totalLabels,
      totalComparisons,
      totalUsers,
      recentActivity
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json({ error: 'Error getting analytics' }, { status: 500 });
  }
}
