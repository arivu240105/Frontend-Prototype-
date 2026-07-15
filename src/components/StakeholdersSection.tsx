"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Terminal, 
  BookOpen, 
  GitBranch, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Stakeholder {
  id: string;
  role: string;
  shortRole: string;
  icon: any;
  quote: string;
  painPoints: string[];
  solutions: string[];
  metrics: { value: string; label: string }[];
  accentColor: string;
  bgColor: string;
}

const stakeholders: Stakeholder[] = [
  {
    id: "cro",
    role: "Chief Risk Officer",
    shortRole: "Risk & Policy",
    icon: ShieldCheck,
    quote: "We cannot afford black-box decisions. In high-stakes credit and legal workflows, explaining *why* an action was taken is as important as the action itself.",
    painPoints: [
      "AI models hallucinating facts, resulting in severe compliance and fair-lending penalties.",
      "Lack of granular evidence links during annual regulatory audits.",
      "Liability concerns regarding automated customer-facing decision systems."
    ],
    solutions: [
      "100% deterministic rules compile into immutable variables, eliminating guessing.",
      "Generates deep OCR-to-fact coordinates mapping audit proof automatically.",
      "Locks every final decision block under signed, tamper-proof keys."
    ],
    metrics: [
      { value: "Zero", label: "Black-Box Risk" },
      { value: "100%", label: "Traceable Pathing" }
    ],
    accentColor: "text-brand-secondary border-brand-secondary/20",
    bgColor: "bg-brand-secondary/5"
  },
  {
    id: "cto",
    role: "Chief Technology Officer",
    shortRole: "Infrastructure & AI",
    icon: Terminal,
    quote: "Keeping control of our training data and model endpoints is vital. We want models running on our network, avoiding third-party API dependencies.",
    painPoints: [
      "Sensitive customer documents leaking to third-party model training datasets.",
      "Massive cloud token bills and latency bottlenecks on external LLM APIs.",
      "Vendor lock-in on custom extraction models."
    ],
    solutions: [
      "Runs on customer-owned models deployed inside secure private cloud VPCs.",
      "Fast execution speeds (sub-second document-to-decision cycles).",
      "Model-agnostic backend enables quick swapping of raw model layers."
    ],
    metrics: [
      { value: "0% Data", label: "Leaving your VPC" },
      { value: "< 1s", label: "Total Processing" }
    ],
    accentColor: "text-brand-accent border-brand-accent/20",
    bgColor: "bg-brand-accent/5"
  },
  {
    id: "compliance",
    role: "Compliance Officer",
    shortRole: "Regulation & Audit",
    icon: BookOpen,
    quote: "Regulations evolve quickly. We need the ability to adjust policy rules dynamically, without waiting weeks for core code redeployments.",
    painPoints: [
      "Rules hardcoded into legacy software, requiring full engineering sprints to edit.",
      "No clean way to test policy changes against historical cases.",
      "Fragmented data audit trails spread across multiple databases."
    ],
    solutions: [
      "Business policies managed in human-readable, declarative YAML schema layouts.",
      "Hot-reload rules dynamically with absolute execution predictability.",
      "Unified JSON audit logs gather all variables, inputs, and rule triggers in one ledger."
    ],
    metrics: [
      { value: "Instant", label: "Rules Reloading" },
      { value: "1 Click", label: "Auditor Report" }
    ],
    accentColor: "text-brand-primary border-brand-primary/20",
    bgColor: "bg-brand-primary/5"
  },
  {
    id: "engineering",
    role: "Engineering Teams",
    shortRole: "Developer Experience",
    icon: GitBranch,
    quote: "Building decision systems shouldn't require custom spaghetti logic. We need clean, typed, modular code structures.",
    painPoints: [
      "Maintaining complex, brittle document parsing adapters.",
      "Difficulty writing reliable test coverage for mixed LLM and business rule pipelines.",
      "Debugging vague model response schemas."
    ],
    solutions: [
      "Standard Pydantic and JSON schema validation blocks.",
      "Run policy engine locally with built-in mock testing environments.",
      "Clean TypeScript and Go SDK libraries built for developer-first workflows."
    ],
    metrics: [
      { value: "Typed", label: "JSON In/Out API" },
      { value: "Local", label: "Docker Runtimes" }
    ],
    accentColor: "text-brand-success border-brand-success/20",
    bgColor: "bg-brand-success/5"
  }
];

