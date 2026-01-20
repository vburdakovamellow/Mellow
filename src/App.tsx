import { useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { SharePackScreen, type SharePackRequest } from "./screens/SharePack/SharePackScreen";
import { ServiceRequestViewScreen } from "./screens/ServiceRequestView/ServiceRequestViewScreen";

function getScreenParam() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("screen");
}

function getInitialState(): { screen: "edit" | "view" | "share"; req: SharePackRequest | null } {
  if (typeof window === "undefined") return { screen: "edit", req: null };
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen");

  if (screen === "share") {
    const req: SharePackRequest = {
      id: "debug",
      title: "Senior React Dev",
      companyName: "Acme Corp.",
      location: "Remote",
      skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL", "Vite"],
      languages: ["English"],
      timeline: { workload: "20–40h/week", startDate: "ASAP" },
      budget: { paymentType: "hourly", from: "70", to: "90", currency: "USD" }
    };
    return { screen: "share", req };
  }

  if (screen === "view") return { screen: "view", req: null };
  return { screen: "edit", req: null };
}

export function App() {
  const forced = getScreenParam();
  if (forced === "share") {
    const req: SharePackRequest = {
      id: "debug",
      title: "Senior React Dev",
      companyName: "Acme Corp.",
      location: "Remote",
      skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL", "Vite"],
      languages: ["English"],
      timeline: { workload: "20–40h/week", startDate: "ASAP" },
      budget: { paymentType: "hourly", from: "70", to: "90", currency: "USD" }
    };
    return <SharePackScreen request={req} onBackToEdit={() => (window.location.href = "/")} />;
  }

  const initial = getInitialState();
  const [currentScreen, setCurrentScreen] = useState<"edit" | "view" | "share">(initial.screen);
  const [savedRequest, setSavedRequest] = useState<SharePackRequest | null>(initial.req);

  if (currentScreen === "view") {
    return <ServiceRequestViewScreen onBackToEdit={() => setCurrentScreen("edit")} />;
  }

  if (currentScreen === "share" && savedRequest) {
    return <SharePackScreen request={savedRequest} onBackToEdit={() => setCurrentScreen("edit")} />;
  }

  return (
    <RequestCreationEditScreen
      onViewFullPreview={() => setCurrentScreen("view")}
      onRequestSaved={(req) => {
        setSavedRequest(req);
        setCurrentScreen("share");
      }}
    />
  );
}

