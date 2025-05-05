"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fa";

interface TranslationKeys {
  // Navigation
  home: string;
  features: string;
  meditation: string;
  focusTools: string;
  pricing: string;
  about: string;
  getStarted: string;
  languageToggle: string;
  mindshift: string;

  // Home page
  yourDailyDoseOfCalm: string;
  welcomeHeading: string;
  welcomeSubheading: string;
  exploreFeatures: string;
  startMeditating: string;
  happyUsers: string;
  lovedByWonderfulPeopleAt: string;

  // Features page
  featuresHeading: string;
  featuresSubheading: string;
  mindfulnessFeature: string;
  mindfulnessDescription: string;
  sleepFeature: string;
  sleepDescription: string;
  focusFeature: string;
  focusDescription: string;
  stressFeature: string;
  stressDescription: string;

  // Meditation page
  meditationHeading: string;
  meditationSubheading: string;
  beginnerMeditation: string;
  intermediateMeditation: string;
  advancedMeditation: string;
  meditationDescription: string;
  startSession: string;

  // Focus page
  focusHeading: string;
  focusSubheading: string;
  pomodoroTimer: string;
  whiteNoise: string;
  breathingExercises: string;

  // Pricing page
  pricingHeading: string;
  pricingSubheading: string;
  freePlan: string;
  proPlan: string;
  freePlanPrice: string;
  proPlanPrice: string;
  monthly: string;
  yearly: string;
  currentPlan: string;
  upgrade: string;

  // Common
  learnMore: string;
  contactUs: string;
  ourStory: string;
  privacyPolicy: string;
  termsOfService: string;
  copyright: string;
}

type TranslationsType = {
  en: TranslationKeys;
  fa: TranslationKeys;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: TranslationsType;
  t: (key: keyof TranslationKeys) => string;
};

