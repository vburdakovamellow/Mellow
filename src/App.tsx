import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { LoadingStateScreen } from "./screens/LoadingState/LoadingStateScreen";

export function App() {
  const path = window.location.pathname;
  const base = import.meta.env.BASE_URL;
  // Normalize base path (remove trailing slash if present)
  const basePath = base.endsWith('/') ? base.slice(0, -1) : base;
  const editPath = basePath ? `${basePath}/edit` : '/edit';
  
  if (path === editPath || path === '/edit') {
    return <RequestCreationEditScreen />;
  }
  
  return <LoadingStateScreen />;
}

