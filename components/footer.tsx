import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Github, Heart, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 to-transparent"></div>
      
      <div className="container px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 text-transparent bg-clip-text">
                  ZenBot
                </span>
              </div>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your personal AI companion for stress relief, anxiety management, and emotional support — available 24/7.
            </p>
            <div className="flex space-x-3">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.linkedin.com/in/ridhika-shekhawat/" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://facebook.com" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://github.com/Ridhyka/ZenBotGitHub" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/chat" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Chat Now
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Daily Journal
                </Link>
              </li>
              <li>
                <Link href="/meditations" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Guided Meditations
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Mental Health Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/crisis" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Crisis Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for mental wellness tips and updates.
            </p>
            <form className="space-y-2">
              <div className="flex flex-col space-y-2">
                <Input 
                  type="email" 
                  placeholder="ridhikashekhawat77@gmail.com" 
                  className="border-gray-300 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-400"
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0 shadow-sm"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} ZenBot. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/privacy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
