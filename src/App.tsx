import { useState } from "react";
import { CandidatesScreen, type CandidatesStep } from "./screens/Candidates/CandidatesScreen";

/** just_created → ultra_ordered (scheduled) → ready_for_review (candidates ready, Re-Start!). */
export function App() {
  const [step, setStep] = useState<CandidatesStep>(() => {
    if (typeof window === "undefined") return "just_created";
    const p = new URLSearchParams(window.location.search);
    const s = p.get("step");
    if (s === "ultra_ordered") return "ultra_ordered";
    if (s === "sourcing") return "sourcing";
    if (s === "ready_for_review") return "ready_for_review";
    return "just_created";
  });

  return (
    <CandidatesScreen
      requestTitle="Graphic Designer for Social Media Optimisation"
      onGoBack={() => console.log("Go back clicked")}
      step={step}
      onBooked={() => setStep("ultra_ordered")}
      onRestart={() => setStep("just_created")}
    />
  );
}

