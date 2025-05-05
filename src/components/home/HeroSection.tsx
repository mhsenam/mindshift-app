"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16 md:pt-20 pb-24 md:pb-32">
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            Hey there! Ready to find your
            <span className="friendly-title"> zen?</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
            variants={itemVariants}
          >
            Take a deep breath with MindShift, your friendly companion for daily
            calm. We&apos;re here to help you pause, refocus, and feel amazing
            every day.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Link href="/sign-up" className="btn btn-primary w-full sm:w-auto">
              Start Your Journey
              <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/features" className="btn btn-outline w-full sm:w-auto">
              See What&apos;s Inside
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center">
              {/* This would be your app screenshot or mockup */}
              <p className="text-gray-500 dark:text-gray-400">App Screenshot</p>
            </div>
          </div>

          {/* Floating UI elements for decoration */}
          <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm font-medium">Focus Mode</p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <p className="text-sm font-medium">10M+ Happy Users</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 md:mt-24 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
            LOVED BY WONDERFUL PEOPLE AT
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {["Google", "Microsoft", "Airbnb", "Spotify", "Amazon"].map(
              (company) => (
                <div
                  key={company}
                  className="text-lg font-display font-medium text-gray-400 dark:text-gray-500"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
