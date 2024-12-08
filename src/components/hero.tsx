import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { WalrusIcon } from "@/components/walrus-icon"

interface VideoCardProps {
  src: string
  title: string
  style: React.CSSProperties
}

function VideoCard({ src, title, style }: VideoCardProps) {
  return (
    <div 
      className="absolute w-[80%] max-w-[220px] aspect-[9/16] transition-all duration-300 hover:z-50 hover:scale-105" 
      style={{
        ...style,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover" 
          muted 
          autoPlay 
          loop 
          playsInline 
          src={src} 
          aria-label={`Video: ${title}`} 
        />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white text-sm font-semibold">{title}</p>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="flex flex-col pt-32 pb-0 relative w-full">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 min-w-1/2 p-10">
          <Button className="cursor-pointer relative z-10 hover:bg-black/90 border border-transparent text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] flex space-x-2 items-center bg-amber-400/10 border-none text-amber-400">
            <WalrusIcon className="w-5 h-5" />
            <span>Powered by Walrus</span>
          </Button>
          <h1 className="text-left tracking-tight text-black dark:text-amber-50 text-4xl md:text-4xl lg:text-6xl font-bold max-w-6xl mt-0 relative z-10 py-6">
            Earn <span className="text-amber-400">Rewards</span>
            <br />
            while getting entertained
          </h1>
          <h2 className="my-4 mx-auto text-black font-normal text-left mt-2 md:mt-6 text-base md:text-xl dark:text-muted-dark max-w-3xl relative z-10">
            Watch your favorite shorts, discover amazing content, and earn rewards with every interaction.
          </h2>
          <div className="flex items-center gap-4 justify-start my-10 relative z-10 shadow-yellow-500">
            <Link href="/play" passHref legacyBehavior>
              <Button asChild className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-yellow-400 dark:bg-yellow-400/90 hover:bg-yellow-400/90 ring-yellow-400 ring-1 ring-offset-4 hover:ring-offset-2 dark:ring-offset-black ring-offset-white text-black font-bold text-lg rounded-full group py-6">
                <a>
                  Play and Earn
                  <svg 
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true" 
                    className="ml-2 text-black group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" 
                    height="1em" 
                    width="1em" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </Button>
            </Link>
            <Link href="/dashboard" passHref legacyBehavior>
              <Button asChild className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-white dark:bg-yellow-400/90 hover:bg-yellow-400/90 ring-yellow-400 ring-1 ring-offset-4 hover:ring-offset-2 dark:ring-offset-black ring-offset-white text-black font-bold text-lg rounded-full group py-6">
                <a>
                  Rank your dataset
                </a>
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 min-w-1/2 h-[600px] flex items-center justify-center">
          <VideoCard
            src="https://strshrt.xyz/cleopatre.mp4"
            title="The Cleopatre Effect"
            style={{
              transform: 'rotate(0deg) translateX(-200px)',
              zIndex: 3,
            }}
          />
          <VideoCard
            src="https://strshrt.xyz/everest.mp4"
            title="The saddest story on Everest"
            style={{
              transform: 'rotate(10deg) translateX(0px)',
              zIndex: 2,
            }}
          />
          <VideoCard
            src="https://strshrt.xyz/apollo.mp4"
            title="The day Apollo 11 landed on the moon"
            style={{
              transform: 'rotate(20deg) translateX(200px)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 mb-10">
        <div className="flex flex-col sm:flex-row mb-2 lg:justify-start justify-center items-center">
          <div className="flex flex-row items-center mb-4 sm:mb-0">
            {['John Doe', 'Robert Johnson', 'Jane Smith', 'Emily Davis', 'Tyler Durden', 'Dora'].map((name, index) => (
              <div key={name} className="-mr-4 relative group">
                <div className="animation-container">
                  <div className="rounded-2xl overflow-hidden border-2 border-neutral-200 relative" style={{opacity: 1, transform: `scale(1) rotate(${Math.random() * 10 - 5}deg) translateZ(0px)`, zIndex: 'auto'}}>
                    <Image
                      alt={name}
                      src={`https://ozgrozer.github.io/100k-faces/0/1/0013${index}1.jpg`}
                      width={100}
                      height={100}
                      className="object-cover object-top h-14 w-14"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-neutral-400 text-sm ml-8 relative z-40 lg:text-left text-center">Earn with them</p>
      </div>
    </section>
  )
}

