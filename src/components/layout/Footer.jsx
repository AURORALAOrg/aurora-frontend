"use client"

import { useState } from "react"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

import auroraBrain from "/aurora-logo.png"

const Footer = ({ customClass = "" }) => {
  const [email, setEmail] = useState("")
  const [language, setLanguage] = useState("English")
  const [showLanguages, setShowLanguages] = useState(false)

  const languages = ["English", "Español", "Français", "Deutsch", "中文", "日本語"]
  const [accordionOpen, setAccordionOpen] = useState({ 
    acerca: false,
    recursos: false,
    legal: false,
    subscribe: false,
  })

  const toggleAccordion = (section) => { 
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email");
      return;
    }
    console.log("Subscribed with:", email);
    setEmail("");
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setShowLanguages(false)
  }

  return (
    <footer className={`bg-gray-900 text-white font-sans text-base ${customClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-700 pb-8">
          {/* Column: About Aurora */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default" 
              onClick={() => toggleAccordion("acerca")}
            >
              About Aurora
            </h3>
            <ul className={`${accordionOpen.acerca ? "block" : "hidden"} md:block space-y-2`}>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  About US
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default" 
              onClick={() => toggleAccordion("recursos")}
            >
              Resources
            </h3>
            <ul className={`${accordionOpen.recursos ? "block" : "hidden"} md:block space-y-2`}>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Legal */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default"
              onClick={() => toggleAccordion("legal")}
            >
              Legal
            </h3>
            <ul className={`${accordionOpen.legal ? "block" : "hidden"} md:block space-y-2`}>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm block py-1">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Subscribe */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default" 
              onClick={() => toggleAccordion("subscribe")}
            >
              Subscribe
            </h3>
            <form
              onSubmit={handleSubscribe}
              className={`${accordionOpen.subscribe ? "block" : "hidden"} md:block space-y-4`}
            >
              <p className="text-gray-400 text-sm">Stay updated with our latest news and offers</p>
              <div className="flex flex-wrap xl:flex-nowrap flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md text-gray-800 text-sm bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="flex items-center space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Lower section: logo and copyright */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="p-1 rounded">
            <img src={auroraBrain} alt="Aurora Logo" className="w-10 h-10" />
          </div>
        </div>
        <p className="text-sm text-gray-400 text-center sm:text-right">
          © {new Date().getFullYear()} AURORA Language Assistant. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  )
}

export default Footer