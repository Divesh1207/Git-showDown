



import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Laugh, Trophy, Star } from 'lucide-react';
const ComparisonResult = ({ user, comparisonUser, userAvatar, comparisonUserAvatar, troll, isLoadingTroll }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-4 py-6"
    >
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="p-4">
          <h2 className=" sm:text-xl md:text-3xl font-bold text-gray-800 text-center">Results</h2>
        </div>

        {/* User Profiles Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 p-4 sm:p-8 bg-gray-50">
          {/* User 1 Profile */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 text-center transition-all duration-300 ease-in-out flex-1"
          >
            <div className="relative inline-block mb-4">
              <img 
                src={userAvatar}
                alt={`${user.login}'s avatar`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-200 shadow-md mx-auto"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                <Users2 size={16} />
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{user.login}</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center justify-center">
                <Star className="mr-2 text-yellow-500" size={16} />
                <span className="text-sm">Followers: <span className="font-bold text-blue-600">{user.followers}</span></span>
              </div>
              <div className="flex items-center justify-center">
                <Trophy className="mr-2 text-green-500" size={16} />
                <span className="text-sm">Repos: <span className="font-bold text-green-600">{user.public_repos}</span></span>
              </div>
            </div>
          </motion.div>

          {/* User 2 Profile */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 text-center transition-all duration-300 ease-in-out flex-1"
          >
            <div className="relative inline-block mb-4">
              <img 
                src={comparisonUserAvatar}
                alt={`${comparisonUser.login}'s avatar`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-purple-200 shadow-md mx-auto"
              />
              <div className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                <Users2 size={16} />
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{comparisonUser.login}</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center justify-center">
                <Star className="mr-2 text-yellow-500" size={16} />
                <span className="text-sm">Followers: <span className="font-bold text-purple-600">{comparisonUser.followers}</span></span>
              </div>
              <div className="flex items-center justify-center">
                <Trophy className="mr-2 text-green-500" size={16} />
                <span className="text-sm">Repos: <span className="font-bold text-green-600">{comparisonUser.public_repos}</span></span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Epic Roast Section */}
        <div className="bg-slate-300 font-medium p-4 sm:p-6 rounded-lg shadow-md text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <Laugh className="text-amber-500" size={24} />
              <h3 className="mx-2 text-lg sm:text-xl font-bold text-gray-700">Epic Roast</h3>
              <Laugh className="text-amber-500" size={24} />
            </div>
            {isLoadingTroll ? (
              <p className="text-gray-500 italic text-base animate-pulse">
                Crafting the ultimate burn...
              </p>
            ) : (
              <p className="text-gray-800 italic text-base">
                "{troll}"
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default ComparisonResult

