"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  FiSun,
  FiCpu,
  FiClock,
  FiActivity,
  FiMusic,
  FiHeart,
} from "react-icons/fi";
import React from "react";

// Create a dedicated component for rendering icons
const IconComponent = ({
  icon: Icon,
}: {
  icon: React.ComponentType<{ size: number }>;
}) => {
  if (!Icon) return null;
  return <Icon size={24} />;
};

const features = [
  {
    icon: FiSun,
    title: "Daily Meditation",
    description:
      "Start your day with a guided meditation session designed to center your mind and prepare you for the challenges ahead.",
  },
  {
    icon: FiCpu,
    title: "Focus Enhancement",
    description:
      "Use our specialized focus tools to improve concentration and productivity during your work or study sessions.",
  },
  {
    icon: FiClock,
    title: "Mindful Timers",
    description:
      "Set customizable timers for your meditation, work, and break sessions to maintain a balanced and mindful schedule.",
  },
  {
    icon: FiActivity,
    title: "Progress Tracking",
    description:
      "Monitor your meditation streak, focus sessions, and overall mindfulness progress with detailed analytics.",
  },
  {
    icon: FiMusic,
    title: "Ambient Sounds",
    description:
      "Choose from a variety of soothing ambient sounds to create the perfect environment for focus or relaxation.",
  },
  {
    icon: FiHeart,
    title: "Stress Management",
    description:
      "Access specific exercises designed to reduce stress and anxiety in moments when you need them most.",
  },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800" id="features">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for a Mindful Life
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our comprehensive set of tools helps you cultivate mindfulness,
            enhance focus, and reduce stress in your daily life.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card p-6"
              variants={itemVariants}
            >
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg mb-4">
                <IconComponent icon={feature.icon} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
