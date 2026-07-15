"use client";

import { useState, useEffect } from "react";
import { 
  Play, 
  RotateCcw, 
  FileText, 
  Settings, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldAlert, 
  Database,
  Cpu,
  ChevronRight,
  Fingerprint,
  Lock,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Rule {
  text: string;
  passed: boolean;
}

interface Scenario {
  id: string;
  name: string;
  icon: string;
  evidenceFiles: string[];
  rawDetails: Record<string, string>;
  extractedFacts: Record<string, string | number | boolean>;
  rules: Rule[];
  confidence: string;
  riskScore: number;
  decision: "APPROVED" | "REQUIRES REVIEW" | "REJECTED";
  reason: string;
  auditHash: string;
}

const scenarios: Scenario[] = [
  {
    id: "loan",
    name: "Loan Approval",
    icon: "loan",
    evidenceFiles: ["tax_return_2025.pdf", "paystubs_Q1.png", "credit_report_transunion.xml"],
    rawDetails: {
      "Applicant Name": "Eleanor Vance",
      "Requested Amount": "$350,000",
      "Term": "30-Year Fixed",
      "Stated Income": "$145,000/yr",
    },
    extractedFacts: {
      verifiedAnnualIncome: 142500,
      creditScore: 742,
      debtToIncomeRatio: 0.34,
      employmentStatus: "VERIFIED_FT",
      liensFound: false
    },
    rules: [
      { text: "Credit Score must be >= 680", passed: true },
      { text: "Debt-to-Income Ratio must be <= 0.43", passed: true },
      { text: "Employment Status must be Active / Salaried", passed: true },
      { text: "Public Records Search must return No Liens", passed: true },
      { text: "Income Discrepancy must be < 5%", passed: true }
    ],
    confidence: "99.8%",
    riskScore: 18,
    decision: "APPROVED",
    reason: "All financial thresholds cleared. Data match verification achieved high statistical confidence.",
    auditHash: "8f7c9e0d6a2b4c8e1f5a9b7c3d2e0f4a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e"
  },
  {
    id: "insurance",
    name: "Insurance Claim",
    icon: "insurance",
    evidenceFiles: ["accident_scene_photo_1.jpg", "police_report_9921.pdf", "repair_estimate_sheet.xlsx"],
    rawDetails: {
      "Insured Party": "Marcus Sterling",
      "Policy ID": "POL-9882109-B",
      "Claim Value": "$9,450",
      "Accident Type": "Single Vehicle Collison",
    },
    extractedFacts: {
      structuralDamageVerified: true,
      policeReportMatchesVisuals: true,
      estimatedSpeedAtImpact: "42 mph (in 45 mph zone)",
      policyCoverageActive: true,
      priorClaimsHistoryCount: 3
    },
    rules: [
      { text: "Policy Coverage status must be ACTIVE", passed: true },
      { text: "Accident Details match police report coordinates", passed: true },
      { text: "Visual damage alignment ratio >= 85%", passed: true },
      { text: "No evidence of reckless driving or intoxication", passed: true },
      { text: "Prior claims within 12 months <= 1", passed: false }
    ],
    confidence: "94.2%",
    riskScore: 52,
    decision: "REQUIRES REVIEW",
    reason: "Claim matches physical evidence, but trigger fired for high frequency of prior claims (3 claims in 12 months).",
    auditHash: "2b9e8f7a6b5c4d3e8f7c9e0d6a2b4c8e1f5a9b7c3d2e0f4a8b7c6d5e4f3a2b1c"
  },
  {
    id: "invoice",
    name: "Invoice Review",
    icon: "invoice",
    evidenceFiles: ["invoice_INV-2026-901.pdf", "purchase_order_PO-4421.pdf", "vendor_agreement_acme.docx"],
    rawDetails: {
      "Vendor": "Aether Dynamics LLC",
      "Invoice Amount": "$48,250",
      "Line Items Count": "14 items",
      "Payment Terms": "Net 30",
    },
    extractedFacts: {
      invoiceLineItemsMatchPO: true,
      unitPricingAlignedWithContract: true,
      duplicateInvoiceDetected: false,
      vendorVerificationStatus: "APPROVED_VENDOR",
      bankAccountMatchesVendorMaster: false
    },
    rules: [
      { text: "Invoice items must match Purchase Order items", passed: true },
      { text: "Pricing must adhere to Master Vendor Agreement limits", passed: true },
      { text: "Invoice ID must be unique (no duplicate filings)", passed: true },
      { text: "Recipient routing coordinates must match registered Master data", passed: false },
      { text: "Invoice totals must calculate without mathematical error", passed: true }
    ],
    confidence: "98.7%",
    riskScore: 78,
    decision: "REJECTED",
    reason: "Routing bank account number does not match registered vendor profile master data. Potential invoice hijacking attempt detected.",
    auditHash: "f3a2b1c0d9e8f7a6b5c4d3e8f7c9e0d6a2b4c8e1f5a9b7c3d2e0f4a8b7c6d5e4"
  },
  {
    id: "compliance",
    name: "Compliance Check",
    icon: "compliance",
    evidenceFiles: ["corporate_registry_cayman.pdf", "beneficial_ownership_chart.xlsx", "ofac_sanction_match.json"],
    rawDetails: {
      "Entity Name": "Vanguard Holdings Ltd",
      "Jurisdiction": "Cayman Islands",
      "Entity Type": "Private Corporation",
      "Transaction Amount": "$1,200,000",
    },
    extractedFacts: {
      ultimateBeneficialOwnersFound: 3,
      jurisdictionRiskRating: "HIGH_RISK_COOP",
      pepMatchesFound: 0,
      sanctionsMatchesFound: 0,
      wireThresholdLimitCleared: false
    },
    rules: [
      { text: "Ultimate Beneficial Owners (UBO) must be identified >= 100%", passed: true },
      { text: "No PEP (Politically Exposed Person) matches in leadership", passed: true },
      { text: "No matches on global sanctions lists (OFAC, EU, UN)", passed: true },
      { text: "Jurisdiction must not be on high-risk grey list", passed: false },
      { text: "Transaction value requires enhanced dual-auth verification", passed: false }
    ],
    confidence: "97.5%",
    riskScore: 65,
    decision: "REQUIRES REVIEW",
    reason: "UBO ownership verified, but corporate jurisdiction (Cayman Islands) is categorized under grey-list risk, and transaction exceeds standard AML thresholds ($1.0M).",
    auditHash: "0d9e8f7a6b5c4d3e8f7c9e0d6a2b4c8e1f5a9b7c3d2e0f4a8b7c6d5e4f3a2b1c"
  }
];

const steps = [
  { id: 0, label: "Reading Evidence", desc: "Parsing files, text, tables, and media inputs" },
  { id: 1, label: "Extracting Structured Data", desc: "Converting raw evidence to structured JSON schemas" },
  { id: 2, label: "Applying Business Rules", desc: "Validating facts against policy logic trees" },
  { id: 3, label: "Validating with AI", desc: "Checking model anomaly thresholds and variance" },
  { id: 4, label: "Generating Decision", desc: "Formulating deterministic policy outcomes" },
  { id: 5, label: "Creating Audit Trail", desc: "Signing the decision path on cryptographic ledger" }
];

export default function SimulationSection() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isFinished, setIsFinished] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const startSimulation = () => {
    setIsRunning(true);
    setIsFinished(false);
    setCurrentStep(0);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setIsFinished(false);
    setCurrentStep(-1);
  };

  useEffect(() => {
    if (!isRunning || currentStep === -1) return;

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 950); // step speed
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      setIsFinished(true);
    }
  }, [isRunning, currentStep]);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const getDecisionStyles = (decision: Scenario["decision"]) => {
    switch (decision) {
      case "APPROVED":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20",
          text: "text-emerald-400",
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
          accentBg: "bg-emerald-500",
        };
      case "REQUIRES REVIEW":
        return {
          bg: "bg-amber-500/10 border-amber-500/20",
          text: "text-amber-400",
          icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
          accentBg: "bg-amber-500",
        };
      case "REJECTED":
        return {
          bg: "bg-rose-500/10 border-rose-500/20",
          text: "text-rose-400",
          icon: <XCircle className="h-5 w-5 text-rose-400" />,
          accentBg: "bg-rose-500",
        };
    }
  };

  return (
    <section id="simulation" className="py-20 lg:py-32 bg-gradient-to-b from-white via-brand-light to-white border-y border-gray-100 overflow-hidden relative">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-1/3 left-10 -z-10 h-[350px] w-[350px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-brand-primary uppercase">
            Product Storytelling through action
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-brand-neutral-dark sm:text-5xl">
            Interactive Decision Journey
          </p>
          <p className="mt-4 text-lg text-brand-muted">
            GroundSet transforms messy documents, images, and rules into transparent, cryptographically verifiable enterprise decisions. Choose a scenario below to run the visual pipeline.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Scenario selectors */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted px-2">
              Select Enterprise Domain
            </h3>
            
            <div className="space-y-2">
              {scenarios.map((scenario) => {
                const isSelected = selectedScenario.id === scenario.id;
                return (
                  <motion.button
                    key={scenario.id}
                    disabled={isRunning}
                    onClick={() => {
                      setSelectedScenario(scenario);
                      resetSimulation();
                    }}
                    whileHover={isRunning ? {} : { y: -2, scale: 1.01 }}
                    whileTap={isRunning ? {} : { scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 shadow-sm ${
                      isSelected
                        ? "bg-white border-brand-primary/40 shadow shadow-brand-primary/5 ring-1 ring-brand-primary/10"
                        : "bg-white/80 border-gray-200/80 hover:bg-white hover:border-gray-300"
                    } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isSelected ? "text-brand-primary" : "text-brand-neutral-dark"}`}>
                        {scenario.name}
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? "text-brand-primary translate-x-0.5" : "text-gray-400"}`} />
                    </div>
                    
                    {/* Raw properties preview */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-gray-100 pt-3 text-brand-muted">
                      <div>
                        <span className="block font-semibold text-[10px] uppercase text-gray-400">Target Entity</span>
                        <span className="truncate block mt-0.5 font-medium text-brand-neutral-dark">
                          {Object.values(scenario.rawDetails)[0]}
                        </span>
                      </div>
                      <div>
                        <span className="block font-semibold text-[10px] uppercase text-gray-400">Claim/Amount</span>
                        <span className="truncate block mt-0.5 font-medium text-brand-neutral-dark">
                          {Object.values(scenario.rawDetails)[2] || Object.values(scenario.rawDetails)[1]}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Run Button Panel */}
            <div className="bg-white border border-gray-200/50 p-5 rounded-xl space-y-4 shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                  Input Evidence files ({selectedScenario.evidenceFiles.length})
                </span>
                <div className="space-y-1.5">
                  {selectedScenario.evidenceFiles.map((file) => (
                    <div key={file} className="flex items-center gap-2 text-xs font-semibold text-brand-neutral-dark bg-brand-light py-1.5 px-3 rounded-lg border border-gray-200/40">
                      <FileText className="h-3.5 w-3.5 text-brand-primary" />
                      <span className="truncate">{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!isRunning && !isFinished ? (
                <motion.button
                  onClick={startSimulation}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl btn-premium-gradient py-3.5 text-sm font-bold text-white shadow-md shadow-brand-primary/10 hover:shadow-lg transition-all"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Run Simulation
                </motion.button>
              ) : (
                <motion.button
                  onClick={resetSimulation}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-brand-neutral-dark hover:bg-gray-50 transition-all"
                >
                  <RotateCcw className="h-4 w-4 text-brand-muted" />
                  Reset Simulation
                </motion.button>
              )}
            </div>
          </div>

          {/* Right panel: Active Visual Execution */}
          <div className="lg:col-span-8">
            <div className="w-full rounded-2xl bg-zinc-950 text-gray-200 border border-zinc-900 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-zinc-400 font-mono font-medium ml-3">
                    groundset-engine-core://{selectedScenario.id}-session
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Engine Online</span>
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full h-[3px] bg-zinc-900 overflow-hidden relative z-20">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: isRunning ? `${((currentStep + 1) / steps.length) * 100}%` : isFinished ? "100%" : "0%" }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>

              {/* Main Workspace */}
              <div className="flex-1 p-6 font-mono text-sm leading-relaxed flex flex-col justify-between">
                
                {/* Idle Screen */}
                {!isRunning && !isFinished && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-brand-primary mb-5 animate-float-icon">
                      <Settings className="h-6 w-6 animate-spin-slow" style={{ animationDuration: "12s" }} />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">GroundSet Core Ready</h4>
                    <p className="text-sm text-zinc-400 max-w-sm">
                      Select an enterprise workflow on the left and click &quot;Run Simulation&quot; to inspect visual logic pipeline.
                    </p>
                  </div>
                )}

                {/* Processing Steps Timeline */}
                {isRunning && (
                  <div className="space-y-6 my-auto">
                    {steps.map((step) => {
                      const isPending = step.id > currentStep;
                      const isActive = step.id === currentStep;
                      const isDone = step.id < currentStep;

                      return (
                        <div 
                          key={step.id} 
                          className={`flex items-start gap-4 transition-all duration-300 ${
                            isPending ? "opacity-30" : "opacity-100"
                          }`}
                        >
                          <div className="flex flex-col items-center mt-1">
                            <div className="relative">
                              {isActive && (
                                <span className="absolute -inset-1 rounded-full bg-brand-accent/35 animate-ping pointer-events-none" />
                              )}
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors relative z-10 ${
                                isDone ? "bg-brand-primary border-brand-primary text-white" :
                                isActive ? "bg-zinc-800 border-brand-accent text-brand-accent animate-pulse-soft" :
                                "bg-zinc-900 border-zinc-800 text-zinc-600"
                              }`}>
                                {isDone ? "✓" : step.id + 1}
                              </div>
                            </div>
                            {step.id < steps.length - 1 && (
                              <div className={`w-0.5 h-8 transition-colors ${isDone ? "bg-brand-primary" : "bg-zinc-800"}`} />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold tracking-tight ${isActive ? "text-brand-accent" : isDone ? "text-white" : "text-zinc-500"}`}>
                                {step.label}
                              </span>
                              {isActive && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-brand-accent/30 text-brand-accent animate-pulse">
                                  Processing
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Simulation Completed (Results Screen) */}
                {isFinished && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    {/* Top status layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Decision Card */}
                      <div className={`p-4 rounded-xl border font-sans ${getDecisionStyles(selectedScenario.decision).bg}`}>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Decision</span>
                        <div className="flex items-center gap-2">
                          {getDecisionStyles(selectedScenario.decision).icon}
                          <span className={`text-base font-extrabold ${getDecisionStyles(selectedScenario.decision).text}`}>
                            {selectedScenario.decision}
                          </span>
                        </div>
                      </div>

                      {/* Confidence Score */}
                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 font-sans">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Confidence Score</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-white">{selectedScenario.confidence}</span>
                          <span className="text-xs text-brand-accent font-semibold">Deterministic</span>
                        </div>
                      </div>

                      {/* Risk Score Dial */}
                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 font-sans flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Risk Score</span>
                          <span className="text-2xl font-black text-white">{selectedScenario.riskScore}<span className="text-xs text-zinc-500">/100</span></span>
                        </div>
                        {/* Custom SVG dial */}
                        <div className="relative h-12 w-12 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="18" className="stroke-zinc-800 fill-none" strokeWidth="3" />
                            <circle 
                              cx="24" 
                              cy="24" 
                              r="18" 
                              className={`stroke-current fill-none transition-all duration-1000 ${
                                selectedScenario.riskScore < 30 ? "text-emerald-500" :
                                selectedScenario.riskScore < 60 ? "text-amber-500" : "text-rose-500"
                              }`} 
                              strokeWidth="3" 
                              strokeDasharray="113" 
                              strokeDashoffset={113 - (113 * selectedScenario.riskScore) / 100} 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Logic panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Extracted facts code-block */}
                      <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-4">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                            <Database className="h-3 w-3 text-brand-primary" />
                            Structured Facts
                          </span>
                          <span className="text-[10px] text-zinc-600">application/json</span>
                        </div>
                        <pre className="text-xs text-zinc-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[140px] overflow-y-auto">
                          {JSON.stringify(selectedScenario.extractedFacts, null, 2)}
                        </pre>
                      </div>

                      {/* Right: Evaluated rules checklist */}
                      <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-4 font-sans flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900 font-mono">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                              <Cpu className="h-3 w-3 text-cyan-400" />
                              Deterministic Rules Check
                            </span>
                            <span className="text-[10px] text-zinc-600">policy-engine</span>
                          </div>
                          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                            {selectedScenario.rules.map((rule, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs">
                                {rule.passed ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                                )}
                                <span className={rule.passed ? "text-zinc-300 font-medium" : "text-rose-300/90 font-medium"}>
                                  {rule.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Explanation text & cryptographic signature block */}
                    <div className="border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 space-y-4">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 font-sans">Decision Logic Explanation</span>
                        <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
                          {selectedScenario.reason}
                        </p>
                      </div>
                      
                      {/* Cryptographic hash */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                        <div className="flex items-center gap-2">
                          <Fingerprint className="h-4 w-4 text-brand-primary" />
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-zinc-500 leading-none">Decision Cryptographic Ledger Hash</span>
                            <span className="text-[10px] font-mono text-zinc-400 truncate block max-w-[280px] md:max-w-[420px] mt-1">
                              {selectedScenario.auditHash}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyHash(selectedScenario.auditHash)}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-all font-sans active:scale-[0.98]"
                        >
                          {copiedHash ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy Hash
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
