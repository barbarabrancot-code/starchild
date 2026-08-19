import type { Deliverable as DeliverableType } from "./data";

function PosterDeliverable({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center">
        <p
          className="text-[15px] leading-tight font-bold tracking-wide text-white"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {title}
        </p>
        <p className="mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase">In theaters</p>
      </div>
      <p
        className="text-[13px] text-neutral-500 italic"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        "{subtitle}"
      </p>

      <style>{`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `}</style>
    </div>
  );
}

function BrandDeliverable({
  name,
  tagline,
  colors,
}: {
  name: string;
  tagline: string;
  colors: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p
          className="text-[17px] font-semibold text-neutral-900"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {name}
        </p>
        <p
          className="text-[13px] text-neutral-500 italic"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {tagline}
        </p>
      </div>
      <div className="flex gap-2">
        {colors.map((c) => (
          <div
            key={c}
            className="size-9 rounded-lg border border-black/5"
            style={{ background: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}

function MarketDeliverable({ rows }: { rows: { label: string; value: string; up: boolean }[] }) {
  return (
    <div className="flex flex-col divide-y divide-neutral-100 overflow-hidden rounded-xl border border-neutral-200">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
          <span
            className="text-[13px] text-neutral-700"
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            {row.label}
          </span>
          <span
            className={`text-[13px] font-medium tabular-nums ${row.up ? "text-emerald-600" : "text-red-500"}`}
            style={{ fontFamily: "var(--font-google-sans)" }}
          >
            {row.up ? "▲" : "▼"} {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CodeDeliverable({ language, snippet }: { language: string; snippet: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2">
        <span
          className="text-[10.5px] tracking-wide text-white/40 uppercase"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          {language}
        </span>
        <span
          className="text-[10.5px] font-medium text-emerald-400"
          style={{ fontFamily: "var(--font-google-sans)" }}
        >
          ✓ ran without errors
        </span>
      </div>
      <pre
        className="overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200"
        style={{ fontFamily: "var(--font-google-sans)" }}
      >
        {snippet}
      </pre>
    </div>
  );
}

export function Deliverable({ deliverable }: { deliverable: DeliverableType }) {
  switch (deliverable.kind) {
    case "poster":
      return <PosterDeliverable title={deliverable.title} subtitle={deliverable.subtitle} />;
    case "brand":
      return (
        <BrandDeliverable
          name={deliverable.name}
          tagline={deliverable.tagline}
          colors={deliverable.colors}
        />
      );
    case "market":
      return <MarketDeliverable rows={deliverable.rows} />;
    case "code":
      return <CodeDeliverable language={deliverable.language} snippet={deliverable.snippet} />;
    case "none":
      return null;
  }
}
