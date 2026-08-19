import { SignupGate } from "./SignupGate";

export function MarketplaceAuthGate({
  intent,
  skillTitle,
  onBack,
  onContinue,
}: {
  intent: "create" | "buy";
  skillTitle?: string;
  onBack: () => void;
  onContinue: () => void;
}) {
  const heading =
    intent === "create" ? "Create a free account to list your skill" : `Create a free account to get this skill`;
  const sub =
    intent === "create"
      ? "So buyers know who built it, and payouts land somewhere real."
      : `So "${skillTitle}" lands in your library and the seller actually gets paid.`;

  return <SignupGate heading={heading} sub={sub} onBack={onBack} onContinue={onContinue} />;
}
