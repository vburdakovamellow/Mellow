import { useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { SharePackScreen, type SharePackRequest } from "./screens/SharePack/SharePackScreen";
import { ServiceRequestViewScreen } from "./screens/ServiceRequestView/ServiceRequestViewScreen";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<"edit" | "view" | "share">("edit");
  const [savedRequest, setSavedRequest] = useState<SharePackRequest | null>(null);

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

