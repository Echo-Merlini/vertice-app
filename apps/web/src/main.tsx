import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./content/LanguageContext";
import { ContentProvider } from "./content/ContentContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