// Translations object with English and Persian translations
const translations: TranslationsType = {
  en: {
    // Navigation
    home: "Home",
    features: "Features",
    meditation: "Meditation",
    focusTools: "Focus Tools",
    pricing: "Pricing",
    about: "About",
    getStarted: "Get Started",
    languageToggle: "فارسی",
    mindshift: "MindShift",

    // Home page
    yourDailyDoseOfCalm: "Your Daily Dose of Calm",
    welcomeHeading: "Find your inner peace with MindShift",
    welcomeSubheading:
      "Discover guided meditations, mindfulness exercises, and focus tools to improve your mental wellbeing",
    exploreFeatures: "Explore Features",
    startMeditating: "Start Meditating",
    happyUsers: "Happy Users",
    lovedByWonderfulPeopleAt: "LOVED BY WONDERFUL PEOPLE AT",

    // Features page
    featuresHeading: "Features designed for your mental wellbeing",
    featuresSubheading:
      "Everything you need to stay focused, calm, and mindful throughout your day",
    mindfulnessFeature: "Mindfulness",
    mindfulnessDescription:
      "Guided practices to help you stay present and aware in the moment",
    sleepFeature: "Better Sleep",
    sleepDescription:
      "Calming sounds and meditations to help you fall asleep faster and sleep better",
    focusFeature: "Deep Focus",
    focusDescription:
      "Tools and techniques to improve concentration and productivity",
    stressFeature: "Stress Relief",
    stressDescription:
      "Quick exercises to help you manage stress and anxiety in the moment",

    // Meditation page
    meditationHeading: "Guided Meditations",
    meditationSubheading: "Find the perfect meditation for your needs",
    beginnerMeditation: "Beginner",
    intermediateMeditation: "Intermediate",
    advancedMeditation: "Advanced",
    meditationDescription:
      "Our guided meditations help you develop awareness and compassion in your daily life",
    startSession: "Start Session",

    // Focus page
    focusHeading: "Focus Tools",
    focusSubheading: "Tools designed to help you stay productive and focused",
    pomodoroTimer: "Pomodoro Timer",
    whiteNoise: "White Noise",
    breathingExercises: "Breathing Exercises",

    // Pricing page
    pricingHeading: "Simple, transparent pricing",
    pricingSubheading: "Choose the plan that's right for you",
    freePlan: "Free",
    proPlan: "Pro",
    freePlanPrice: "$0",
    proPlanPrice: "$9.99",
    monthly: "Monthly",
    yearly: "Yearly",
    currentPlan: "Current Plan",
    upgrade: "Upgrade",

    // Common
    learnMore: "Learn More",
    contactUs: "Contact Us",
    ourStory: "Our Story",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: "© 2024 MindShift. All rights reserved.",
  },
  fa: {
    // Navigation
    home: "خانه",
    features: "ویژگی‌ها",
    meditation: "مدیتیشن",
    focusTools: "ابزارهای تمرکز",
    pricing: "قیمت‌گذاری",
    about: "درباره ما",
    getStarted: "شروع کنید",
    languageToggle: "English",
    mindshift: "مایندشیفت",

    // Home page
    yourDailyDoseOfCalm: "آرامش روزانه شما",
    welcomeHeading: "با مایندشیفت آرامش درونی خود را پیدا کنید",
    welcomeSubheading:
      "مدیتیشن‌های هدایت شده، تمرینات ذهن‌آگاهی و ابزارهای تمرکز را برای بهبود سلامت روانی خود کشف کنید",
    exploreFeatures: "کاوش ویژگی‌ها",
    startMeditating: "شروع مدیتیشن",
    happyUsers: "کاربر راضی",
    lovedByWonderfulPeopleAt: "مورد علاقه افراد فوق‌العاده در",

    // Features page
    featuresHeading: "ویژگی‌هایی که برای سلامت روانی شما طراحی شده‌اند",
    featuresSubheading:
      "همه چیزهایی که برای تمرکز، آرامش و ذهن‌آگاهی در طول روز نیاز دارید",
    mindfulnessFeature: "ذهن‌آگاهی",
    mindfulnessDescription:
      "تمرینات هدایت شده برای کمک به حضور و آگاهی شما در لحظه",
    sleepFeature: "خواب بهتر",
    sleepDescription:
      "صداهای آرامش‌بخش و مدیتیشن‌ها برای کمک به خوابیدن سریع‌تر و خواب بهتر",
    focusFeature: "تمرکز عمیق",
    focusDescription: "ابزارها و تکنیک‌هایی برای بهبود تمرکز و بهره‌وری",
    stressFeature: "کاهش استرس",
    stressDescription: "تمرینات سریع برای کمک به مدیریت استرس و اضطراب در لحظه",

    // Meditation page
    meditationHeading: "مدیتیشن‌های هدایت شده",
    meditationSubheading: "مدیتیشن مناسب برای نیازهای خود را پیدا کنید",
    beginnerMeditation: "مبتدی",
    intermediateMeditation: "متوسط",
    advancedMeditation: "پیشرفته",
    meditationDescription:
      "مدیتیشن‌های هدایت شده ما به شما کمک می‌کنند تا آگاهی و شفقت را در زندگی روزمره خود توسعه دهید",
    startSession: "شروع جلسه",

    // Focus page
    focusHeading: "ابزارهای تمرکز",
    focusSubheading:
      "ابزارهایی که برای کمک به بهره‌وری و تمرکز شما طراحی شده‌اند",
    pomodoroTimer: "تایمر پومودورو",
    whiteNoise: "نویز سفید",
    breathingExercises: "تمرینات تنفسی",

    // Pricing page
    pricingHeading: "قیمت‌گذاری ساده و شفاف",
    pricingSubheading: "طرحی را انتخاب کنید که برای شما مناسب است",
    freePlan: "رایگان",
    proPlan: "حرفه‌ای",
    freePlanPrice: "۰ تومان",
    proPlanPrice: "۲۹۹،۰۰۰ تومان",
    monthly: "ماهانه",
    yearly: "سالانه",
    currentPlan: "طرح فعلی",
    upgrade: "ارتقاء",

    // Common
    learnMore: "بیشتر بدانید",
    contactUs: "تماس با ما",
    ourStory: "داستان ما",
    privacyPolicy: "سیاست حفظ حریم خصوصی",
    termsOfService: "شرایط استفاده از خدمات",
    copyright: "© ۲۰۲۴ مایندشیفت. تمامی حقوق محفوظ است.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage === "en" || savedLanguage === "fa") {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language);

    // Apply the appropriate font class to the document
    if (language === "fa") {
      document.documentElement.classList.add("font-vazir");
    } else {
      document.documentElement.classList.remove("font-vazir");
    }

    // Set the HTML lang attribute
    document.documentElement.lang = language === "fa" ? "fa" : "en";

    // Set the text direction
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  // Translation function
  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
