import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeftIcon, LockIcon } from "./icons";

export function SignupGate({
  heading,
  sub,
  ctaLabel = "Create account & continue",
  backLabel = "Sign up",
  footerNote = "Already have an account?",
  /** false = an invitation only; credentials are collected on the real signup screen */
  showForm = true,
  onBack,
  onContinue,
}: {
  heading: string;
  sub: string;
  ctaLabel?: string;
  backLabel?: string;
  footerNote?: string;
  showForm?: boolean;
  onBack?: () => void;
  onContinue: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = !showForm || (email.trim() !== "" && password.trim() !== "");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {onBack && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex size-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-black/[0.05]"
            aria-label="Back"
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          <p className="text-[13px] text-neutral-500" style={{ fontFamily: "var(--font-google-sans)" }}>
            {backLabel}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]">
          <LockIcon className="size-5" />
        </div>
        <div>
          <h3 className="text-[16.5px] font-semibold text-neutral-900" style={{ fontFamily: "var(--font-google-sans)" }}>
            {heading}
          </h3>
          <p className="mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-neutral-500" style={{ fontFamily: "var(--font-google-sans)" }}>
            {sub}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[340px] flex-col gap-3">
        {showForm && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-neutral-200 p-3 text-[13.5px] text-neutral-800 placeholder:text-neutral-400 focus:border-[#f84600] focus:outline-none"
              style={{ fontFamily: "var(--font-google-sans)" }}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-neutral-200 p-3 text-[13.5px] text-neutral-800 placeholder:text-neutral-400 focus:border-[#f84600] focus:outline-none"
              style={{ fontFamily: "var(--font-google-sans)" }}
            />
          </>
        )}

        <button
          type="button"
          onClick={onContinue}
          disabled={!canSubmit}
          className="mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {ctaLabel}
        </button>

        <p className="text-center text-[12px] text-neutral-400" style={{ fontFamily: "var(--font-google-sans)" }}>
          {footerNote} <span className="font-medium text-[#f84600]">Log in</span>
        </p>
      </div>
    </motion.div>
  );
}
