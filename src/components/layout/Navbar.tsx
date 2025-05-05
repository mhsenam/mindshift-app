"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import LanguageToggle from "@/components/ui/LanguageToggle";
// lang

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const isRTL = language === "fa";

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("features"), href: "/features" },
    { name: t("meditation"), href: "/meditation" },
    { name: t("focusTools"), href: "/focus" },
    { name: t("about"), href: "/about" },
    { name: t("pricing"), href: "/pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const DirectionArrow = isRTL ? FiArrowLeft : FiArrowRight;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <div className="relative w-6 h-6">
              <Image
                src="/favicon-32x32.png"
                alt="MindShift Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain rounded-[30%]"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              {t("mindshift")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  pathname === link.href
                    ? "text-indigo-600"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Language Toggle & CTA */}
          <div className="hidden md:flex md:items-center md:space-x-4 rtl:space-x-reverse">
            <ThemeToggle />
            {/* <LanguageToggle /> */}
            <Link href="/sign-up" className="btn btn-primary">
              {t("getStarted")}
              <DirectionArrow className={isRTL ? "mr-2" : "ml-2"} />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse md:hidden">
            <ThemeToggle />
            {/* <LanguageToggle /> */}
            <button
              className="p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-4 py-5 space-y-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === link.href
                      ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center w-full py-3 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {t("getStarted")}
                  <DirectionArrow className={isRTL ? "mr-2" : "ml-2"} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
