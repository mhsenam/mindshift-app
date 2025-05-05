"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    content:
      "MindShift has completely transformed my daily routine. I used to wake up anxious about work, but now I start each day with a meditation session and it's made all the difference.",
    name: "Sarah Johnson",
    title: "Marketing Director",
    rating: 5,
  },
  {
    id: 2,
    content:
      "As a software engineer, staying focused for long periods is crucial. The focus timer and ambient sounds have boosted my productivity by at least 30%.",
    name: "Michael Chen",
    title: "Senior Software Engineer",
    rating: 5,
  },
  {
    id: 3,
    content:
      "I've tried many meditation apps, but MindShift stands out with its beautiful interface and effective techniques. It's helped me manage my anxiety better than therapy alone.",
    name: "Jessica Patel",
    title: "School Teacher",
    rating: 5,
  },
  {
    id: 4,
    content:
      "The stress management exercises have been a game-changer during my high-pressure job. I now have tools to calm myself during difficult situations.",
    name: "David Wilson",
    title: "ER Nurse",
    rating: 4,
  },
  {
    id: 5,
    content:
      "I love how MindShift tracks my progress. Seeing my meditation streak motivates me to continue even on busy days, and I've become more mindful in my everyday life.",
    name: "Emma Rodriguez",
    title: "Freelance Designer",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsPerView = 3;
  const maxIndex = testimonials.length - testimonialsPerView;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

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
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join thousands of people who have transformed their lives with
            MindShift's mindfulness and focus tools.
          </p>
        </div>

        <div className="relative">
          <motion.div
            ref={ref}
            className="overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  activeIndex * (100 / testimonialsPerView)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] p-4"
                  variants={itemVariants}
                >
                  <div className="card p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none ${
                activeIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
              className={`p-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none ${
                activeIndex === maxIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
