import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, type MarketplaceSkill } from "./data";
import { CloseIcon, PlusIcon, ArrowLeftIcon, SearchIcon, LogoMark, CheckIcon } from "./icons";
import { MarketplaceOnboarding } from "./MarketplaceOnboarding";
import { MarketplaceAuthGate } from "./MarketplaceAuthGate";

type View = "onboarding" | "grid" | "create" | "auth" | "purchased";
type Intent = "create" | "buy" | null;

const TILE_STYLES: Record<string, { bg: string; text: string }> = {
  Writing: { bg: "#262626", text: "#ffffff" },
  Design: { bg: "#f4511e", text: "#ffffff" },
  Code: { bg: "#312e81", text: "#ffffff" },
  Marketing: { bg: "#0f766e", text: "#ffffff" },
};

function tileStyle(category: string) {
  return TILE_STYLES[category] ?? { bg: "#e5e5e5", text: "#404040" };
}

function SkillCard({ skill, onSelect }: { skill: MarketplaceSkill; onSelect?: () => void }) {
  const tile = tileStyle(skill.category);
  return (
    <div
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) onSelect();
      }}
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white text-left ${
        skill.mine ? "border-[#f4511e]/40" : "border-neutral-200"
      } ${onSelect ? "cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]" : ""}`}
    >
      <div
        className="relative flex h-[74px] items-center justify-center px-3 text-center"
        style={{ background: tile.bg }}
      >
        {skill.mine && (
          <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f4511e] uppercase">
            New
          </span>
        )}
        <span
          className="text-[13.5px] leading-tight font-bold tracking-wide uppercase"
          style={{ color: tile.text, fontFamily: "var(--font-google-sans)" }}
        >
          {skill.title}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p
          className="flex-1 text-[12px] leading-snug text-neutral-500"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {skill.blurb}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span
            className="text-[11px] text-neutral-400"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            {skill.provider}
          </span>
          <span
            className="text-[12.5px] font-semibold text-[#f4511e]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {skill.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MarketplaceModal({
  open,
  onClose,
  skills,
  onAddSkill,
}: {
  open: boolean;
  onClose: () => void;
  skills: MarketplaceSkill[];
  onAddSkill: (skill: MarketplaceSkill) => void;
}) {
  const [view, setView] = useState<View>("onboarding");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [price, setPrice] = useState("");
  const [skillCategory, setSkillCategory] = useState(CATEGORIES[2]);
  const [intent, setIntent] = useState<Intent>(null);
  const [selectedSkill, setSelectedSkill] = useState<MarketplaceSkill | null>(null);

  useEffect(() => {
    if (open) {
      setView("onboarding");
      setIntent(null);
      setSelectedSkill(null);
    }
  }, [open]);

  function openCreate() {
    setIntent("create");
    setView("auth");
  }

  function requestBuy(skill: MarketplaceSkill) {
    setIntent("buy");
    setSelectedSkill(skill);
    setView("auth");
  }

  function handleAuthContinue() {
    setView(intent === "create" ? "create" : "purchased");
  }

  function submit() {
    if (!title.trim()) return;
    onAddSkill({
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      title: title.trim(),
      price: price.trim() || "$5",
      category: skillCategory,
      blurb: blurb.trim() || "A new skill, ready to be discovered.",
      provider: "You",
      mine: true,
    });
    setTitle("");
    setBlurb("");
    setPrice("");
    setView("grid");
  }

  const query = search.trim().toLowerCase();
  const filtered = skills.filter((s) => {
    const inCategory = category === "All" || s.category === category;
    const inSearch =
      !query ||
      s.title.toLowerCase().includes(query) ||
      s.blurb.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query);
    return inCategory && inSearch;
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <h3
                className="text-[18px] font-semibold text-neutral-900"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Marketplace
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-black/[0.05]"
                aria-label="Close"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {view === "onboarding" ? (
                <motion.div
                  key="onboarding"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MarketplaceOnboarding onDone={() => setView("grid")} />
                </motion.div>
              ) : view === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* featured banner */}
                  <div
                    className="mt-4 overflow-hidden rounded-2xl p-5"
                    style={{ background: "linear-gradient(135deg, #fff4ef 0%, #ffe4d6 100%)" }}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div>
                        <p
                          className="text-[10.5px] font-semibold tracking-[0.14em] text-[#f4511e] uppercase"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Featured
                        </p>
                        <h4
                          className="mt-1.5 text-[15.5px] font-semibold text-neutral-900"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Turn what you just did into real earnings
                        </h4>
                        <p
                          className="mt-1 text-[12.5px] text-neutral-600"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Anything Conductor helps you build can become something other people pay to use.
                        </p>
                        <button
                          type="button"
                          onClick={openCreate}
                          className="mt-3 rounded-full bg-[#f4511e] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Add your skill
                        </button>
                      </div>
                      <div className="flex size-[76px] shrink-0 items-center justify-center rounded-xl bg-white/70">
                        <LogoMark className="size-9" />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === 0 ? "w-4 bg-[#f4511e]" : "w-1.5 bg-black/15"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* search */}
                  <div className="mt-4 flex items-center gap-2 rounded-full border border-neutral-200 px-3.5 py-2.5">
                    <SearchIcon className="size-4 text-neutral-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search skills, tags…"
                      className="flex-1 bg-transparent text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    />
                  </div>

                  {/* category filter */}
                  <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(c)}
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${
                          category === c
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                        }`}
                        style={{ fontFamily: "var(--font-google-sans)" }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {filtered.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        onSelect={skill.mine ? undefined : () => requestBuy(skill)}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={openCreate}
                      className="flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 text-neutral-400 transition-colors hover:border-[#f4511e]/50 hover:text-[#f4511e]"
                    >
                      <PlusIcon className="size-5" />
                      <span className="text-[12px]" style={{ fontFamily: "var(--font-google-sans)" }}>
                        Add skill
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : view === "create" ? (
                <motion.div
                  key="create"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setView("grid")}
                      className="flex size-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-black/[0.05]"
                      aria-label="Back"
                    >
                      <ArrowLeftIcon className="size-4" />
                    </button>
                    <p
                      className="text-[13px] text-neutral-500"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      New skill
                    </p>
                  </div>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name your skill"
                    className="mt-4 w-full border-b border-neutral-200 pb-2 text-[17px] font-semibold text-neutral-900 placeholder:text-neutral-300 focus:border-[#f4511e] focus:outline-none"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  />

                  <textarea
                    value={blurb}
                    onChange={(e) => setBlurb(e.target.value)}
                    placeholder="What does this skill do? (one or two sentences)"
                    rows={3}
                    className="mt-4 w-full resize-none rounded-lg border border-neutral-200 p-3 text-[13.5px] text-neutral-800 placeholder:text-neutral-400 focus:border-[#f4511e] focus:outline-none"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  />

                  <div className="mt-3 flex gap-3">
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="$5"
                      className="w-1/2 rounded-lg border border-neutral-200 p-3 text-[13.5px] text-neutral-800 placeholder:text-neutral-400 focus:border-[#f4511e] focus:outline-none"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    />
                    <select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value)}
                      className="w-1/2 rounded-lg border border-neutral-200 p-3 text-[13.5px] text-neutral-800 focus:border-[#f4511e] focus:outline-none"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!title.trim()}
                      className="flex items-center gap-1.5 rounded-full bg-[#f4511e] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      <PlusIcon className="size-3.5" />
                      add
                    </button>
                  </div>
                </motion.div>
              ) : view === "auth" ? (
                <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <MarketplaceAuthGate
                    intent={intent === "create" ? "create" : "buy"}
                    skillTitle={selectedSkill?.title}
                    onBack={() => setView("grid")}
                    onContinue={handleAuthContinue}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="purchased"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-3 py-10 text-center"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckIcon className="size-5" />
                  </div>
                  <div>
                    <h3
                      className="text-[16.5px] font-semibold text-neutral-900"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      You're in
                    </h3>
                    <p
                      className="mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-neutral-500"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      "{selectedSkill?.title}" is ready — check your library to start using it.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className="mt-2 rounded-full border border-neutral-200 px-4 py-2 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-black/[0.03]"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  >
                    Back to Marketplace
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
