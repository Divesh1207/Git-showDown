

import React from 'react'; 
import { motion } from 'framer-motion';
import {
  GitCompareIcon,
  GithubIcon,
} from 'lucide-react';
import Navbar from '../components/NavBar';
import GitHubComparison from '../components/GitHubComparison';
const currentYear = new Date().getFullYear(); // Get the current year
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <Navbar />

     
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl space-y-8">
         
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
       <div className="flex flex-row items-center justify-center md:gap-4 mb-4">
  <GitCompareIcon className="text-gray-600 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-2" />
  <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center whitespace-nowrap">
    GitHub Showdown
  </h1>
  <GithubIcon className="text-gray-600 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ml-2" />
</div>


<p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 max-w-xl mx-auto text-center leading-relaxed px-2 sm:px-4 mb-6">
  Compare and analyze GitHub profiles effortlessly!
</p>

          </motion.div>
          
       
          <GitHubComparison />
        </div>
      </main>
      
   
      <footer className="text-center text-gray-400 p-2 sm:p-4">
  <p className="text-xs sm:text-sm md:text-base lg:text-lg">
    © {currentYear} GitHub Showdown. All rights reserved.
  </p>
</footer>
    </div>
  );
}
