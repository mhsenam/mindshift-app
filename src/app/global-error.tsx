"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            We apologize for the inconvenience. Please take a moment to breathe,
            and try again.
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
