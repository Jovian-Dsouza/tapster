'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsContent({ data }: { data: any }) {

    const { labellingJobsProgress, topLabelers, totalLabels, totalComparisons, totalUsers, recentActivity } = data

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <StatCard title="Total Labels" value={totalLabels} />
                <StatCard title="Total Comparisons" value={totalComparisons} />
                <StatCard title="Total Users" value={totalUsers} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Labelling Progress by Dataset</CardTitle>
                        <CardDescription>Percentage of completion for each dataset</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {labellingJobsProgress.map((job: any) => {
                            const progress = (job.labellings.length / job.images.length) * 100
                            return (
                                <div key={job.id} className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>{job.title}</span>
                                        <span>{progress.toFixed(2)}%</span>
                                    </div>
                                    <Progress value={progress} />
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Labelers</CardTitle>
                        <CardDescription>Most active labelers this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                tasksCompleted: {
                                    label: "Tasks Completed",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[200px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topLabelers}>
                                    <XAxis dataKey="walletAddress" tickFormatter={(value) => `${value.slice(0, 6)}...`} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="tasksCompleted" fill="var(--color-tasksCompleted)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest labelling activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentActivity.map((activity: any) => (
                            <li key={activity.id} className="flex justify-between items-center">
                                <span>{activity.user.walletAddress.slice(0, 6)}...{activity.user.walletAddress.slice(-4)} labeled an image in {activity.labellingJob.title}</span>
                                <span className="text-sm text-gray-500">{new Date(activity.createdAt).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({ title, value }: { title: string, value: number }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-8">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value.toLocaleString()}</div>
            </CardContent>
        </Card>
    )
}

