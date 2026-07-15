"use client";

import { useState } from "react";
import { 
  FileText, 
  Settings, 
  Cpu, 
  ShieldCheck, 
  X, 
  Info,
  ArrowRight,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CardDetails {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: any;
  bulletPoints: string[];
  techCode: string;
  iconColor: string;
  bgColor: string;
}

const cards: CardDetails[] = [
  {
    id: "evidence",
    title: "1. Document & Media Evidence",
    shortDesc: "Convert unstructured documents, images, and videos into raw JSON facts.",
    longDesc: "GroundSet reads multi-modal data streams without losing details. Instead of relying on general LLM summaries, GroundSet extracts precise bounding boxes and raw transcription segments, mapping evidence directly to deterministic values.",
    icon: FileText,
    iconColor: "text-brand-primary",
    bgColor: "bg-brand-primary/10",
    bulletPoints: [
      "Multi-modal extraction: Analyzes scans, camera frames, PDFs, and media transcripts.",
      "Traceability bounds: Tracks exact coordinates (bounding box metadata) of all extracted figures.",
      "Grounding validation: Compares raw text streams with contextual OCR anchors to ensure data authenticity."
    ],
    techCode: `{
  "document": "tax_return_2025.pdf",
  "ocrEngine": "groundset-ocr-v2",
  "anchors": {
    "grossIncome": {
      "value": 142500,
      "page": 1,
      "boundingBox": [102, 450, 240, 472],
      "confidence": 0.998
    }
  }
}`
  },
  {
    id: "rules",
    title: "2. Deterministic Policies",
    shortDesc: "Run absolute, checkable business policies instead of probability vectors.",
    longDesc: "A core issue with general-purpose AI is non-deterministic halluncination. GroundSet avoids this by compiling policies into WebAssembly-powered decision tables. If a rule specifies a threshold, that threshold is strictly evaluated as a logical guarantee.",
    icon: Settings,
    iconColor: "text-brand-accent",
    bgColor: "bg-brand-accent/10",
    bulletPoints: [
      "Zero probability bias: Rules evaluate with boolean or range certainty, never guessing.",
      "Hot reloading: Compile business logic dynamically via human-readable declarative YAML schemas.",
      "Mathematical proof: Every evaluated node outputs its variable assignments and trace steps."
    ],
    techCode: `policies:
  - name: "Debt-to-Income check"
    condition: "facts.debtToIncomeRatio <= 0.43"
    action: "PASS"
  - name: "Minimum Credit rating"
    condition: "facts.creditScore >= 680"
    action: "PASS"`
  },
  {
    id: "decision",
    title: "3. Explainable Outputs",
    shortDesc: "Generate step-by-step reasoning maps detailing how outcomes were reached.",
    longDesc: "GroundSet is designed to eliminate the black-box problem. For every transaction decision, GroundSet produces an execution graph, tracing every variable back to the source evidence file and corresponding OCR coordinate.",
    icon: Cpu,
    iconColor: "text-brand-secondary",
    bgColor: "bg-brand-secondary/10",
    bulletPoints: [
      "Execution graph tracing: View decision paths in full visual logs or JSON graphs.",
      "Discrepancy alerts: Flags inconsistencies between multi-model analysis and deterministic boundaries.",
      "Auditor friendly reports: Instantly exports human-readable decision packages for regulators."
    ],
    techCode: `{
  "decision": "APPROVED",
  "executionTrace": {
    "totalSteps": 5,
    "matchedNodes": ["CREDIT_OK", "INCOME_OK", "NO_LIENS"],
    "violatedNodes": [],
    "auditReady": true
  }
}`
  },
  {
    id: "audit",
    title: "4. Cryptographic Audit Trail",
    shortDesc: "Sign decisions on ledger blocks for full, tamper-proof history.",
    longDesc: "Trust requires verification. GroundSet seals the evidence hashes, rule configuration models, AI models context, and execution graphs into a signed JSON payload, creating an unalterable chain of custody for your risk compliance teams.",
    icon: ShieldCheck,
    iconColor: "text-brand-success",
    bgColor: "bg-brand-success/10",
    bulletPoints: [
      "Immutable signatures: Locks records using elliptic curve signatures (ECDSA secp256k1).",
      "Tamper detection: Any subsequent alteration of evidence invalidates the decision signature.",
      "Compliance storage: Syncs hashes to private distributed ledgers or enterprise relational databases."
    ],
    techCode: `{
  "timestamp": "2026-07-15T18:24:00Z",
  "evidenceHash": "sha256-e3b0c442...",
  "policyHash": "sha256-f48a90d...",
  "engineSignature": "0x3044022067ae2d5...",
  "verifiedBy": "BPOptima_GroundSet_HSM"
}`
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    } as const,
  },
};

export default function ExplainabilitySection() {
  const [activeCard, setActiveCard] = useState<CardDetails | null>(null);

  return (
    <section id="explainability" className="py-20 lg:py-32 bg-[#FDFCFF] relative overflow-hidden">
      {/* Backdrop decorative blobs */}
      <div className="absolute top-1/3 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 -z-10 h-[350px] w-[350px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-brand-primary uppercase">
            Trust & Transparency Architecture
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand-neutral-dark sm:text-5xl">
            Explainability from first principles
          </p>
          <p className="mt-4 text-lg text-brand-muted">
            GroundSet removes LLM uncertainty by structuring the decision pipeline into independent, readable steps. Click each card below to inspect the code structure and compliance guarantees.
          </p>
        </div>

        {/* Grid Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => setActiveCard(card)}
                className="cursor-pointer group flex flex-col justify-between p-6 gradient-border-card shadow-premium shadow-premium-hover transition-all"
              >
                <div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgColor} ${card.iconColor} mb-6`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-neutral-dark group-hover:text-brand-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {card.shortDesc}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-primary">
                  <span>Inspect Pipeline Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Side Details Drawer */}
      <AnimatePresence>
        {activeCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            />
            
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 180 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white shadow-2xl flex flex-col border-l border-gray-100"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${activeCard.bgColor} ${activeCard.iconColor}`}>
                    <activeCard.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-neutral-dark">
                    {activeCard.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCard(null)}
                  className="rounded-lg p-2 text-brand-muted hover:bg-gray-50 hover:text-brand-neutral-dark"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Platform Overview</h4>
                  <p className="text-base text-brand-neutral-dark leading-relaxed">
                    {activeCard.longDesc}
                  </p>
                </div>

                {/* Bullets */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">Core Engineering Specs</h4>
                  <div className="space-y-3">
                    {activeCard.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-brand-neutral-dark">
                        <Info className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                        <span className="font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Sandbox code-block */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
                    <Code className="h-3.5 w-3.5 text-brand-primary" />
                    Technical Schema Example
                  </h4>
                  <div className="relative rounded-xl bg-zinc-950 p-4 border border-zinc-900 overflow-x-auto">
                    <pre className="text-xs font-mono text-zinc-300 leading-relaxed">
                      {activeCard.techCode}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-gray-100 bg-brand-light/30 px-6 py-4 flex justify-between items-center">
                <span className="text-xs text-brand-muted">GroundSet Compliance Standard v2.4</span>
                <button
                  onClick={() => setActiveCard(null)}
                  className="rounded-lg btn-premium-gradient px-4 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
