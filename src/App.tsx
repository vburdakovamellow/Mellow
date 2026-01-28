import { useMemo, useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { SharePackScreen, type SharePackRequest } from "./screens/SharePack/SharePackScreen";

type ScreenId = "edit" | "share";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("edit");
  const [savedRequest, setSavedRequest] = useState<SharePackRequest | null>(null);

  const nav = useMemo(() => {
    return {
      toEdit: () => setCurrentScreen("edit"),
      toShare: (req?: SharePackRequest) => {
        if (req) setSavedRequest(req);
        if (req || savedRequest) setCurrentScreen("share");
      }
    };
  }, [savedRequest]);

  if (currentScreen === "share" && savedRequest) {
    return <SharePackScreen request={savedRequest} onGoToEdit={nav.toEdit} />;
  }

  return (
    <RequestCreationEditScreen
      onRequestSaved={(req) => nav.toShare(req)}
    />
  );
}

