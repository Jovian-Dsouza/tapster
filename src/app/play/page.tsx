'use client'
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { Heart, Star, Coins, ChevronDown, ChevronUp } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

export default function PlayPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('images')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Beauty')
  const [isLiking, setIsLiking] = useState(false);
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [likedStates, setLikedStates] = useState<Record<number, boolean>>({})
  const mainCategories = [
    { name: 'images', label: 'Images', icon: <Star /> },
    { name: 'shorts', label: 'Shorts', icon: <Coins /> },
  ]
  
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  
  const imagePairs = [
    [
      { id: 1, url: 'https://placehold.co/600x400.png' },
      { id: 2, url: 'https://placehold.co/600x400.png' }
    ],
    [
      { id: 3, url: 'https://placehold.co/600x400.png' },
      { id: 4, url: 'https://placehold.co/600x400.png' }
    ],
    // Add more pairs
  ]
  const videos = [
    { id: 1, url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 2, url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
    // Add more videos
  ]

  const handleLike = async (imageId:string) => {
    setIsLiking(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setCurrentIndex(prev => prev + 1)
    setIsLiking(false)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = swipePower(info.offset.y, info.velocity.y)
    
    if (selectedMainCategory === 'shorts') {
      if (swipe < -swipeConfidenceThreshold) {
        setCurrentIndex(prev => prev + 1) // Swipe up for next
      } else if (swipe > swipeConfidenceThreshold) {
        setCurrentIndex(prev => Math.max(0, prev - 1)) // Swipe down for previous
      }
    }
  }

  return (
    <div className="px-4 h-screen relative bg-white pt-[120px] flex flex-col items-center max-w-md mx-auto rounded-lg overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedMainCategory === 'images' ? (
        <motion.div
          key={currentPairIndex}
          className="flex gap-4 w-full px-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {imagePairs[currentPairIndex]?.map((image, index) => (
            <motion.div
              key={image.id}
              className="flex-1 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className={`rounded-3xl p-0.5 bg-gradient-to-b ${
                  index === 0 ? 'from-blue-400 to-green-400' : 'from-pink-400 to-red-400'
                } shadow-lg`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative rounded-[22px] overflow-hidden w-full aspect-[3/4] bg-gray-100">
                  <Image
                    src={image.url}
                    alt={`Image ${image.id}`}
                    fill
                    className="object-cover"
                  />
                  <motion.button
                    className="absolute bottom-4 right-4 p-3 bg-white rounded-full"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike("1")}
                  >
                    <Heart className={`w-6 h-6 ${
                      likedStates[image.id] ? 'text-red-500 fill-red-500' : 'text-gray-600'
                    }`} />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        ) : (
          <motion.div
            key="shorts"
            className="w-full h-[75vh]" 
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <video
              src={videos[currentIndex]?.url}
              className="w-full h-full rounded-2xl object-cover"
              autoPlay
              loop
              muted
            />
            <div className="absolute right-4 bottom-20 flex flex-col gap-4">
              <motion.button
                className="p-3 bg-white rounded-full"
                whileTap={{ scale: 0.9 }}
                onClick={()=>handleLike("1")}
              >
                <Heart className={`w-6 h-6 ${isLiking ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
              </motion.button>
              <div className="flex flex-col gap-2">
                <ChevronUp className="w-6 h-6 text-white" />
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full mt-6 px-4 absolute bottom-5">
        <div className="flex rounded-lg bg-purple-50/60 p-2 gap-2 shadow-inner">
          {mainCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 text-sm transition-all
                ${selectedMainCategory === category.name
                  ? 'bg-purple-200 text-purple-800 shadow-md'
                  : 'text-gray-600 hover:bg-purple-100'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMainCategory(category.name)}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium hidden sm:inline">{category.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}