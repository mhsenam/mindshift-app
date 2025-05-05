"use client";

import { FiPlay, FiClock } from "react-icons/fi";

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
  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
      onClick={onClick}
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
