"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiExternalLink,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiUser,
} from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
          About The Developer
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900 flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                {/* Fallback to icon if image fails to load */}
                <FiUser size={60} className="text-indigo-400" />

                {/* This image will be shown if it loads successfully */}
                <Image
                  src="https://github.com/mhsenam.png"
                  alt="Mohsen Amini"
                  width={160}
                  height={160}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                  onError={(e) => {
                    // Hide the image if it fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Bio Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Mohsen Amini</h2>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Frontend Developer - React.JS, Next.JS
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A passionate, creative, responsible & fast Front-end developer
                  with 3 years of dedicated experience, bringing expertise in
                  building elegant and efficient solutions.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                    ReactJS
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                    NextJS
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                    Tailwind CSS
                  </span>
                </div>

                <div className="flex gap-4">
                  <Link
                    href="https://github.com/mhsenam"
                    target="_blank"
                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FiExternalLink /> GitHub
                  </Link>
                  <Link
                    href="https://twitter.com/mhsenam"
                    target="_blank"
                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FiTwitter /> Twitter
                  </Link>
                  <Link
                    href="https://linkedin.com/in/mhsenam"
                    target="_blank"
                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FiLinkedin /> LinkedIn
                  </Link>
                  <Link
                    href="https://youtube.com/@mhsenam"
                    target="_blank"
                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FiYoutube /> YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              Skills & Expertise
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Frontend Development (React.js, Next.js)</li>
              <li>• Modern JavaScript & TypeScript</li>
              <li>• Responsive Web Design</li>
              <li>• UI/UX Implementation</li>
              <li>• Tailwind CSS & Material UI</li>
              <li>• State Management (Redux)</li>
              <li>• Version Control (Git)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              About Me
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Beyond coding, I have a deep-rooted love for challenges,
              mathematics, and literature. Whether it&apos;s unraveling complex
              problems or diving into the world of words, I thrive on the thrill
              of discovery and exploration.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              My approach to development is centered on creating intuitive,
              efficient, and visually appealing interfaces that enhance user
              experience while meeting business objectives.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Want to work together?</h3>
          <Link href="/contact" className="btn btn-primary px-8">
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
