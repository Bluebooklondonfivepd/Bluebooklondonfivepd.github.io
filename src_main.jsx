import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./components/ToastProvider";
import "./index.css";

/**
 * Entry point
 * - Wrap App with ToastProvider so toasts are available globally
 * - Mount to #root
 */
const root = createRoot(document.getElementById("root"));
root.render(
  <ToastProvider>
    <App />
  </ToastProvider>
);