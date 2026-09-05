import { useState } from "react";
import { AppIcon } from "./AppIcon";
import { BY_ID, type ConnectorId } from "./connectors";

/** tried in order for public/connectors/<id>.<ext> — svg first since that's
 *  what most real marks are saved as; webp covers the odd exported logo that
 *  only exists as a raster */
const EXTENSIONS = ["svg", "webp"];

/**
 * A connector's real logo, wherever one exists as a static asset
 * (public/connectors/<id>.svg or .webp) — falling back to AppIcon's honest
 * hand-drawn category glyph for the ones that don't have a real mark on file
 * yet. The fallback is automatic (a failed image load moves to the next
 * extension, then to the glyph), so adding a new logo file is the only step
 * needed to upgrade a connector from glyph to real mark; removing this
 * component's guess is never required.
 */
export function ConnectorMark({ id, className }: { id: ConnectorId; className?: string }) {
  const [stage, setStage] = useState(0);
  if (stage >= EXTENSIONS.length) return <AppIcon kind={BY_ID[id].kind} className={className} />;
  return (
    <img
      src={`${import.meta.env.BASE_URL}connectors/${id}.${EXTENSIONS[stage]}`}
      alt=""
      className={className}
      onError={() => setStage((s) => s + 1)}
    />
  );
}
