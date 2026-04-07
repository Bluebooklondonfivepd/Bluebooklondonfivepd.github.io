import React, { useState, useEffect, useCallback } from "react";
import Home from "./pages/Home";
import MyCase from "./pages/MyCase";
import NavBar from "./components/NavBar";
import { useToast } from "./components/ToastProvider";

/**
 * Simple route system for the app.
 * Keeps routes minimal and fast (no React Router dependency needed).
 * Pages: home, categories (not implemented here, navigates to home), case
 */
export default function App() {
  const [route, setRoute] = useState("home"); // "home" | "categories" | "case"
  const toast = useToast();

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        // focus search by dispatching a custom event the SearchBar listens to
        const ev = new CustomEvent("focusSearch");
        window.dispatchEvent(ev);
        e.preventDefault();
      }
      if (e.key === "1") setRoute("home");
      if (e.key === "2") setRoute("categories");
      if (e.key === "3") setRoute("case");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Simple navigation helper passed to components (NavBar / pages)
  const onNavigate = useCallback((to) => {
    if (to === "categories") {
      // categories page not implemented in this minimal router; route to home for now
      setRoute("home");
      toast.show("Categories coming soon — use search", { duration: 1400 });
      return;
    }
    setRoute(to);
  }, [toast]);

  return (
    <div className="min-h-screen">
      {/* NavBar is duplicated in pages for consistent header placement; keep here for fallback */}
      <NavBar onNavigate={onNavigate} />
      {route === "home" && <Home onNavigate={onNavigate} />}
      {route === "case" && <MyCase onNavigate={onNavigate} />}
      {/* Bottom sticky nav for one-hand use */}
      <footer className="fixed bottom-4 left-0 right-0 flex justify-center z-40 pointer-events-auto">
        <div className="bg-[rgba(15,23,32,0.9)] rounded-full px-4 py-2 flex gap-3 shadow-[0_8px_18px_rgba(0,0,0,0.6)]">
          <button onClick={() => setRoute("home")} className="uppercase text-sm">Home</button>
          <button onClick={() => setRoute("case")} className="uppercase text-sm">My Case</button>
        </div>
      </footer>
    </div>
  );
}