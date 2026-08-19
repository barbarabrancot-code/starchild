type IconProps = { className?: string };
export type IconComponent = (props: IconProps) => JSX.Element;

export function LogoMark({ className }: IconProps) {
  return (
    <div className={`relative overflow-hidden rounded-[7px] ${className ?? "size-6"}`}>
      <div className="absolute inset-0 bg-[#1c1c1c]" />
      <div
        className="absolute inset-0 bg-[#f84600]"
        style={{ clipPath: "polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%)" }}
      />
    </div>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-5"}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <path
        d="M12 19V6M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M9 18l-6-6 6-6M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19 4 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GradCapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-4"}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function TrendingUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path d="M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function ActivityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path d="M3 13h4l2.5 6L14 5l2 8h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DollarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "size-3.5"}>
      <path
        d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
