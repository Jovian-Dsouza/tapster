'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem ,Form} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
  name: z.string(),
  type: z.string(),
  data: z.custom(),
  reward: z.number(),
})

export default function UploadPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      data: '',
      reward: 0,
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('type', values.type)
    formData.append('reward', values.reward.toString())
    formData.append('zipFile', values.data)

    try {
      const response = await fetch('/job/create', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Upload New Dataset</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dataset Information</CardTitle>
          <CardDescription>Provide details about the dataset you're uploading.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <Label htmlFor="name">Dataset Name</Label>
                      <FormControl>
                        <Input id="name" placeholder="Enter dataset name" {...field} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <Label htmlFor="type">Dataset Type</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dataset type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectContent>
                            <SelectItem value="images">Images</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                          </SelectContent>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="data"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <Label htmlFor="data">Dataset File</Label>
                      <FormControl>
                        <Input id="data" type="file" {...field} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <Label htmlFor="reward">Reward</Label>
                      <FormControl>
                        <Input id="reward" type="number" placeholder="Enter reward amount" {...field} />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <Button className="w-full">Upload Dataset</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

