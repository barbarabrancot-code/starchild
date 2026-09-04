import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, type MarketplaceSkill } from "./data";
import { CloseIcon, PlusIcon, ArrowLeftIcon, SearchIcon, CheckIcon } from "./icons";
import { MarketplaceOnboarding } from "./MarketplaceOnboarding";
import { MarketplaceAuthGate } from "./MarketplaceAuthGate";

type View = "onboarding" | "grid" | "create" | "auth" | "purchased";

const TILE_STYLES: Record<string, { bg: string; text: string }> = {
  Writing: { bg: "#262626", text: "#ffffff" },
  Design: { bg: "#f84600", text: "#ffffff" },
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
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${
        skill.mine ? "border-[#f84600]/40" : "border-white/10"
      } ${onSelect ? "cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]" : ""}`}
    >
      <div
        className="relative flex h-[74px] items-center justify-center px-3 text-center"
        style={{ background: tile.bg }}
      >
        {skill.mine && (
          <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase">
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
          className="flex-1 text-[12px] leading-snug text-white/50"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {skill.blurb}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span
            className="text-[11px] text-white/40"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            {skill.provider}
          </span>
          <span
            className="text-[12.5px] font-semibold text-[#f84600]"
            style={{ fontFamily: "var(--font-google-sans)" }}
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
  const [selectedSkill, setSelectedSkill] = useState<MarketplaceSkill | null>(null);

  useEffect(() => {
    if (open) {
      setView("onboarding");
      setSelectedSkill(null);
    }
  }, [open]);

  function openCreate() {
    setView("create");
  }

  function requestBuy(skill: MarketplaceSkill) {
    setSelectedSkill(skill);
    setView("auth");
  }

  function handleAuthContinue() {
    setView("purchased");
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
            className="max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <h3
                className="text-[18px] font-semibold text-white"
                style={{ fontFamily: "var(--font-google-sans)" }}
              >
                Marketplace
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10"
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
                    style={{ background: "linear-gradient(135deg, #ffffff 0%, #fff0db 100%)" }}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div>
                        <p
                          className="text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Featured
                        </p>
                        <h4
                          className="mt-1.5 text-[15.5px] font-semibold text-[#1a1206]"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Turn what you just did into real earnings
                        </h4>
                        <p
                          className="mt-1 text-[12.5px] text-[#1a1206]/65"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Anything Conductor helps you build can become something other people pay to use.
                        </p>
                        <button
                          type="button"
                          onClick={openCreate}
                          className="mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]"
                          style={{ fontFamily: "var(--font-google-sans)" }}
                        >
                          Add your skill
                        </button>
                      </div>
                      <div className="flex size-[76px] shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm">
                        <img
                          src={`${import.meta.env.BASE_URL}images/starchild-symbol.svg`}
                          alt="Starchild"
                          width={36}
                          height={36}
                          className="size-9"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === 0 ? "w-4 bg-[#f84600]" : "w-1.5 bg-black/15"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* search */}
                  <div className="mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5">
                    <SearchIcon className="size-4 text-white/40" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search skills, tags…"
                      className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none"
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
                            ? "border-white bg-white text-neutral-900"
                            : "border-white/12 text-white/55 hover:border-white/30"
                        }`}
                        style={{ fontFamily: "var(--font-google-sans)" }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {/* first cell, always: the way to publish shouldn't drift
                        below the fold as the grid fills up */}
                    <button
                      type="button"
                      onClick={openCreate}
                      className="flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]"
                    >
                      <PlusIcon className="size-5" />
                      <span className="text-[12px]" style={{ fontFamily: "var(--font-google-sans)" }}>
                        Add skill
                      </span>
                    </button>
                    {filtered.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        onSelect={skill.mine ? undefined : () => requestBuy(skill)}
                      />
                    ))}
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
                      className="flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10"
                      aria-label="Back"
                    >
                      <ArrowLeftIcon className="size-4" />
                    </button>
                    <p
                      className="text-[13px] text-white/55"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      New skill
                    </p>
                  </div>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name your skill"
                    className="mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  />

                  <textarea
                    value={blurb}
                    onChange={(e) => setBlurb(e.target.value)}
                    placeholder="What does this skill do? (one or two sentences)"
                    rows={3}
                    className="mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none"
                    style={{ fontFamily: "var(--font-google-sans)" }}
                  />

                  <div className="mt-3 flex gap-3">
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="$5"
                      className="w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    />
                    <select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value)}
                      className="w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none"
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
                      className="flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40"
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
                      className="text-[16.5px] font-semibold text-white"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      You're in
                    </h3>
                    <p
                      className="mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55"
                      style={{ fontFamily: "var(--font-google-sans)" }}
                    >
                      "{selectedSkill?.title}" is ready — check your library to start using it.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className="mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]"
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
