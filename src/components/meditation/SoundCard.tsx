"use client";

import { FiPlay, FiClock } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

interface SoundCardProps {
  title: string;
  description: string;
  duration: string;
  imageSrc: string;
  onClick: () => void;
}

export default function SoundCard({
  title,
  description,
  duration,
  imageSrc,
  onClick,
}: SoundCardProps) {
  // Track touch events to distinguish between scrolling and tapping
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchMoveRef = useRef(false);

  // Clean up any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
    isTouchMoveRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null || touchStartX === null) return;

    const yDiff = Math.abs(e.touches[0].clientY - touchStartY);
    const xDiff = Math.abs(e.touches[0].clientX - touchStartX);

    // If the user has moved more than 10px in any direction, consider it a scroll
    if (yDiff > 10 || xDiff > 10) {
      isTouchMoveRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
    setTouchStartX(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    // For mobile: if this was part of a scroll, don't trigger the click
    if (isTouchMoveRef.current) {
      e.preventDefault();
      return;
    }

    // Small delay to ensure it's a deliberate click and not part of scrolling
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      onClick();
    }, 10);
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900">
        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="bg-indigo-600 rounded-full p-3 opacity-0 transform scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <FiPlay className="text-white w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-1 truncate">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <FiClock className="mr-1" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
