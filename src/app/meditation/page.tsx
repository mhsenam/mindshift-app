"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SoundCard from "@/components/meditation/SoundCard";
import AudioPlayer from "@/components/meditation/AudioPlayer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  FiHeadphones,
  FiHeart,
  FiSun,
  FiDroplet,
  FiWind,
} from "react-icons/fi";

// Metadata has been moved to a separate file

// Define our sound categories and sounds with local audio files
const soundCategories = [
  {
    id: "nature",
    title: "Nature Sounds",
    icon: <FiDroplet className="w-5 h-5" />,
    sounds: [
      {
        id: "rain",
        title: "Gentle Rain",
        description: "Soothing rain sounds to help you relax and find peace.",
        duration: "∞",
        imageSrc: "https://picsum.photos/id/1015/800/450",
        audioSrc: "https://cdn.freesound.org/previews/346/346170_984096-lq.mp3",
      },
      {
        id: "forest",
        title: "Forest Ambience",
        description: "Immerse yourself in the calming sounds of a forest.",
        duration: "∞",
        imageSrc: "https://picsum.photos/id/1018/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/573/573578_5674468-lq.mp3",
      },
      {
        id: "ocean",
        title: "Ocean Waves",
        description: "Let the rhythmic waves wash away your stress.",
        duration: "∞",
        imageSrc: "https://picsum.photos/id/1019/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/467/467910_5674468-lq.mp3",
      },
      {
        id: "creek",
        title: "Flowing Creek",
        description:
          "Clear your mind with the gentle sound of a flowing creek.",
        duration: "∞",
        imageSrc: "https://picsum.photos/id/1037/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/396/396528_7542523-lq.mp3",
      },
    ],
  },
  {
    id: "ambient",
    title: "Ambient Music",
    icon: <FiHeadphones className="w-5 h-5" />,
    sounds: [
      {
        id: "meditation1",
        title: "Deep Meditation",
        description: "Ambient tones designed for deep meditation practice.",
        duration: "10:00",
        imageSrc: "https://picsum.photos/id/1025/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/436/436103_4929137-lq.mp3",
      },
      {
        id: "relaxation",
        title: "Relaxation",
        description: "Soft ambient music for complete relaxation.",
        duration: "15:00",
        imageSrc: "https://picsum.photos/id/1029/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/517/517741_10822456-lq.mp3",
      },
    ],
  },
  {
    id: "guided",
    title: "Guided Meditation",
    icon: <FiHeart className="w-5 h-5" />,
    sounds: [
      {
        id: "mindfulness",
        title: "Mindfulness Practice",
        description:
          "A guided mindfulness meditation to bring you to the present moment.",
        duration: "10:00",
        imageSrc: "https://picsum.photos/id/1032/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/437/437715_8972852-lq.mp3",
      },
      {
        id: "sleep",
        title: "Sleep Well",
        description: "A calming meditation designed to help you fall asleep.",
        duration: "20:00",
        imageSrc: "https://picsum.photos/id/1045/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/531/531953_4929137-lq.mp3",
      },
    ],
  },
  {
    id: "binaural",
    title: "Binaural Beats",
    icon: <FiWind className="w-5 h-5" />,
    sounds: [
      {
        id: "focus",
        title: "Focus Enhancement",
        description:
          "Binaural beats engineered to improve concentration and focus.",
        duration: "30:00",
        imageSrc: "https://picsum.photos/id/1010/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/170/170633_2116428-lq.mp3",
      },
      {
        id: "alpha",
        title: "Alpha Waves",
        description: "Alpha wave binaural beats for relaxation and creativity.",
        duration: "45:00",
        imageSrc: "https://picsum.photos/id/1052/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/424/424918_8754947-lq.mp3",
      },
    ],
  },
  {
    id: "timeofday",
    title: "Time of Day",
    icon: <FiSun className="w-5 h-5" />,
    sounds: [
      {
        id: "morning",
        title: "Morning Meditation",
        description: "Start your day with this energizing morning meditation.",
        duration: "10:00",
        imageSrc: "https://picsum.photos/id/1056/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/473/473613_9982363-lq.mp3",
      },
      {
        id: "evening",
        title: "Evening Wind Down",
        description: "Wind down your day and prepare for rest.",
        duration: "15:00",
        imageSrc: "https://picsum.photos/id/1068/800/450",
        audioSrc:
          "https://cdn.freesound.org/previews/475/475762_2771238-lq.mp3",
      },
    ],
  },
];

export default function MeditationPage() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("nature");
  const [selectedSound, setSelectedSound] = useState<null | {
    title: string;
    audioSrc: string;
    imageSrc: string;
  }>(null);

  // Simulate loading state when page loads or category changes
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleSoundClick = (
    title: string,
    audioSrc: string,
    imageSrc: string
  ) => {
    // If the same sound is already selected, toggle it off and on to restart
    if (
      selectedSound &&
      selectedSound.title === title &&
      selectedSound.audioSrc === audioSrc
    ) {
      setSelectedSound(null);
      // Use setTimeout to ensure React has time to unmount and remount the component
      setTimeout(() => {
        setSelectedSound({ title, audioSrc, imageSrc });
      }, 50);
    } else {
      // Different sound or no sound playing, just set it directly
      setSelectedSound({ title, audioSrc, imageSrc });
    }
  };

  const closePlayer = () => {
    setSelectedSound(null);
  };

  const changeCategory = (categoryId: string) => {
    if (categoryId !== activeCategory) {
      setActiveCategory(categoryId);
    }
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {language === "fa" ? "مدیتیشن" : "Meditation"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {language === "fa"
            ? "مجموعه‌ای از مدیتیشن‌های هدایت شده برای هر لحظه از روز شما را کشف کنید."
            : "Discover our collection of guided meditations for every moment of your day."}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-10">
        {soundCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => changeCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
              activeCategory === category.id
                ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.title}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        soundCategories
          .filter((category) => category.id === activeCategory)
          .map((category) => (
            <div key={category.id} className="mb-16 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.sounds.map((sound) => (
                  <SoundCard
                    key={sound.id}
                    title={sound.title}
                    description={sound.description}
                    duration={sound.duration}
                    imageSrc={sound.imageSrc}
                    onClick={() =>
                      handleSoundClick(
                        sound.title,
                        sound.audioSrc,
                        sound.imageSrc
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))
      )}

      {selectedSound && (
        <AudioPlayer
          title={selectedSound.title}
          audioSrc={selectedSound.audioSrc}
          imageSrc={selectedSound.imageSrc}
          onClose={closePlayer}
        />
      )}
    </div>
  );
}
