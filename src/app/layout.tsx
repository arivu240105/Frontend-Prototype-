import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BPOptima — System of Record for Decisions",
  description: "GroundSet is an enterprise AI decision engine that reads evidence, converts it to structured data, applies deterministic business rules, validates with AI, and creates complete, transparent audit trails.",
  keywords: ["Explainable AI", "Decision Engine", "Audit Trail", "Rules Engine", "Enterprise AI", "Model Ownership"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}

