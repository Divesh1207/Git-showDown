


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users2, Swords, Search, GitCompareIcon } from 'lucide-react';

const UserForm = ({
  username,
  setUsername,
  comparisonUsername,
  setComparisonUsername,
  onSubmit,
  isLoading,
}) => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [comparisonSuggestions, setComparisonSuggestions] = useState([]);
  const [isUserLoadingSuggestions, setIsUserLoadingSuggestions] = useState(false);
  const [isComparisonLoadingSuggestions, setIsComparisonLoadingSuggestions] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [comparisonUserAvatar, setComparisonUserAvatar] = useState(null);

  const phrases = ['Comparing Profiles', 'Trolling', 'Roasting', 'Analyzing Stats'];
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setCurrentPhrase(phrases[index]);
    }, 2000); // Change phrase every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchGitHubSuggestions = async (query, isComparison = false) => {
    if (!query || query.length < 2) {
      isComparison ? setComparisonSuggestions([]) : setUserSuggestions([]);
      return;
    }

    try {
      isComparison
        ? setIsComparisonLoadingSuggestions(true)
        : setIsUserLoadingSuggestions(true);

        const response = await fetch(`${import.meta.env.VITE_GITHUB_API_SEARCH_USER_URL}?q=${query}&per_page=5`);

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      const suggestions = data.items.map((user) => ({
        username: user.login,
        avatar: user.avatar_url,
      }));

      isComparison ? setComparisonSuggestions(suggestions) : setUserSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching GitHub suggestions:', error);
      isComparison ? setComparisonSuggestions([]) : setUserSuggestions([]);
    } finally {
      isComparison
        ? setIsComparisonLoadingSuggestions(false)
        : setIsUserLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchGitHubSuggestions(username);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [username]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchGitHubSuggestions(comparisonUsername, true);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [comparisonUsername]);

  const selectSuggestion = (user, isComparison = false) => {
    if (isComparison) {
      setComparisonUsername(user.username);
      setComparisonUserAvatar(user.avatar);
      setComparisonSuggestions([]);
    } else {
      setUsername(user.username);
      setUserAvatar(user.avatar);
      setUserSuggestions([]);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto border-gray-200 relative">
      <form onSubmit={onSubmit} className="sm:p-6 md:p-6 space-y-4 sm:space-y-6">
        <div className="text-center space-y-4">
          <p className="sm:text-sm md:text-sm lg:text-lg text-gray-500">
            Enter GitHub usernames to analyze the stats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <div className="flex items-center space-x-2">
              <Users2 className="text-blue-500" size={20} />
              <label className="text-sm font-semibold text-gray-700">
                Your GitHub Username
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your GitHub"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {isUserLoadingSuggestions ? (
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                ) : (
                  <Search className="text-gray-400" size={20} />
                )}
              </div>
            </div>

            {userSuggestions.length > 0 && username && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {userSuggestions.map((user) => (
                  <a
                    key={user.username}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      selectSuggestion(user);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center space-x-3"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{user.username}</div>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}

            <AnimatePresence>
              {userAvatar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex justify-center"
                >
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-blue-200 shadow-md"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2 relative">
            <div className="flex items-center space-x-2">
              <Swords className="text-purple-500" size={20} />
              <label className="text-sm font-semibold text-gray-700">
                This Ninja Coder
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                value={comparisonUsername}
                onChange={(e) => setComparisonUsername(e.target.value)}
                placeholder="Enter rival's GitHub"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {isComparisonLoadingSuggestions ? (
                  <div className="animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent"></div>
                ) : (
                  <Search className="text-gray-400" size={20} />
                )}
              </div>
            </div>

            {comparisonSuggestions.length > 0 && comparisonUsername && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {comparisonSuggestions.map((user) => (
                  <a
                    key={user.username}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      selectSuggestion(user, true);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-50 flex items-center space-x-3"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{user.username}</div>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}

            <AnimatePresence>
              {comparisonUserAvatar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex justify-center"
                >
                  <img
                    src={comparisonUserAvatar}
                    alt="Comparison User Avatar"
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-purple-200 shadow-md"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:py-3  md:py-3 px-4 rounded-md text-white font-semibold flex items-center justify-center gap-2 transition-colors duration-300 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:ring-2 focus:ring-blue-500'} 
              text-sm sm:text-base md:text-lg lg:text-xl`}
          >
            <GitCompareIcon className="w-5 h-5" />
            {isLoading ? currentPhrase + '...' : 'Start GitHub Showdown'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

