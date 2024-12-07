'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Upload, BarChart, Users } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";

interface DashboardStats {
    totalDatasets: number
    totalDatasetsChange: number
    labellingProgress: number
    labellingProgressChange: number
    activeLabelersCount: number
    activeLabelersChange: number
    recentUploads: {
      id: string
      title: string
      createdAt: string
      _count: { images: number }
    }[]
  }

export default function DashboardPage() {


    const [stats, setStats] = useState<DashboardStats | null>(null)
    const wallet = useWallet()

    useEffect(() => {
        async function fetchStats() {
            if (wallet.connected && wallet.account?.address) {
                try {
                    const response = await fetch(`/api/job/get_stats?address=${wallet.account.address}`)
                    if (!response.ok) throw new Error('Failed to fetch stats')
                    const data = await response.json()
                    setStats(data)
                } catch (error) {
                    console.error('Error fetching dashboard stats:', error)
                }
            }
        }

        fetchStats()
    }, [wallet.connected, wallet.account?.address])

    if (!stats) {
        return <div className="py-8">Loading...</div>
    }

    return (
        <div className="p-6 py-8 space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{stats.totalDatasets}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.totalDatasetsChange > 0 ? '+' : ''}{stats.totalDatasetsChange} from last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Labelling Progress</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{stats.labellingProgress}%</div>
                        <Progress value={stats.labellingProgress} className="mt-2" />
                        <p className="text-xs text-muted-foreground">
                            {stats.labellingProgressChange > 0 ? '+' : ''}{stats.labellingProgressChange}% from last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Labelers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{stats.activeLabelersCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.activeLabelersChange > 0 ? '+' : ''}{stats.activeLabelersChange} from last week
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats.recentUploads.map((job) => (
                            <div key={job.id} className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{job.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Uploaded on {new Date(job.createdAt).toLocaleDateString()} • {job._count.images} items
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Link href={"/dashboard/upload"}>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" /> Upload New Dataset
                    </Button>
                </Link>
            </div>
        </div>
    )
}

