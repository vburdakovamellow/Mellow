import { useMemo, useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { SharePackScreen, type SharePackRequest } from "./screens/SharePack/SharePackScreen";
import { ServiceRequestViewScreen } from "./screens/ServiceRequestView/ServiceRequestViewScreen";
import { AuthScreen } from "./screens/Auth/AuthScreen";
import { RequestManagementScreen } from "./screens/RequestManagement/RequestManagementScreen";

type ScreenId = "edit" | "share" | "view" | "auth" | "management";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("view");
  const [savedRequest, setSavedRequest] = useState<SharePackRequest | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const nav = useMemo(() => {
    return {
      toEdit: () => setCurrentScreen("edit"),
      toView: () => setCurrentScreen("view"),
      toShare: (req?: SharePackRequest) => {
        if (req) setSavedRequest(req);
        // After saving, check if authenticated
        if (!isAuthenticated) {
          setCurrentScreen("auth");
        } else if (req || savedRequest) {
          setCurrentScreen("share");
        }
      },
      toAuth: () => setCurrentScreen("auth"),
      toManagement: () => setCurrentScreen("management")
    };
  }, [savedRequest, isAuthenticated]);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    setCurrentScreen("management");
  };

  if (currentScreen === "auth") {
    return <AuthScreen onComplete={handleAuthComplete} />;
  }

  if (currentScreen === "management") {
    return <RequestManagementScreen />;
  }

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

