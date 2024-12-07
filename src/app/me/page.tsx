'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { motion } from 'framer-motion';
import { FaWallet, FaMedal, FaFire, FaGift } from 'react-icons/fa';

interface UserStats {
  points: number;
  streak: number;
  rewardsClaimed: number;
  totalAnnotations: number;
}

export default function ProfilePage() {
  const { connected, account } = useWallet();
  const [stats, setStats] = useState<UserStats>({
    points: 0,
    streak: 0,
    rewardsClaimed: 0,
    totalAnnotations: 0
  });

  useEffect(() => {
    // TODO: Fetch user stats from API
    // This is mock data for now
    setStats({
      points: 1250,
      streak: 7,
      rewardsClaimed: 3,
      totalAnnotations: 156
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      {/* Profile Header */}
      <div className="mb-6 text-center mt-20">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${account?.address}`}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-800">
          {connected ? (
            <span>{account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}</span>
          ) : (
            'Connect Wallet'
          )}
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-white p-4 shadow-md"
        >
          <div className="flex items-center gap-2">
            <FaMedal className="text-yellow-500" />
            <span className="text-sm text-gray-600">Points</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">{stats.points}</p>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-white p-4 shadow-md"
        >
          <div className="flex items-center gap-2">
            <FaFire className="text-orange-500" />
            <span className="text-sm text-gray-600">Streak</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">{stats.streak} days</p>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-white p-4 shadow-md"
        >
          <div className="flex items-center gap-2">
            <FaGift className="text-purple-500" />
            <span className="text-sm text-gray-600">Rewards</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">{stats.rewardsClaimed}</p>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-white p-4 shadow-md"
        >
          <div className="flex items-center gap-2">
            <FaWallet className="text-green-500" />
            <span className="text-sm text-gray-600">Annotations</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">{stats.totalAnnotations}</p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-xl bg-white p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Image Annotation</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">+10 pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="mt-6 rounded-xl bg-white p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Available Rewards</h3>
        <div className="space-y-3">
          <div className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">500 Points Milestone</p>
                <p className="text-sm text-gray-600">Claim 0.1 SUI</p>
              </div>
              <button className="rounded-full bg-purple-500 px-4 py-1 text-sm text-white">
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
