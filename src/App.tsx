import { useMemo, useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { SharePackScreen, type SharePackRequest } from "./screens/SharePack/SharePackScreen";
import { ServiceRequestViewScreen } from "./screens/ServiceRequestView/ServiceRequestViewScreen";
import { AuthScreen } from "./screens/Auth/AuthScreen";
import { RequestManagementScreen } from "./screens/RequestManagement/RequestManagementScreen";
import { CandidatesScreen } from "./screens/Candidates/CandidatesScreen";

type ScreenId = "edit" | "share" | "view" | "auth" | "management" | "candidates";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("candidates");
  const [savedRequest, setSavedRequest] = useState<SharePackRequest | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("📱 App rendering", { currentScreen, isAuthenticated });

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
      onRequestPublished: () => {
        // After publishing, go to candidates
        setCurrentScreen("candidates");
      },
      toAuth: () => setCurrentScreen("auth"),
      toManagement: () => setCurrentScreen("management"),
      toCandidates: () => setCurrentScreen("candidates")
    };
  }, [savedRequest, isAuthenticated]);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    // After auth, if there's a saved request, go to candidates
    if (savedRequest) {
      setCurrentScreen("candidates");
    } else {
      setCurrentScreen("management");
    }
  };

  if (currentScreen === "auth") {
    return <AuthScreen onComplete={handleAuthComplete} />;
  }

  if (currentScreen === "management") {
    return <RequestManagementScreen />;
  }

  if (currentScreen === "candidates") {
    return (
      <CandidatesScreen
        requestTitle={savedRequest?.title}
        onGoBack={nav.toManagement}
      />
    );
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

