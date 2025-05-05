import Link from "next/link";
import {
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Meditation", href: "/meditation" },
      { name: "Focus Tools", href: "/focus" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Guides", href: "/guides" },
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", icon: FiTwitter, href: "https://twitter.com" },
  { name: "Instagram", icon: FiInstagram, href: "https://instagram.com" },
  { name: "Facebook", icon: FiFacebook, href: "https://facebook.com" },
  { name: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com" },
  { name: "YouTube", icon: FiYoutube, href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="col-span-2 mb-10 md:mb-0">
            <Link href="/" className="inline-flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                MindShift
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Helping you stay calm and focused in a busy world through guided
              meditation, focus tools, and mindfulness practices.
            </p>
            <div className="flex items-center mt-6 space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 transition-colors rounded-full hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="mb-8 md:mb-0">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MindShift. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <Link
              href="/terms"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
