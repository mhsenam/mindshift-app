import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/20 rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-200 dark:bg-indigo-800/30 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-300 dark:bg-indigo-700/40 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-48">
            <h1 className="text-6xl font-display font-bold friendly-title mb-2">
              Oops!
            </h1>
            <div className="w-16 h-1 bg-indigo-500 dark:bg-indigo-400 rounded-full mb-6"></div>
          </div>
        </div>

        <h2 className="text-2xl font-display font-medium text-gray-700 dark:text-gray-300 mb-6">
          Let&apos;s take a breath together. This page seems to be on its own
          mindfulness journey.
        </h2>

        <p className="max-w-md mx-auto text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Hey, no worries! We all get a little lost sometimes. Let&apos;s use
          this moment to center ourselves before we continue exploring.
        </p>

        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg max-w-md mx-auto">
          <h3 className="text-lg font-display font-medium mb-4 text-gray-800 dark:text-gray-200">
            Quick Breathing Exercise
          </h3>
          <ol className="text-left text-gray-600 dark:text-gray-400 space-y-3">
            <li className="flex items-start">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                1
              </span>
              <span>Take a deep breath in for 4 counts</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                2
              </span>
              <span>Hold your breath for 4 counts</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                3
              </span>
              <span>Exhale slowly for 6 counts</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                4
              </span>
              <span>Feel better? Let&apos;s continue exploring!</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/meditation"
            className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full transition-colors shadow-sm"
          >
            Try a Meditation
          </Link>
        </div>
      </div>
    </div>
  );
}
