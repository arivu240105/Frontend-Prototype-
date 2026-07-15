"use client";

import { 
  Sparkles, 
  Settings2, 
  History, 
  HardDrive, 
  Lock, 
  Zap 
} from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    title: "Explainable AI Engine",
    description: "Every decision path generates a human-readable mathematical graph. Zero black box risk. Map any automated policy back to direct OCR anchors or raw transcripts.",
    icon: Sparkles,
    iconBg: "bg-brand-primary/10",
    iconColor: "text-brand-primary"
  },
  {
    title: "Deterministic Rules Engine",
    description: "Policy checks compile directly into isolated WebAssembly code blocks, guaranteeing that hard business guidelines evaluate with boolean absolute certainty.",
    icon: Settings2,
    iconBg: "bg-brand-accent/10",
    iconColor: "text-brand-accent"
  },
  {
    title: "Cryptographic Audit Trail",
    description: "Locks evidence hashes, decision states, and model parameters under ECDSA signatures. Protects your company against retrospective audits or revisionist disputes.",
    icon: History,
    iconBg: "bg-brand-success/10",
    iconColor: "text-brand-success"
  },
  {
    title: "Customer-Owned Models",
    description: "Deploy private models inside your own secure VPC (AWS, GCP, Azure). GroundSet operates without ever sending your sensitive data to third-party APIs.",
    icon: HardDrive,
    iconBg: "bg-brand-secondary/10",
    iconColor: "text-brand-secondary"
  },
  {
    title: "Enterprise Grade Security",
    description: "SOC 2 Type II compliant, ISO 27001 configured, and HIPAA aligned. Secure sandboxed processing isolates variables per transaction execution.",
    icon: Lock,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600"
  },
  {
    title: "Sub-Second Deployment",
    description: "Installs directly via standard cloud scripts. Developer-ready APIs, fully typed TypeScript SDKs, and visual dashboards sync with existing tools instantly.",
    icon: Zap,
    iconBg: "bg-brand-highlight/10",
    iconColor: "text-brand-highlight"
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

export default function FeaturesSection() {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative background grids & blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-dot-pattern opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-10 -z-10 h-[350px] w-[350px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none animate-float-blob" />
      <div className="absolute bottom-1/4 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none animate-float-blob-reverse" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold tracking-wider text-brand-primary uppercase">
            Built for High-Stakes Operations
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand-neutral-dark sm:text-5xl">
            Why Enterprises Trust GroundSet
          </p>
          <p className="mt-4 text-lg text-brand-muted">
            Stripe-inspired engineering excellence tailored to the rigorous auditing demands of the Fortune 500. Zero compromise on compliance or performance.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="group p-8 gradient-border-card shadow-premium shadow-premium-hover transition-all cursor-pointer"
              >
                {/* Icon wrapper */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} mb-6 transition-transform group-hover:scale-105`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-brand-neutral-dark group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Embedded Technical Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-light to-white border border-gray-150 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-brand-neutral-dark">Seeking technical validation models?</h4>
            <p className="text-xs text-brand-muted">Read our whitepaper detailing mathematical models behind deterministic logic validation on private clouds.</p>
          </div>
          <a 
            href="#architecture"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors shrink-0"
          >
            Review Core Specs
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
