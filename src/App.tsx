import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { PublicRequestPreviewScreen } from "./screens/PublicRequestPreview/PublicRequestPreviewScreen";
import { PublicRequestPreviewScreenV2 } from "./screens/PublicRequestPreviewV2/PublicRequestPreviewScreenV2";
import { DevButtons } from "./components/DevButtons/DevButtons";

export function App() {
  const path = window.location.pathname;
  const base = import.meta.env.BASE_URL;

  // Normalize paths - remove trailing slashes
  const normalizedPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;

  // Check if path ends with /edit (works for both /edit and /Mellow/edit)
  const isEditPath = normalizedPath.endsWith("/edit") || normalizedPath === "/edit";
  // Check if path is request-v2
  const isRequestV2Path = normalizedPath.endsWith("/request-v2") || normalizedPath === "/request-v2";

  if (isEditPath) {
    return <RequestCreationEditScreen />;
  }

  if (isRequestV2Path) {
    return (
      <>
        <PublicRequestPreviewScreenV2 />
        <DevButtons />
      </>
    );
  }

  // Start page: public preview of the request
  return (
    <>
      <PublicRequestPreviewScreen />
      <DevButtons />
    </>
  );
}

