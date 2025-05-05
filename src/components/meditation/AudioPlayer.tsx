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
  FiMaximize,
  FiHeadphones,
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
  const [expandHeight, setExpandHeight] = useState(0); // 0 to 70vh
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragIntent, setDragIntent] = useState<"up" | "down" | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const volumeBarRef = useRef<HTMLInputElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Calculate viewport height for drag calculations
  const vh = typeof window !== "undefined" ? window.innerHeight * 0.01 : 0;

  // Disable body scrolling when player is open or expanded
  useEffect(() => {
    if (typeof window !== "undefined" && document) {
      // For mobile, disable scroll when player is expanded
      if (expandHeight > 0 || isExpanded) {
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

    // Clean up when component unmounts
    return () => {
      if (typeof window !== "undefined" && document) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.touchAction = "";
      }
    };
  }, [expandHeight, isExpanded]);

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

    // Clean up
    return () => {
      audioElement.pause();
      audioElement.removeEventListener("loadeddata", setAudioData);
      audioElement.removeEventListener("timeupdate", setAudioTime);
    };
  }, [audioSrc]);

  // Handle smooth transitions
  const animateToHeight = (targetHeight: number) => {
    // Cancel any existing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const startHeight = expandHeight;
    const startTime = Date.now();
    const duration = 300; // ms

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      // Calculate new height with easing
      const newHeight =
        startHeight + (targetHeight - startHeight) * easeOutCubic;
      setExpandHeight(newHeight);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle drag gesture for expanding player
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track initial touch position for detecting direction
    let initialY = 0;
    let touchMoveCount = 0;

    // Handlers for drag gestures
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!playerRef.current?.contains(target)) return;

      // Only allow dragging from handle or header areas
      if (target.closest(".drag-handle") || target.closest(".player-header")) {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
        initialY = e.touches[0].clientY;
        touchMoveCount = 0;

        // Stop any ongoing animations
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };

    const handleMouseStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!playerRef.current?.contains(target)) return;

      // Only allow dragging from handle or header areas
      if (target.closest(".drag-handle") || target.closest(".player-header")) {
        setIsDragging(true);
        setStartY(e.clientY);
        initialY = e.clientY;
        touchMoveCount = 0;
        e.preventDefault();

        // Stop any ongoing animations
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      touchMoveCount++;

      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;

      // Determine drag direction after a few move events
      if (touchMoveCount === 3) {
        if (initialY > currentY) {
          setDragIntent("up");
        } else if (initialY < currentY) {
          setDragIntent("down");
        }
      }

      // Add resistance when dragging near the limits
      let dragMultiplier = 1;
      if ((expandHeight > 65 && diff > 0) || (expandHeight < 5 && diff < 0)) {
        dragMultiplier = 0.3; // Add resistance at the edges
      }

      // Calculate new height with resistance
      const newHeight = Math.max(
        0,
        Math.min(70, expandHeight + (diff * dragMultiplier) / vh)
      );
      setExpandHeight(newHeight);
      setStartY(currentY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      touchMoveCount++;

      const currentY = e.clientY;
      const diff = startY - currentY;

      // Determine drag direction after a few move events
      if (touchMoveCount === 3) {
        if (initialY > currentY) {
          setDragIntent("up");
        } else if (initialY < currentY) {
          setDragIntent("down");
        }
      }

      // Add resistance when dragging near the limits
      let dragMultiplier = 1;
      if ((expandHeight > 65 && diff > 0) || (expandHeight < 5 && diff < 0)) {
        dragMultiplier = 0.3; // Add resistance at the edges
      }

      // Calculate new height with resistance
      const newHeight = Math.max(
        0,
        Math.min(70, expandHeight + (diff * dragMultiplier) / vh)
      );
      setExpandHeight(newHeight);
      setStartY(currentY);
    };

    const handleDragEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);

      // Use drag intent and current position to determine where to snap
      if (dragIntent === "up" && expandHeight > 15) {
        // If dragging up and past threshold, expand fully
        animateToHeight(70);
        setIsExpanded(true);
      } else if (dragIntent === "down" && expandHeight < 55) {
        // If dragging down and below threshold, collapse
        animateToHeight(0);
        setIsExpanded(false);
      } else if (expandHeight > 35) {
        // Otherwise use 50% threshold
        animateToHeight(70);
        setIsExpanded(true);
      } else {
        animateToHeight(0);
        setIsExpanded(false);
      }

      // Reset drag intent
      setDragIntent(null);
    };

    // Add event listeners
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("mousedown", handleMouseStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleDragEnd);
    window.addEventListener("mouseup", handleDragEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousedown", handleMouseStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleDragEnd);
      window.removeEventListener("mouseup", handleDragEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, startY, expandHeight, isExpanded, vh, dragIntent]);

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

  // Handle progress bar change
  const handleProgressChange = () => {
    const audioElement = audioRef.current;
    const progressBar = progressBarRef.current;

    if (!audioElement || !progressBar) return;

    const newTime = parseFloat(progressBar.value);
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = () => {
    const audioElement = audioRef.current;
    const volumeBar = volumeBarRef.current;

    if (!audioElement || !volumeBar) return;

    const newVolume = parseFloat(volumeBar.value);
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

  // Handle loop toggle
  const toggleLoop = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  // Toggle expanded view (for button click)
  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    animateToHeight(newState ? 70 : 0);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Custom close handler to ensure we restore scrolling
  const handleClose = () => {
    // Restore body scrolling
    if (typeof window !== "undefined" && document) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    }

    // Call the original onClose
    onClose();
  };

  return (
    <>
      {/* Blur overlay when expanded on mobile */}
      {expandHeight > 0 && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 md:hidden"
          style={{
            opacity: Math.min(expandHeight / 40, 0.8),
            transition: !isDragging ? "opacity 300ms ease" : "none",
          }}
          onClick={() => {
            setIsExpanded(false);
            animateToHeight(0);
          }}
        />
      )}

      <div
        ref={playerRef}
        className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700 rounded-t-3xl will-change-transform`}
        style={{
          height: expandHeight > 0 ? `${expandHeight}vh` : "auto",
          transition: !isDragging
            ? "height 300ms cubic-bezier(0.33, 1, 0.68, 1)"
            : "none",
          touchAction: "none",
        }}
      >
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Mobile drag handle */}
          <div className="md:hidden flex flex-col items-center player-header">
            <div
              className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full my-3 cursor-grab active:cursor-grabbing drag-handle"
              aria-label="Drag to expand or collapse player"
            />
            <button
              onClick={toggleExpanded}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={isExpanded ? "Collapse player" : "Expand player"}
            >
              {isExpanded ? (
                <FiChevronDown size={20} />
              ) : (
                <FiMaximize size={20} />
              )}
            </button>
          </div>

          <div
            className={`p-4 ${
              expandHeight > 20 ? "flex-1 flex flex-col overflow-auto" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium truncate">{title}</h3>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>

            {/* Sound image when expanded - replace headphone icon with actual image */}
            {expandHeight > 20 && (
              <div className="flex-1 flex items-center justify-center mb-8">
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5)]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 224px, 288px"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <FiHeadphones className="w-24 h-24 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Player controls - always visible */}
            <div className="flex items-center space-x-4 mb-3">
              <button
                onClick={togglePlay}
                className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
              </button>

              <div className="text-sm text-gray-500 dark:text-gray-400 w-16 text-center">
                {formatTime(currentTime)}
              </div>

              <div className="flex-1">
                <input
                  ref={progressBarRef}
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  step="0.01"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                  onChange={handleProgressChange}
                  aria-label="Seek"
                />
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 w-16 text-center">
                {formatTime(duration)}
              </div>
            </div>

            {/* Additional controls - always visible, improved for mobile */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center">
                <button
                  onClick={toggleLoop}
                  className={`p-2 rounded-full ${
                    isLooping
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  aria-label={isLooping ? "Disable loop" : "Enable loop"}
                >
                  <FiRepeat size={20} />
                </button>
              </div>

              <div className="flex items-center flex-1 max-w-[180px]">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                </button>

                <div className="flex-1">
                  <input
                    ref={volumeBarRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                  />
                </div>
              </div>
            </div>
          </div>

          <audio ref={audioRef} src={audioSrc} preload="metadata" />
        </div>
      </div>
    </>
  );
}
