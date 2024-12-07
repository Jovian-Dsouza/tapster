'use client'
import AnalyticsContent from '@/components/analytics-content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';



export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const wallet = useWallet();
  useEffect(()=>{
    async function fetchData(){
      if(wallet.account?.address){
        try{
          const response = await fetch(`/api/user/analytics?walletAddress=${wallet.account?.address}`);
          // @ts-ignore
          const data = await response.json();
          setData(data);
          setIsLoading(false);
          console.log("Data asdad", data);
          return data;
        }catch(error){
          console.error('Error fetching analytics data',error);
          return null;
        }
      }
    }
    fetchData()
  },[wallet.connected, wallet.account?.address])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      {(isLoading || !data)? <AnalyticsSkeletons /> : <AnalyticsContent data={data} />}
    </div>
  )
}

function AnalyticsSkeletons() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

