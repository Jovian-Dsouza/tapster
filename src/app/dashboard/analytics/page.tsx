import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Labelling Progress by Dataset</CardTitle>
            <CardDescription>Percentage of completion for each dataset</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Product Images", progress: 75 },
              { name: "Customer Reviews", progress: 90 },
              { name: "Inventory Images", progress: 40 },
            ].map((dataset) => (
              <div key={dataset.name} className="space-y-2">
                <div className="flex justify-between">
                  <span>{dataset.name}</span>
                  <span>{dataset.progress}%</span>
                </div>
                <Progress value={dataset.progress} />
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Labeler Performance</CardTitle>
            <CardDescription>Top performing labelers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { name: "Alice Smith", count: 1500 },
                { name: "Bob Johnson", count: 1350 },
                { name: "Carol Williams", count: 1200 },
                { name: "David Brown", count: 1100 },
                { name: "Eva Davis", count: 1000 },
              ].map((labeler, index) => (
                <li key={labeler.name} className="flex justify-between items-center">
                  <span>{index + 1}. {labeler.name}</span>
                  <span className="font-semibold">{labeler.count} labels</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

