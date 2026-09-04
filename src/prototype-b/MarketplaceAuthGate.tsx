import { SignupGate } from "./SignupGate";

// Buying is the only thing behind this gate: there's a payment to route and a
// library to put the skill in. Listing one goes straight to the form — asking
// someone to sign up before they've even described what they'd publish loses them.
export function MarketplaceAuthGate({
  skillTitle,
  onBack,
  onContinue,
}: {
  skillTitle?: string;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <SignupGate
      heading="Create a free account to get this skill"
      sub={`So "${skillTitle}" lands in your library and the seller actually gets paid.`}
      onBack={onBack}
      onContinue={onContinue}
    />
  );
}
