"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200); // simulate mock backend latency
  };

  return (
    <section id="cta" className="relative py-24 bg-gradient-to-b from-white via-brand-light to-white overflow-hidden">
      {/* Dynamic background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow animate-float-blob" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-8 md:p-16 border border-zinc-800/80 shadow-2xl relative overflow-hidden btn-animate-gradient"
          style={{ backgroundImage: "linear-gradient(135deg, #09090b 0%, #1e1b4b 40%, #09090b 100%)", backgroundSize: "200% 200%" }}
        >
          
          {/* Subtle grid pattern inside card */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Decorative Gradient Blob inside card */}
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-brand-accent/5 blur-[80px] pointer-events-none animate-float-blob" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[80px] pointer-events-none animate-float-blob-reverse" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Top icon */}
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-brand-accent mb-6 shadow-md shadow-brand-accent/5 animate-float-icon">
              <ShieldCheck className="h-6 w-6" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Build Trust Into Every Decision.
            </h2>
            
            {/* Subheading */}
            <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Implement GroundSet on your own secure private clouds. Get deterministic business rule validations, mathematical audit traces, and complete compliance guarantees.
            </p>

            {/* Interactive Form Panel */}
            <div className="mt-10 max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter work email address"
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/60 text-sm font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all disabled:opacity-50"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="group flex items-center justify-center gap-1.5 rounded-xl btn-premium-gradient px-5 py-3.5 text-sm font-bold text-white shadow-md transition-all disabled:opacity-50 shrink-0 hover:shadow-brand-primary/20 hover:shadow-lg"
                    >
                      {loading ? (
                        <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          Request Access Demo
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-xl border border-emerald-950 bg-emerald-950/20 text-center flex flex-col items-center gap-2"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    <span className="block text-sm font-bold text-white">Demo Access Request Submitted</span>
                    <span className="block text-xs text-zinc-400 max-w-sm mt-0.5 leading-relaxed">
                      Thank you. Our solutions engineering team will reach out to <strong className="text-zinc-200">{email}</strong> within 2 hours with evaluation SDK credentials.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Technical Trust badging footer inside CTA */}
            <div className="mt-12 flex justify-center items-center gap-6 text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-wider">
              <span>SOC 2 Type II Certified</span>
              <span className="h-1 w-1 bg-zinc-700 rounded-full" />
              <span>HIPAA Compliant</span>
              <span className="h-1 w-1 bg-zinc-700 rounded-full" />
              <span>ECDSA Ledger Verification</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
