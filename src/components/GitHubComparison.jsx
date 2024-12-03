

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users2, GitCompareIcon } from 'lucide-react';
import { fetchGithubUser } from '../services/github';
import { generateTroll } from '../services/llm';
import useAppStore from '../store/useAppStore';
import UserForm from './UserForm';
import ComparisonResult from './ComparisonResult';

export const GitHubComparison = () => {
  const [username, setUsername] = useState('');
  const [comparisonUsername, setComparisonUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [comparisonUserAvatar, setComparisonUserAvatar] = useState('');

  const {
    user,
    comparisonUser,
    isLoading,
    error,
    setUser,
    setComparisonUser,
    setIsLoading,
    setError,
    setComparisonResult,
  } = useAppStore();

  const [troll, setTroll] = useState('');
  const [isLoadingTroll, setIsLoadingTroll] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Fetch user avatars
  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const fetchedUser = await fetchGithubUser(username);
          console.log('fetche github user',fetchedUser);
          setUserAvatar(fetchedUser.avatar_url);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserAvatar('');
      }
    };
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchComparisonUserData = async () => {
      if (comparisonUsername) {
        try {
          const fetchedComparisonUser = await fetchGithubUser(comparisonUsername);
        
          setComparisonUserAvatar(fetchedComparisonUser.avatar_url);
        } catch (error) {
          console.error("Error fetching comparison user data:", error);
        }
      } else {
        setComparisonUserAvatar('');
      }
    };
    fetchComparisonUserData();
  }, [comparisonUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTroll('');
    setShowResult(false);

    try {
      const fetchedUser = await fetchGithubUser(username);
      console.log('fetched user ',fetchedUser);
      const fetchedComparisonUser = await fetchGithubUser(comparisonUsername);
      console.log('fetchedcomparision user ',fetchedComparisonUser);
      setUser(fetchedUser);
      setComparisonUser(fetchedComparisonUser);

      setIsLoadingTroll(true);
      const trollMessage = await generateTroll(fetchedUser, fetchedComparisonUser);
      setTroll(trollMessage);

      setComparisonResult({ user: fetchedUser, comparisonUser: fetchedComparisonUser });
      setShowResult(true);

    } catch (error) {
      setError('Failed to fetch user data. Please check the usernames and try again.');
    } finally {
      setIsLoading(false);
      setIsLoadingTroll(false);
    }
  };

  return (
    <div className="flex flex-col space-y-10 ">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg  mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GitCompareIcon size={24} />
            <h2 className=" md:text-lg font-semibold font-mono">GitHub Profiles</h2>
          </div>
        </div>

        {/* User Input Form */}
        <div className="p-4">
          <UserForm 
            username={username} 
            setUsername={setUsername} 
            comparisonUsername={comparisonUsername} 
            setComparisonUsername={setComparisonUsername} 
            onSubmit={handleSubmit} 
            isLoading={isLoading}
            userAvatar={userAvatar}
            comparisonUserAvatar={comparisonUserAvatar}
          />
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </motion.div>

      {/* Comparison Results in Separate Card */}
      <AnimatePresence>
        {showResult && user && comparisonUser && (
          <ComparisonResult 
            user={user}
            comparisonUser={comparisonUser}
            userAvatar={userAvatar}
            comparisonUserAvatar={comparisonUserAvatar}
            troll={troll}
            isLoadingTroll={isLoadingTroll}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GitHubComparison;