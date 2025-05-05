"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fa" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
      aria-label="Toggle language"
    >
      {t("languageToggle")}
    </button>
  );
}
