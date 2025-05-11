"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Sparkles } from "lucide-react"
import { motion } from "@/components/motion-wrapper"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Chat", path: "/chat" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative mr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-70 group-hover:opacity-100 blur-[2px] group-hover:blur-[3px] transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                ZenBot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div className="relative px-1">
                  <div
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.path
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                    }`}
                  >
                    {item.name}
                  </div>
                  {pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.path}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-teal-50 to-blue-50 text-teal-600 dark:bg-slate-800 dark:text-teal-400"
                      : "text-gray-600 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-teal-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
