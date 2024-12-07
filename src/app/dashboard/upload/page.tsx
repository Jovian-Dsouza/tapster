import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UploadPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Upload New Dataset</h1>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dataset Information</CardTitle>
          <CardDescription>Provide details about the dataset you're uploading.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Dataset Name</Label>
            <Input id="name" placeholder="Enter dataset name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Dataset Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select dataset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <Input id="file" type="file" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Upload Dataset</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

