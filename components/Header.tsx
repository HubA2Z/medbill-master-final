"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Your specific MedBillMaster navigation links
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "HIPAA", href: "/hipaa" },
    { name: "Tools", href: "/tools" },
    { name: "Free Audit", href: "/audit", primary: true },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-indigo-600 tracking-tight">
            MedBillMaster
          </Link>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.primary 
                  ? "bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" 
                  : "text-slate-600 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (Visible only on Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-indigo-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown (Shown when isOpen is true) */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-slate-100 bg-white">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${
                    link.primary
                      ? "bg-indigo-50 text-indigo-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
