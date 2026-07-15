"use client";

import { useState } from "react";
import { Menu, X, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Platform", href: "#architecture" },
    { name: "Explainability", href: "#explainability" },
    { name: "Simulation", href: "#simulation" },
    { name: "Why GroundSet", href: "#why-us" },
    { name: "Stakeholders", href: "#stakeholders" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary text-white shadow-sm shadow-brand-primary/20 transition-transform group-hover:scale-105">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-neutral-dark">
                BP<span className="text-brand-primary">Optima</span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.04, y: -0.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-primary"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#simulation"
              whileHover={{ scale: 1.04, y: -0.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-sm font-medium text-brand-neutral-dark hover:text-brand-primary transition-colors"
            >
              How it works
            </motion.a>
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="group flex items-center gap-1.5 rounded-lg btn-premium-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all"
            >
              Request Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-gray-100 bg-white md:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.98 }}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-brand-muted hover:bg-brand-primary/5 hover:text-brand-primary"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                <motion.a
                  href="#simulation"
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center rounded-lg border border-gray-200 py-2.5 text-base font-medium text-brand-neutral-dark hover:bg-gray-50"
                >
                  How it works
                </motion.a>
                <motion.a
                  href="#cta"
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center rounded-lg btn-premium-gradient py-2.5 text-base font-semibold text-white shadow-sm"
                >
                  Request Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
