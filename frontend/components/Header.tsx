"use client";

import { useState } from "react";
import Link from "next/navigation"; // Or "next/link" depending on your Next.js setup
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "HIPAA", href: "/hipaa" },
    { name: "Tools", href: "/tools" },
    { name: "Free Audit", href: "/audit", primary: true },
  ];

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-xs transition-colors duration-350">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            {/* Minimalist Spark/Enhance Icon */}
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-hover transition-colors shadow-xs">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.187L15 15l-5.187.904zM18.007 6.134L17 10l-1.007-3.866L12 5l4.007-1.134L17 0l1.007 3.866L22 5l-3.993 1.134z" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="font-black text-xl text-foreground tracking-tight uppercase">
                Enhance<span className="text-primary font-medium lowercase">ly</span>
              </span>
              <span className="hidden sm:block text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                Medical Optimization
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-250 px-4 py-2 rounded-lg ${
                    link.primary
                      ? "bg-primary text-white ml-3 rounded-full px-5 py-2.5 shadow-sm hover:bg-primary-hover hover:shadow-md active:scale-95"
                      : isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-muted/40 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <div className="flex flex-col gap-1 pb-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      link.primary
                        ? "bg-primary text-white mt-1 text-center"
                        : isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
