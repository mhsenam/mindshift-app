import type { Metadata, Viewport } from "next";
import { Outfit, Quicksand } from "next/font/google";
import "./globals.css";
import Layout from "../components/layout/Layout";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Main font for headings and UI elements - Rounded, friendly look
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Secondary font for body text - Soft, readable
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  title: "MindShift | Your Daily Dose of Calm",
  description:
    "MindShift is your friendly companion for daily meditation and focus. Take a moment for yourself and find your inner peace.",
  keywords: [
    "meditation",
    "mindfulness",
    "focus",
    "calm",
    "mental health",
    "wellness",
    "productivity",
  ],
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.ico",
        color: "#4F46E5",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // This script runs before React hydration
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (mode === 'dark' || (!mode && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // If localStorage is not available, do nothing
                }
              })();

              // Disable double-tap to zoom
              document.addEventListener('touchend', function(event) {
                if (event.changedTouches[0]) {
                  if (event.changedTouches[0].touchType !== 'stylus') {
                    event.preventDefault();
                    // Allow the click to happen
                    setTimeout(function() {
                      const target = document.elementFromPoint(
                        event.changedTouches[0].clientX, 
                        event.changedTouches[0].clientY
                      );
                      if (target) {
                        if (target.click) {
                          target.click();
                        } else {
                          const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                          });
                          target.dispatchEvent(clickEvent);
                        }
                      }
                    }, 0);
                  }
                }
              }, { passive: false });
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${quicksand.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <LanguageProvider>
          <Layout>{children}</Layout>
        </LanguageProvider>
      </body>
    </html>
  );
}
