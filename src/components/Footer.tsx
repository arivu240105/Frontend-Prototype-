"use client";

import { Shield } from "lucide-react";

function Github({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "GroundSet Engine", href: "#architecture" },
        { name: "Rules Compiler", href: "#architecture" },
        { name: "OCR Extractor", href: "#explainability" },
        { name: "Audit Ledger API", href: "#explainability" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "Credit Decisioning", href: "#simulation" },
        { name: "Insurance Underwriting", href: "#simulation" },
        { name: "Invoice Automation", href: "#simulation" },
        { name: "Fintech Compliance Check", href: "#simulation" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#architecture" },
        { name: "YAML Schema Specs", href: "#explainability" },
        { name: "WASM Decision Runtime", href: "#architecture" },
        { name: "Whitepapers", href: "#why-us" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About BPOptima", href: "#" },
        { name: "Trust Center", href: "#why-us" },
        { name: "Security Standards", href: "#cta" },
        { name: "Contact Engineering", href: "#cta" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-100 bg-[#F9FAFB] py-16 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-gray-200/80">
          
          {/* Logo brand column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white shadow-sm">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-brand-neutral-dark">
                BP<span className="text-brand-primary">Optima</span>
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed max-w-xs">
              System of Record for Decisions. Building deterministic, mathematical decision architectures for global enterprise networks.
            </p>
            <div className="flex items-center gap-3.5 pt-2">
              <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-brand-neutral-dark mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs font-semibold text-brand-muted hover:text-brand-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom copyright declaration */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-brand-muted">
          <div>
            &copy; {currentYear} BPOptima Technologies Inc. All rights reserved. GroundSet is a registered trademark of BPOptima.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-brand-neutral-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-neutral-dark transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-neutral-dark transition-colors">Security Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
