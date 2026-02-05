import { useEffect, useState } from "react";
import { CandidatesScreen, type CandidatesStep } from "./screens/Candidates/CandidatesScreen";

function getStepFromUrl(): CandidatesStep {
  if (typeof window === "undefined") return "just_created";
  const p = new URLSearchParams(window.location.search);
  const s = p.get("step");
  if (s === "ultra_ordered") return "ultra_ordered";
  if (s === "sourcing") return "sourcing";
  if (s === "ready_for_review") return "ready_for_review";
  return "just_created";
}

/** just_created → ultra_ordered (scheduled) → sourcing → ready_for_review (candidates ready, Re-Start!). */
export function App() {
  const [step, setStep] = useState<CandidatesStep>(getStepFromUrl);

  useEffect(() => {
    const handler = () => setStep(getStepFromUrl());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const updateStep = (s: CandidatesStep) => {
    setStep(s);
    const params = new URLSearchParams(window.location.search);
    if (s === "just_created") {
      params.delete("step");
    } else {
      params.set("step", s);
    }
    const q = params.toString();
    const url = q ? `${window.location.pathname}?${q}` : window.location.pathname;
    window.history.replaceState({}, "", url);
  };

  return (
    <CandidatesScreen
      requestTitle="Graphic Designer for Social Media Optimisation"
      onGoBack={() => console.log("Go back clicked")}
      step={step}
      onBooked={() => updateStep("ultra_ordered")}
      onRestart={() => updateStep("just_created")}
      onJoin={() => updateStep("sourcing")}
    />
  );
}

