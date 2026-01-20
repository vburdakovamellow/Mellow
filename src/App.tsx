import { useState } from "react";
import { RequestCreationEditScreen } from "./screens/RequestCreationEdit/RequestCreationEditScreen";
import { ServiceRequestViewScreen } from "./screens/ServiceRequestView/ServiceRequestViewScreen";

export function App() {
  const [currentScreen, setCurrentScreen] = useState<"edit" | "view">("view");

  // Simple screen switcher for testing (can add proper routing later)
  if (currentScreen === "view") {
    return (
      <div>
        <ServiceRequestViewScreen />
        <button
          onClick={() => setCurrentScreen("edit")}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: "8px 16px",
            background: "#ff6f23",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "12px",
            zIndex: 1000
          }}
        >
          Switch to Edit Screen
        </button>
      </div>
    );
  }

  return (
    <div>
      <RequestCreationEditScreen />
      <button
        onClick={() => setCurrentScreen("view")}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "8px 16px",
          background: "#ff6f23",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "12px",
          zIndex: 1000
        }}
      >
        Switch to View Screen
      </button>
    </div>
  );
}

