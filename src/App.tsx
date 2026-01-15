import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { LoadingStateScreen } from "./screens/LoadingState/LoadingStateScreen";

export function App() {
  const path = window.location.pathname;
  const base = import.meta.env.BASE_URL;
  
  // Normalize paths - remove trailing slashes
  const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  
  // Check if path ends with /edit (works for both /edit and /Mellow/edit)
  const isEditPath = normalizedPath.endsWith('/edit') || normalizedPath === '/edit';
  
  if (isEditPath) {
    return <RequestCreationEditScreen />;
  }
  
  return <LoadingStateScreen />;
}

