"use client";

import { useState } from "react";
import {
  FiClock,
  FiBarChart2,
  FiDroplet,
  FiSun,
  FiMoon,
  FiCheckSquare,
  FiMusic,
  FiTarget,
} from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";

// Define focus tools with icons and descriptions
const focusTools = [
  {
    id: "pomodoro",
    title: "Pomodoro Timer",
    description:
      "Work in focused sprints with timed breaks to maximize productivity and avoid burnout.",
    icon: FiClock,
    color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    action: "Start Timer",
    path: "/focus/pomodoro",
  },
  {
    id: "white-noise",
    title: "White Noise",
    description:
      "Block out distractions with ambient background noise to create a focused work environment.",
    icon: FiMusic,
    color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    action: "Play Sounds",
    path: "/focus/white-noise",
  },
  {
    id: "breathing",
    title: "Breathing Exercises",
    description:
      "Calm your mind and improve concentration with guided breathing techniques.",
    icon: FiDroplet,
    color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    action: "Start Breathing",
    path: "/focus/breathing",
  },
  {
    id: "task-tracker",
    title: "Task Tracker",
    description:
      "Break down your work into manageable tasks and track your progress throughout the day.",
    icon: FiCheckSquare,
    color:
      "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    action: "Create Tasks",
    path: "/focus/tasks",
  },
  {
    id: "focus-stats",
    title: "Focus Statistics",
    description:
      "Monitor your focus patterns and productivity trends to optimize your workflow.",
    icon: FiBarChart2,
    color:
      "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    action: "View Stats",
    path: "/focus/stats",
  },
  {
    id: "goal-setting",
    title: "Goal Setting",
    description:
      "Set SMART goals for your focus sessions to stay motivated and on track.",
    icon: FiTarget,
    color:
      "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    action: "Set Goals",
    path: "/focus/goals",
  },
  {
    id: "light-mode",
    title: "Light Mode",
    description:
      "A simple focus timer with a bright, energizing interface for morning productivity.",
    icon: FiSun,
    color:
      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    action: "Start Session",
    path: "/focus/light",
  },
  {
    id: "dark-mode",
    title: "Dark Mode",
    description:
      "A gentle focus timer with a dark interface, perfect for evening work sessions.",
    icon: FiMoon,
    color:
      "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    action: "Start Session",
    path: "/focus/dark",
  },
];

export default function FocusPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Placeholder for future filtering functionality
  const filteredTools = focusTools;

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

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Focus Tools</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Enhance your productivity and concentration with our specialized focus
          tools. Each tool is designed to help you stay focused and accomplish
          more.
        </p>

        {/* Future category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeCategory === "all"
                ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Tools
          </button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTools.map((tool) => (
          <motion.div
            key={tool.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col"
            variants={itemVariants}
          >
            <div
              className={`inline-flex items-center justify-center p-3 ${tool.color} rounded-lg mb-4 w-12 h-12`}
            >
              <tool.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
              {tool.description}
            </p>
            <Link
              href={tool.path}
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition w-full"
            >
              {tool.action}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Coming soon message for tools that aren't implemented yet */}
      <div className="mt-16 max-w-2xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">
          More focus tools are being developed! Check back soon for updates.
        </p>
      </div>
    </div>
  );
}
