"use client";

import { useState } from "react";
import { 
  FileText, 
  Database, 
  Cpu, 
  Settings, 
  CheckSquare, 
  FileSpreadsheet, 
  TrendingUp 
} from "lucide-react";
import { motion } from "framer-motion";

interface ArchStep {
  id: string;
  name: string;
  icon: any;
  techStack: string;
  speed: string;
  description: string;
  details: string[];
}

const steps: ArchStep[] = [
  {
    id: "evidence",
    name: "Evidence",
    icon: FileText,
    techStack: "OCR Engine + Video Segmenter",
    speed: "< 450ms / doc",
    description: "Accepts multi-modal artifacts (documents, logs, image claims, stream transcripts) and loads them secure-in-memory.",
    details: [
      "Secured sandboxed document processing containers",
      "Native image metadata parsing and GPS trace validation",
      "Video framing slicing to locate relevant visual proof segments"
    ]
  },
  {
    id: "data",
    name: "Structured Data",
    icon: Database,
    techStack: "JSON Schema + Pydantic",
    speed: "< 50ms",
    description: "Extracts unstructured content into strict JSON schemas, generating coordinate maps for tracing facts to source docs.",
    details: [
      "Rigid field-type matching and null checks",
      "Fact-anchoring coordinates recorded on layout matrices",
      "Schema discrepancy alerts generated dynamically"
    ]
  },
  {
    id: "rules",
    name: "Rules Engine",
    icon: Settings,
    techStack: "WebAssembly + Rust compiler",
    speed: "< 2ms / policy",
    description: "Runs compiled policy files (YAML decision trees) with complete predictability and near-instant processing times.",
    details: [
      "Pre-compiled binary policies running on sandboxed WASM runtimes",
      "No model hallucination risks or state variances",
      "Supports nested boolean logical structures and mathematical equations"
    ]
  },
  {
    id: "groundset",
    name: "GroundSet Core",
    icon: Cpu,
    techStack: "Customer-Owned LLMs",
    speed: "< 800ms",
    description: "An AI decision node that matches extracted facts against policies and performs dual-validation on private models.",
    details: [
      "Self-hosted model execution on your own cloud VPC (AWS, GCP, Azure)",
      "Cross-checks facts against rules and flags policy edge-cases",
      "Ensures zero public API data leakage or training usage"
    ]
  },
  {
    id: "decision",
    name: "Decision Out",
    icon: CheckSquare,
    techStack: "State Machine Engine",
    speed: "< 10ms",
    description: "Calculates the deterministic outcome (Approved, Rejected, Review) alongside complete confidence scores.",
    details: [
      "Categorical result categorization with absolute logical guarantees",
      "Calculates numerical threat matrix risk scores (0-100)",
      "Highlights precise matched variables causing reviews/rejections"
    ]
  },
  {
    id: "audit",
    name: "Audit Trail",
    icon: FileSpreadsheet,
    techStack: "ECDSA + Ledger Syncer",
    speed: "< 150ms",
    description: "Signs the inputs, rules, model state, and decisions, publishing an immutable cryptographic hash chain block.",
    details: [
      "Private HSM cryptographic key signing protocols",
      "Creates verifiable SHA-256 audit ledger signatures",
      "Prevents post-decision revision risks"
    ]
  }
];

export default function ArchitectureSection() {
  const [activeStep, setActiveStep] = useState<ArchStep>(steps[3]); // default to GroundSet Core

  return (
    <section id="architecture" className="py-20 lg:py-32 bg-gradient-to-b from-white via-brand-light to-white border-b border-gray-100 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold tracking-wider text-brand-primary uppercase">
            Platform Specifications
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand-neutral-dark sm:text-5xl">
            GroundSet Decision Architecture
          </p>
          <p className="mt-4 text-lg text-brand-muted">
            GroundSet compiles policies and orchestrates execution step-by-step. Hover over the nodes below to inspect components.
          </p>
        </div>

        {/* Diagram Area */}
        <div className="relative mb-16 p-8 rounded-2xl bg-white border border-gray-200/40 shadow-premium overflow-x-auto min-w-[900px] lg:min-w-0">
          
          {/* Connecting SVG Path Line */}
          <div className="absolute top-[72px] left-12 right-12 h-1 pointer-events-none -z-0">
            <svg className="w-full h-2 overflow-visible">
              <line
                x1="0"
                y1="4"
                x2="100%"
                y2="4"
                stroke="#e2e8f0"
                strokeWidth="2"
                className="animate-dash-line"
              />
              
              {/* Dynamic glowing particle animation on line */}
              <motion.circle
                r="3.5"
                fill="#635BFF"
                animate={{ cx: ["0%", "100%"] }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              />
              <motion.circle
                r="3.5"
                fill="#06B6D4"
                animate={{ cx: ["0%", "100%"] }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: 3 }}
              />
            </svg>
          </div>

          {/* Steps Horizontal Row */}
          <div className="relative z-10 flex justify-between items-center gap-4">
            {steps.map((step, index) => {
              const isSelected = activeStep.id === step.id;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center cursor-pointer group flex-1"
                  onMouseEnter={() => setActiveStep(step)}
                >
                  {/* Node Circle */}
                  <motion.div 
                    animate={{ scale: isSelected ? 1.12 : 1.0 }}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${
                      isSelected
                        ? "bg-gradient-to-tr from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20"
                        : "bg-white text-brand-muted border-2 border-gray-100 hover:border-brand-primary/40 hover:text-brand-neutral-dark"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -inset-1.5 rounded-2xl bg-brand-primary/10 animate-ping pointer-events-none" />
                    )}
                    <Icon className="h-7 w-7" />
                  </motion.div>

                  {/* Label */}
                  <span className={`mt-4 text-sm font-extrabold tracking-tight transition-colors duration-200 ${
                    isSelected ? "text-brand-primary" : "text-brand-neutral-dark group-hover:text-brand-primary"
                  }`}>
                    {step.name}
                  </span>

                  {/* Quick Tech Tag */}
                  <span className="mt-1 text-[10px] font-semibold text-brand-muted font-mono truncate max-w-[120px]">
                    {step.techStack.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Info Panel for Active Node */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Node Spec Panel */}
          <div className="md:col-span-5 bg-white border border-gray-200/60 p-8 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                  Component Blueprint
                </span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-brand-primary/5 text-brand-primary">
                  {activeStep.speed} latency
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-brand-neutral-dark flex items-center gap-3">
                <activeStep.icon className="h-6 w-6 text-brand-primary" />
                {activeStep.name} Layer
              </h3>
              
              <p className="mt-4 text-base leading-relaxed text-brand-muted">
                {activeStep.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-bold uppercase text-brand-muted">Core Technology</span>
                <span className="text-sm font-bold text-brand-neutral-dark block mt-1">{activeStep.techStack}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-brand-muted">Execution Latency</span>
                <span className="text-sm font-bold text-brand-neutral-dark block mt-1">{activeStep.speed}</span>
              </div>
            </div>
          </div>

          {/* Node Spec Bullet Points */}
          <div className="md:col-span-7 bg-brand-neutral-dark text-white p-8 rounded-2xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Verification Metrics & Controls
                </span>
                <span className="flex items-center gap-1.5 text-xs text-brand-accent font-bold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  SLA Verified
                </span>
              </div>

              <div className="space-y-4">
                {activeStep.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3.5 text-sm text-zinc-300">
                    <span className="h-5 w-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-brand-accent shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="font-semibold mt-0.5 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
              Hover over any node in the architecture diagram to inspect pipeline specifications, latency limits, and cryptographic signatures.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
