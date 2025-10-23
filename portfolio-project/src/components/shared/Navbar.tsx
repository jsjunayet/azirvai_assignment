"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/themeContext";
import { useActiveSection } from "@/hooks/useActiveSection ";
import { LogIn, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Education", href: "#education" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const getSectionColor = (section: string) => {
    const colorMap: Record<string, string> = {
      home: "from-blue-600 to-purple-600",
      services: "from-green-500 to-emerald-500",
      skills: "from-orange-500 to-red-500",
      about: "from-purple-500 to-pink-500",
      experience: "from-indigo-500 to-blue-500",
      certificates: "from-yellow-500 to-orange-500",
      education: "from-teal-500 to-cyan-500",
      projects: "from-pink-500 to-rose-500",
      blog: "from-violet-500 to-fuchsia-500",
      contact: "from-gray-600 to-gray-800",
    };
    return colorMap[section] || "from-blue-600 to-purple-600";
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div
              className={`sm:text-2xl text-xl font-bold bg-gradient-to-r ${getSectionColor(
                activeSection
              )} bg-clip-text text-transparent transition-all duration-500`}
            >
              AZIR UDDIN
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`transition-all duration-300 font-medium focus-ring px-3 py-2 rounded-md ${
                  activeSection === item.href.slice(1)
                    ? `bg-gradient-to-r ${getSectionColor(
                        activeSection
                      )} bg-clip-text text-transparent font-bold scale-105`
                    : "text-foreground hover:text-primary hover:bg-accent/10"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground cursor-pointer hover:text-primary hover:bg-accent transition-colors duration-200"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in bg-background/95 rounded-lg border border-border p-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left py-3 px-4 rounded-md transition-all duration-300 focus-ring ${
                  activeSection === item.href.slice(1)
                    ? `bg-gradient-to-r ${getSectionColor(
                        activeSection
                      )} bg-clip-text text-transparent font-bold`
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
