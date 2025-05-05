"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiList, FiHeadphones, FiTarget, FiUser } from "react-icons/fi";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Features", href: "/features", icon: FiList },
    { name: "Meditate", href: "/meditation", icon: FiHeadphones },
    { name: "Focus", href: "/focus", icon: FiTarget },
    { name: "Profile", href: "/profile", icon: FiUser },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={name}
              href={href}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Icon
                size={22}
                className={
                  isActive ? "text-indigo-600 dark:text-indigo-400" : ""
                }
              />
              <span className="text-xs mt-1">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
