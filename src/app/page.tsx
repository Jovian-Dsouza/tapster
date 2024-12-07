/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full w-full pt-[70px]">
      <section className="w-full flex justify-center py-28 md:py-24 lg:py-72">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center gap-4">
            <div className="space-y-2">
              <h1 className="text-8xl font-bold tracking-tighter sm:text-7xl md:text-10xl lg:text-12xl/none">
                Revolutionize Data Labelling
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-2xl dark:text-gray-400">
                Empower your AI with high-quality data. Upload, label, and enhance your datasets with ease.
              </p>
            </div>
            <div className="space-x-8">
              <Button size={"lg"}>Get Started</Button>
              <Button  size={"lg"} variant={"outline"}>Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
