import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure dark theme is applied before rendering
if (!document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.add('dark');
}

document.body.style.backgroundColor = '#0f0f1a';

createRoot(document.getElementById("root")!).render(<App />);