export default function StakeholdersSection() {
  const [selectedRole, setSelectedRole] = useState<Stakeholder>(stakeholders[0]);

  return (
    <section id="stakeholders" className="py-20 lg:py-32 bg-gradient-to-b from-white via-brand-light to-white border-t border-gray-100 overflow-hidden relative">
      {/* Backdrop decorative blobs */}
      <div className="absolute top-1/4 left-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none animate-float-blob" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none animate-float-blob-reverse" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-brand-primary uppercase">
            Designed for Cross-Functional Trust
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand-neutral-dark sm:text-5xl">
            Aligning Stakeholders on Every Decision
          </p>
          <p className="mt-4 text-lg text-brand-muted">
            GroundSet balances risk mitigation, engineering speed, infrastructure compliance, and audit requirements. Choose your role below to explore how we solve your challenges.
          </p>
        </div>

        {/* Split Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Stakeholder list */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              {stakeholders.map((person) => {
                const isSelected = selectedRole.id === person.id;
                const Icon = person.icon;
                return (
                  <motion.button
                    key={person.id}
                    onClick={() => setSelectedRole(person)}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`w-full flex items-center justify-between p-5 rounded-xl border text-left transition-all shadow-sm ${
                      isSelected
                        ? "bg-white border-brand-primary/40 shadow shadow-brand-primary/5 ring-1 ring-brand-primary/10"
                        : "bg-white/80 border-gray-200/80 hover:bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isSelected ? "bg-brand-primary text-white" : "bg-gray-100 text-brand-muted"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className={`block font-bold text-sm ${isSelected ? "text-brand-primary" : "text-brand-neutral-dark"}`}>
                          {person.role}
                        </span>
                        <span className="text-[11px] font-semibold text-brand-muted block mt-0.5">
                          {person.shortRole}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-transform ${isSelected ? "text-brand-primary translate-x-0.5" : "text-gray-400"}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Embedded Quote badge banner */}
            <div className="hidden lg:block bg-white border border-gray-150 p-6 rounded-2xl shadow-sm">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-primary mb-3">
                <TrendingUp className="h-3.5 w-3.5 text-brand-secondary" />
                Proven Trust Outcome
              </span>
              <p className="text-xs italic text-brand-muted leading-relaxed font-medium">
                &ldquo;Before GroundSet, auditing a single dispute took our compliance team 4 hours. Now, we trace any action back to original PDF OCR coordinates in 5 seconds.&rdquo;
              </p>
              <span className="block text-[10px] font-bold text-brand-neutral-dark mt-3">
                — Head of Risk, Apex Global Bank
              </span>
            </div>
          </div>

          {/* Right Column: Stakeholder View Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="h-full bg-white border border-gray-200/40 rounded-2xl p-8 shadow-premium flex flex-col justify-between"
              >
                <div>
                  {/* Top Quote */}
                  <div className={`p-5 rounded-xl border ${selectedRole.accentColor} ${selectedRole.bgColor} mb-8`}>
                    <p className="text-sm font-semibold italic leading-relaxed text-brand-neutral-dark">
                      &ldquo;{selectedRole.quote}&rdquo;
                    </p>
                  </div>

                  {/* Pain Points vs Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pain Points */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-4 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                        Enterprise Pain Points
                      </h4>
                      <ul className="space-y-3.5">
                        {selectedRole.painPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-muted leading-relaxed">
                            <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                            <span className="font-medium">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-4 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        GroundSet Capabilities
                      </h4>
                      <ul className="space-y-3.5">
                        {selectedRole.solutions.map((sol, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-neutral-dark leading-relaxed">
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                            <span className="font-semibold">{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Metrics Stats row */}
                <div className="mt-10 pt-8 border-t border-gray-150 grid grid-cols-2 gap-4">
                  {selectedRole.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <span className="block text-2xl font-black text-brand-primary">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-brand-muted block mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
