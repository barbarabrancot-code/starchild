import type { ReactNode } from "react";

// Shared page gutter. 120px is the desktop target; smaller viewports step down so
// the content column doesn't collapse (120px a side leaves ~400px at the sm breakpoint).
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-8 lg:px-[120px] xl:max-w-screen-2xl ${className}`}>
      {children}
    </div>
  );
}
