"use client";

export default function PricingPage() {
  return (
    <div className="container py-16 md:py-24">
      {/* Inject custom animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .group:hover .group-hover\\:animate-shine {
          animation: shine 2s infinite;
        }
        .group:hover .group-hover\\:animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Pricing Plans</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Choose the plan that best fits your needs.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {/* Free Plan */}
        <div className="border rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-white dark:bg-gray-800 relative group overflow-hidden">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-800 opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl group-hover:animate-shimmer"></div>
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-700 mb-4">
            <span className="text-xl font-bold">🆓</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Get started with our basic features
          </p>
          <div className="text-3xl font-bold mb-6">$0</div>
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Personalized guided meditations</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>10-day introductory plan</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Select &quot;Singles&quot; meditations</span>
            </li>
          </ul>
          <button className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-all duration-300 hover:shadow-md relative z-10 hover:scale-105 group-hover:animate-pulse">
            Current Plan
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="border-2 border-blue-500 rounded-xl p-6 mt-4 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 flex flex-col h-full bg-white dark:bg-gray-800 relative group">
          <div className="absolute -top-4 right-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold z-10 shadow-md">
            Popular
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-1000 blur-xl group-hover:animate-shine overflow-hidden"></div>
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 mb-4">
            <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">
              💎
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Monthly</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Full access on a monthly plan
          </p>
          <div className="text-3xl font-bold mb-6">
            $11.99
            <span className="text-lg font-normal text-gray-500">/month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>All free features</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Unlimited access to full library</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Exclusive immersive meditations</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Research-backed sleep activities</span>
            </li>
          </ul>
          <button className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-300 relative z-10 hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] font-semibold">
            Subscribe Monthly
          </button>
        </div>

        {/* Annual Plan */}
        <div className="border-2 border-purple-500 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 flex flex-col h-full bg-white dark:bg-gray-800 relative group overflow-hidden">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 dark:from-purple-900/30 dark:via-indigo-900/20 dark:to-purple-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-1000 blur-xl group-hover:animate-shine"></div>
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 dark:bg-purple-900 mb-4">
            <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">
              ⭐
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Annual</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Save with our yearly plan
          </p>
          <div className="text-3xl font-bold mb-6">
            $69.99
            <span className="text-lg font-normal text-gray-500">/year</span>
          </div>
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full inline-block mb-4">
            Save $73.89 per year
          </div>
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>All monthly features</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Priority customer support</span>
            </li>
          </ul>
          <button className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-all duration-300 relative z-10 hover:scale-110 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] font-semibold">
            Subscribe Yearly
          </button>
        </div>
      </div>

      {/* Lifetime Plan */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="border-2 border-amber-500 rounded-xl p-8 shadow-xl hover:shadow-2xl bg-amber-50 dark:bg-gray-800 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 relative group overflow-hidden">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 dark:from-amber-900/40 dark:via-yellow-800/30 dark:to-amber-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-1000 blur-xl group-hover:animate-shine"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 dark:bg-amber-900">
                  <span className="text-amber-600 dark:text-amber-300 text-xl font-bold">
                    🔆
                  </span>
                </div>
                <h3 className="text-2xl font-bold">Lifetime Access</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                One-time payment for unlimited access forever
              </p>
              <ul className="space-y-2 mb-6 md:mb-0">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>All premium features, forever</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>No recurring payments</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>VIP customer support</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">$399.99</div>
              <button className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-all duration-500 text-lg relative z-10 hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] font-semibold">
                Get Lifetime Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Free vs Premium Feature Comparison */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Free vs. Premium Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Free Features */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 mr-4">
                <span className="text-xl font-bold">🆓</span>
              </div>
              <h3 className="text-2xl font-bold">Free Version</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Personalized guided meditations tailored to your mood, goals,
                  and experience
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  A 10-day introductory plan to develop and deepen meditation
                  skills
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Access to select &quot;Singles&quot; meditations, including a
                  Sleep Single to aid relaxation
                </span>
              </li>
            </ul>
          </div>

          {/* Premium Features */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border-2 border-blue-500">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">
                  💎
                </span>
              </div>
              <h3 className="text-2xl font-bold">Premium Membership</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Unlimited access to the full library of 10-day personalized
                  Plans and all on-the-go Singles
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Exclusive Immersive Meditations that blend vibration, sound
                  effects, and guidance
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Research-backed activities designed to promote restful sleep
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Animated breathing exercises and other advanced features
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Note about pricing */}
      <div className="max-w-2xl mx-auto mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          Note: Prices are listed in USD; actual pricing may vary based on your
          location and currency exchange rates.
        </p>
      </div>
    </div>
  );
}
