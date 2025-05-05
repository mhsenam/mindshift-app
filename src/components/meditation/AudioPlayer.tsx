"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiRepeat,
  FiChevronDown,
  FiHeadphones,
  FiArrowUp,
} from "react-icons/fi";

interface AudioPlayerProps {
  title: string;
  audioSrc: string;
  imageSrc?: string;
  onClose: () => void;
}

export default function AudioPlayer({
  title,
  audioSrc,
  imageSrc,
  onClose,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const volumeBarRef = useRef<HTMLInputElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const fullPlayerRef = useRef<HTMLDivElement>(null);

  // Detect if desktop on mount
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Check initially
    checkIfDesktop();

    // Set up listener for window resize
    window.addEventListener("resize", checkIfDesktop);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfDesktop);
    };
  }, []);

  // Handle mobile back button for native-like experience
  useEffect(() => {
    // Only apply this behavior on mobile
    if (isDesktop) return;

    // Add a history entry when player is expanded so we can intercept back button
    if (isExpanded) {
      // Add a unique state to identify this history entry
      window.history.pushState({ audioPlayerExpanded: true }, "");
    }

    // Handle the back button press
    const handlePopState = (event: PopStateEvent) => {
      // If the player is expanded, prevent default back behavior and collapse the player
      if (isExpanded) {
        // Prevent the default back navigation
        event.preventDefault();
        // Collapse the player
        setIsExpanded(false);
        // Re-add the history entry we just popped
        window.history.pushState({ audioPlayerExpanded: true }, "");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isExpanded, isDesktop]);

  // Disable body scrolling when player is expanded
  useEffect(() => {
    if (typeof window !== "undefined" && document) {
      if (isExpanded) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.touchAction = "none";
      } else {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.touchAction = "";
      }
    }

    return () => {
      if (typeof window !== "undefined" && document) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.touchAction = "";
      }
    };
  }, [isExpanded]);

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!audioRef.current) return;

      switch (e.key) {
        case " ": // Space key
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft": // Left arrow - rewind 5 seconds
          audioRef.current.currentTime = Math.max(
            0,
            audioRef.current.currentTime - 5
          );
          break;
        case "ArrowRight": // Right arrow - forward 5 seconds
          audioRef.current.currentTime = Math.min(
            duration,
            audioRef.current.currentTime + 5
          );
          break;
        case "ArrowUp": // Up arrow - increase volume
          if (volumeBarRef.current) {
            const newVolume = Math.min(1, volume + 0.1);
            volumeBarRef.current.value = newVolume.toString();
            updateVolume(newVolume);
          }
          break;
        case "ArrowDown": // Down arrow - decrease volume
          if (volumeBarRef.current) {
            const newVolume = Math.max(0, volume - 0.1);
            volumeBarRef.current.value = newVolume.toString();
            updateVolume(newVolume);
          }
          break;
        case "m": // 'm' key - mute/unmute
          toggleMute();
          break;
        case "l": // 'l' key - toggle loop
          toggleLoop();
          break;
        case "Escape": // Escape key - close player or collapse
          if (isExpanded) {
            setIsExpanded(false);
          } else {
            handleClose();
          }
          break;
      }
    };

    // Add event listener for keyboard shortcuts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, isExpanded, duration]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const setAudioData = () => {
      setDuration(audioElement.duration);
      setCurrentTime(audioElement.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audioElement.currentTime);

    // Events
    audioElement.addEventListener("loadeddata", setAudioData);
    audioElement.addEventListener("timeupdate", setAudioTime);

    // Reset audio element state when audioSrc changes
    audioElement.currentTime = 0;
    setCurrentTime(0);

    // Auto-play on desktop
    if (isDesktop) {
      audioElement.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
      setIsPlaying(true);
    }

    // Clean up
    return () => {
      audioElement.pause();
      audioElement.removeEventListener("loadeddata", setAudioData);
      audioElement.removeEventListener("timeupdate", setAudioTime);
    };
  }, [audioSrc, isDesktop]);

  // Handle player expand/collapse
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle play/pause
  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Handle loop toggle
  const toggleLoop = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const newTime = parseFloat(e.target.value);
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = () => {
    const audioElement = audioRef.current;
    const volumeBar = volumeBarRef.current;

    if (!audioElement || !volumeBar) return;

    const newVolume = parseFloat(volumeBar.value);
    updateVolume(newVolume);
  };

  // Update volume state and audio element
  const updateVolume = (newVolume: number) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.volume = newVolume;
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isMuted) {
      audioElement.volume = volume;
      setIsMuted(false);
    } else {
      audioElement.volume = 0;
      setIsMuted(true);
    }
  };

  // Custom close handler to ensure we restore scrolling
  const handleClose = () => {
    // Reset player state
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsExpanded(false);

    // Restore body scrolling
    if (typeof window !== "undefined" && document) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    }

    // Call the original onClose callback
    onClose();
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Calculate progress width percentage
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Blur background for the 20% behind the player */}
      <div
        className={`fixed inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl z-40 ${
          isExpanded ? "block" : "hidden"
        }`}
      />

      {/* Semi-fullscreen player (80% of screen height) */}
      <div
        ref={fullPlayerRef}
        onClick={(e) =>
          e.target === fullPlayerRef.current && setIsExpanded(false)
        }
        className={`fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-900 transition-transform duration-300 ease-out rounded-t-3xl shadow-lg ${
          isExpanded ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          height: "80vh",
          bottom: isDesktop ? "0" : "70px", // Account for footer height on mobile
        }}
      >
        {/* Main content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-700 dark:text-white/90 p-2"
              aria-label="Close player"
            >
              <FiChevronDown size={24} />
            </button>
            <h2 className="text-gray-800 dark:text-white/90 text-base font-medium">
              {title}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-700 dark:text-white/90 p-2"
              aria-label="Close and exit player"
            >
              ✕
            </button>
          </div>

          {/* Album art */}
          <div className="flex-1 flex justify-center items-center py-6">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-xl overflow-hidden shadow-2xl">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <FiHeadphones className="w-32 h-32 text-indigo-600 dark:text-white/60" />
                </div>
              )}
            </div>
          </div>

          {/* Playback controls - shifted up to account for footer */}
          <div className="px-8 pb-24 md:pb-12">
            {/* Title */}
            <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-1">
              {title}
            </h3>

            {/* Progress bar */}
            <div className="mb-6 mt-4">
              <input
                ref={progressBarRef}
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                step="0.01"
                onChange={handleProgressChange}
                className="w-full md:w-3/4 mx-auto block h-1 bg-gray-200 dark:bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-white"
                aria-label="Seek"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-white/80 mt-2 md:w-3/4 md:mx-auto">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6 md:w-3/4 md:mx-auto">
              <button
                onClick={toggleLoop}
                className={`p-3 rounded-full ${
                  isLooping
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-white/70"
                }`}
                aria-label={isLooping ? "Disable loop" : "Enable loop"}
                title="Loop (L)"
              >
                <FiRepeat size={24} />
              </button>

              <button
                onClick={togglePlay}
                className="p-4 bg-indigo-600 dark:bg-white rounded-full text-white dark:text-indigo-900 shadow-lg"
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-full text-gray-600 dark:text-white/70"
                aria-label={isMuted ? "Unmute" : "Mute"}
                title={isMuted ? "Unmute (M)" : "Mute (M)"}
              >
                {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
              </button>
            </div>

            {/* Volume slider */}
            <div className="flex items-center space-x-4 md:w-1/2 md:mx-auto">
              <FiVolume2
                size={16}
                className="text-gray-600 dark:text-white/70"
              />
              <input
                ref={volumeBarRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                className="w-full h-1 bg-gray-200 dark:bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-white"
                onChange={handleVolumeChange}
                aria-label="Volume"
                title="Volume (Up/Down arrows)"
              />
            </div>

            {/* Keyboard shortcuts help - desktop only */}
            <div className="hidden md:block mt-6 text-xs text-gray-500 dark:text-gray-400 md:w-3/4 md:mx-auto">
              <p className="mb-1">Keyboard shortcuts:</p>
              <div className="grid grid-cols-2 gap-1">
                <span>Space: Play/Pause</span>
                <span>M: Mute/Unmute</span>
                <span>←/→: Rewind/Forward 5s</span>
                <span>↑/↓: Volume Up/Down</span>
                <span>L: Toggle Loop</span>
                <span>Esc: Close</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini player */}
      <div
        ref={playerRef}
        onClick={toggleExpanded}
        className={`fixed bottom-16 md:bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg z-40 shadow-lg transition-all duration-300 border-t border-gray-200 dark:border-gray-700 ${
          isExpanded ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center flex-1 min-w-0">
            <div className="relative w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="40px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <FiHeadphones className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
            </div>
            <div className="truncate">
              <h4 className="text-sm font-medium truncate">{title}</h4>
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full w-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* Desktop expand button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
              className="hidden md:block p-2 ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Expand player"
              title="Expand player"
            >
              <FiArrowUp size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-2 ml-2 bg-indigo-600 rounded-full text-white"
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            >
              {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="p-2 ml-2 text-gray-500"
              aria-label="Close player"
              title="Close player (Esc)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </>
  );
}
