/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Heart, Star, ChevronRight, Coins } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"
import girl1 from "../../../public/image3.png"
import girl2 from "../../../public/image4.png"
import girl3 from "../../../public/image.png"
import girl4 from "../../../public/image2.png"

export default function MobileMatchingInterface() {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('imaima')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Beauty')
  const [liked, setLiked] = useState<boolean>(false)

  const mainCategories = [
    { name: 'imaima', label: 'Image to Image', icon: '🖼️' },
    { name: 'imatet', label: 'Image to Text', icon: '📝' },
    { name: 'shorts', label: 'Shorts', icon: '📱' },
  ]

  const subCategories: { [key: string]: { name: string; emoji: string; }[] } = {
    'imaima': [
      { name: 'Beauty', emoji: '👱‍♀️' },
      { name: 'Car', emoji: '🚗' },
      { name: 'Real Estate', emoji: '🏠' },
    ],
    'imatet': [
      { name: 'Fashion', emoji: '👜' },
      { name: 'Travel', emoji: '🗺️' },
      { name: 'Food', emoji: '🍔' },
    ],
    'shorts': [
      { name: 'Comedy', emoji: '😂' },
      { name: 'Dance', emoji: '💃' },
      { name: 'Music', emoji: '🎵' },
    ],
  }

  return (
    <div className="h-screen bg-white p-4 pt-[70px] flex flex-col items-center max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-3xl font-bold text-pink-800 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        TagMaster
      </motion.div>

      {/* Level and Coins */}
      <div className="flex gap-4 mb-6">
        <motion.div 
          className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-lg font-semibold text-gray-700">Lv.1</span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Coins className="w-5 h-5 text-yellow-600" />
          <span className="text-lg font-semibold text-gray-700">1,234</span>
        </motion.div>
      </div>

      {/* Main Category Tabs */}
      <div className="w-full mb-6">
        <div className="flex rounded-lg bg-white/60 p-1 shadow-inner">
          {mainCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-2 text-sm transition-all
                ${selectedMainCategory === category.name 
                  ? 'bg-pink-200 text-pink-800 shadow-md' 
                  : 'text-gray-600 hover:bg-pink-50'}`}
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

      {/* Sub Category Pills */}
      <motion.div 
        className="flex gap-2 mb-6 w-full flex-wrap justify-center px-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {subCategories[selectedMainCategory].map((category) => (
          <motion.button
            key={category.name}
            className={`px-4 py-2 rounded-full flex items-center gap-1 text-xs transition-all shadow-sm
              ${selectedSubCategory === category.name 
                ? 'bg-pink-200 border border-pink-300 text-pink-800' 
                : 'bg-white border border-transparent text-gray-600 hover:bg-pink-50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSubCategory(category.name)}
          >
            <span className="text-base">{category.emoji}</span>
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {selectedMainCategory !== 'shorts' ? (
          <motion.div 
            key="images"
            className="flex gap-4 w-full px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { gradient: 'from-blue-400 to-green-400', image: liked ? girl3 : girl1 },
              { gradient: 'from-pink-400 to-red-400', image: liked ? girl4 : girl2 }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="flex-1 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + (index * 0.2) }}
              >
                <motion.div 
                  className={`rounded-3xl p-0.5 bg-gradient-to-b ${card.gradient} shadow-lg`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="relative rounded-[22px] overflow-hidden w-full aspect-[3/4] bg-gray-100"
                    layoutId={`image-container-${index}`}
                  >
                    <Image
                      src={card.image}
                      alt={`Content ${index + 1}`}
                      fill
                      className="object-cover"
                      style={{ 
                        transition: "all 0.5s ease-in-out",
                        transform: liked ? "scale(1.1)" : "scale(1)" 
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.button
                  className={`absolute -bottom-4 right-4 w-12 h-12 rounded-full 
                    bg-gradient-to-b ${card.gradient} flex items-center justify-center
                    shadow-lg border-2 border-white`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLiked(!liked)}
                  animate={{
                    rotate: liked ? [0, 15, -15, 0] : 0,
                    scale: liked ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <Heart className={`w-6 h-6 ${liked ? 'fill-white' : ''} text-white`} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="shorts"
            className="w-full px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden shadow-lg relative">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/placeholder.mp4" type="video/mp4" />
              </video>
              <motion.button
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full 
                  bg-gradient-to-b from-pink-400 to-red-400 flex items-center justify-center
                  shadow-lg border-2 border-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-white' : ''} text-white`} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        className="mt-8 relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-20 h-20 rounded-full border-4 border-pink-200 flex items-center justify-center bg-white/80 shadow-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-base font-semibold text-pink-800">
              <span>50/50</span>
            </div>
            <div className="text-pink-600 text-xs">Full</div>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-pink-400"
          style={{ borderRadius: '100%' }}
          initial={{ rotate: -90 }}
          animate={{ 
            rotate: 270,
            transition: { duration: 1, delay: 1 }
          }}
        />
      </motion.div>
    </div>
  )
}
