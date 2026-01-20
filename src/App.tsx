import { useMemo, useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { SharePackScreen, type SharePackRequest } from "./screens/SharePack/SharePackScreen";
import { ServiceRequestViewScreen } from "./screens/ServiceRequestView/ServiceRequestViewScreen";

type ScreenId = "edit" | "share" | "view";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("edit");
  const [savedRequest, setSavedRequest] = useState<SharePackRequest | null>(null);

  const nav = useMemo(() => {
    return {
      toEdit: () => setCurrentScreen("edit"),
      toView: () => setCurrentScreen("view"),
      toShare: (req?: SharePackRequest) => {
        if (req) setSavedRequest(req);
        if (req || savedRequest) setCurrentScreen("share");
      }
    };
  }, [savedRequest]);

  if (currentScreen === "view") {
    return (
      <ServiceRequestViewScreen
        onGoToEdit={nav.toEdit}
        onGoToShare={(req) => nav.toShare(req)}
        onGoToView={nav.toView}
      />
    );
  }

  if (currentScreen === "share" && savedRequest) {
    return <SharePackScreen request={savedRequest} onGoToEdit={nav.toEdit} onGoToView={nav.toView} />;
  }

  return (
    <RequestCreationEditScreen
      onGoToView={nav.toView}
      onRequestSaved={(req) => nav.toShare(req)}
    />
  );
}

