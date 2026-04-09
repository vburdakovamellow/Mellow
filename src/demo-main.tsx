import React from "react";
import ReactDOM from "react-dom/client";
import { DemoApp } from "./DemoApp";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DemoApp />
  </React.StrictMode>
);
