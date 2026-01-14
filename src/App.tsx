import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { LoadingStateScreen } from "./screens/LoadingState/LoadingStateScreen";

export function App() {
  const path = window.location.pathname;
  
  if (path === '/edit') {
    return <RequestCreationEditScreen />;
  }
  
  return <LoadingStateScreen />;
}

