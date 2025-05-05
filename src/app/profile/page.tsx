"use client";

import { useState, useEffect } from "react";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import Link from "next/link";

// Mock user data - in a real app this would come from your authentication backend
const mockUserProgress = {
  meditationStreak: 7,
  totalSessions: 32,
  totalMinutes: 428,
  focusSessions: 18,
  achievements: [
    { name: "First Meditation", completed: true },
    { name: "5-Day Streak", completed: true },
    { name: "10 Focus Sessions", completed: true },
    { name: "30-Minute Session", completed: true },
    { name: "100 Total Minutes", completed: true },
    { name: "10-Day Streak", completed: false },
  ],
};

export default function ProfilePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(mockUserProgress);

  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would be a real auth check with your backend
      const hasSession = localStorage.getItem("userSession");
      setIsSignedIn(!!hasSession);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    // In a real app, this would redirect to OAuth flow
    // For demo purposes, we'll simulate a successful sign in
    localStorage.setItem("userSession", "demo-user-id");
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userSession");
    setIsSignedIn(false);
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>

      {!isSignedIn ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
          <div className="mb-6">
            <FiUser
              size={64}
              className="mx-auto text-gray-400 dark:text-gray-500"
            />
            <h2 className="text-xl font-semibold mt-4 mb-2">
              Sign in to track your progress
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join MindShift to track your meditation and focus progress across
              devices.
            </p>
          </div>

          <button
            onClick={() => handleSignIn("google")}
            className="flex items-center justify-center w-full mb-3 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* User progress dashboard */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <FiUser
                  size={48}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">Demo User</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Member since May 2023
                </p>
                <button
                  onClick={handleSignOut}
                  className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Your Progress
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                  <FiCalendar size={24} />
                </div>
                <p className="text-2xl font-bold">
                  {userData.meditationStreak}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Day Streak
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                  <FiClock size={24} />
                </div>
                <p className="text-2xl font-bold">{userData.totalMinutes}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Minutes
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                  <FiAward size={24} />
                </div>
                <p className="text-2xl font-bold">{userData.totalSessions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sessions
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                  <FiTrendingUp size={24} />
                </div>
                <p className="text-2xl font-bold">{userData.focusSessions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Focus Sessions
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Achievements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {userData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    achievement.completed
                      ? "border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-900/10"
                      : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        achievement.completed
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                      }`}
                    >
                      {achievement.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={
                        achievement.completed
                          ? "font-medium"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    >
                      {achievement.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
