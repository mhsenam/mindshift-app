"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiDroplet,
  FiHeadphones,
  FiClock,
  FiTarget,
  FiSun,
  FiMoon,
  FiUsers,
  FiGlobe,
  FiRefreshCw,
  FiHeart,
  FiActivity,
} from "react-icons/fi";

// Feature categories
const categories = [
  { id: "all", label: "All Features" },
  { id: "meditation", label: "Meditation" },
  { id: "focus", label: "Focus Tools" },
  { id: "ui", label: "User Experience" },
  { id: "personalization", label: "Personalization" },
];

// All features with images, icons, descriptions, categories and colors
const features = [
  {
    id: "meditation-sounds",
    title: "Meditation Sounds",
    description:
      "A diverse collection of ambient sounds including nature, binaural beats, and guided meditations.",
    imageSrc: "/images/features/meditation.jpg",
    imageAlt: "Person meditating with headphones",
    icon: FiHeadphones,
    category: "meditation",
    link: "/meditation",
    color:
      "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  },
  {
    id: "focus-timer",
    title: "Pomodoro Focus Timer",
    description:
      "Boost productivity with timed work sessions and breaks based on the proven Pomodoro technique.",
    imageSrc: "/images/features/pomodoro.jpg",
    imageAlt: "Pomodoro timer interface",
    icon: FiClock,
    category: "focus",
    link: "/focus/pomodoro",
    color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  },
  {
    id: "breathing",
    title: "Breathing Exercises",
    description:
      "Guided breathing patterns to help you calm down, focus, or energize depending on your needs.",
    imageSrc: "/images/features/breathing.jpg",
    imageAlt: "Breathing exercise visualization",
    icon: FiDroplet,
    category: "meditation",
    link: "/focus/breathing",
    color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "dark-mode",
    title: "Dark & Light Modes",
    description:
      "Choose between light and dark interfaces to suit your environment and reduce eye strain.",
    imageSrc: "/images/features/dark-mode.jpg",
    imageAlt: "App interface in dark mode",
    icon: FiMoon,
    category: "ui",
    link: "#",
    color:
      "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "multilingual",
    title: "Multilingual Support",
    description:
      "MindShift is available in multiple languages including English and Persian.",
    imageSrc: "/images/features/multilingual.jpg",
    imageAlt: "Text in multiple languages",
    icon: FiGlobe,
    category: "personalization",
    link: "#",
    color:
      "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "progress-tracking",
    title: "Progress Tracking",
    description:
      "Monitor your meditation and focus habits with detailed statistics and insights.",
    imageSrc: "/images/features/progress.jpg",
    imageAlt: "Progress chart showing meditation streak",
    icon: FiActivity,
    category: "personalization",
    link: "/profile",
    color: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  },
  {
    id: "goal-setting",
    title: "Goal Setting",
    description:
      "Set personalized goals for meditation and focus sessions to stay motivated.",
    imageSrc: "/images/features/goals.jpg",
    imageAlt: "Goal setting interface",
    icon: FiTarget,
    category: "focus",
    link: "/focus/goals",
    color:
      "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  },
  {
    id: "multi-device",
    title: "Responsive Design",
    description:
      "Seamlessly use MindShift across all your devices with our responsive interface.",
    imageSrc: "/images/features/responsive.jpg",
    imageAlt: "App shown on multiple devices",
    icon: FiRefreshCw,
    category: "ui",
    link: "#",
    color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  },
  {
    id: "community",
    title: "Mindfulness Community",
    description:
      "Connect with like-minded individuals on their mindfulness journey.",
    imageSrc: "/images/features/community.jpg",
    imageAlt: "Group of people meditating together",
    icon: FiUsers,
    category: "personalization",
    link: "/community",
    color:
      "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  },
  {
    id: "stress-management",
    title: "Stress Management",
    description:
      "Quick exercises to help you manage stress and anxiety in the moment.",
    imageSrc: "/images/features/stress.jpg",
    imageAlt: "Person practicing stress relief technique",
    icon: FiHeart,
    category: "meditation",
    link: "/meditation",
    color: "bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
  },
  {
    id: "daily-quote",
    title: "Daily Mindfulness Quotes",
    description:
      "Start your day with inspiration through our curated mindfulness quotes.",
    imageSrc: "/images/features/quotes.jpg",
    imageAlt: "Inspirational quote on nature background",
    icon: FiSun,
    category: "personalization",
    link: "/",
    color:
      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter features based on active category
  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((feature) => feature.category === activeCategory);

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Discover all the ways MindShift can help you stay calm, focused, and
          mindful in your daily life.
        </p>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === category.id
                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredFeatures.map((feature) => (
          <motion.div
            key={feature.id}
            className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full ${
              feature.color.split(" ")[0]
            } bg-opacity-20 dark:bg-opacity-10`}
            variants={itemVariants}
          >
            <div className="relative h-48 overflow-hidden">
              <div
                className={`absolute inset-0 ${
                  feature.color.split(" ")[0]
                } bg-opacity-30 dark:bg-opacity-20 z-10`}
              ></div>
              <div className="relative h-full w-full">
                {/* Replace with actual images when available */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <feature.icon
                    size={48}
                    className={feature.color.split(" ")[2]}
                  />
                </div>
                {feature.imageSrc && (
                  <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-start mb-3">
                <div
                  className={`p-2 rounded-lg ${feature.color} mr-3 w-10 h-10 flex items-center justify-center`}
                >
                  <feature.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>

              <p className="text-gray-700 dark:text-gray-200 flex-grow mb-4">
                {feature.description}
              </p>

              <Link
                href={feature.link}
                className={`font-medium hover:underline inline-flex items-center ${
                  feature.color.split(" ")[2]
                }`}
              >
                Explore Feature
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Get started section */}
      <div className="mt-20 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start your mindfulness journey?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Experience all these features and more by getting started with
          MindShift today.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-lg transition"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  );
}
