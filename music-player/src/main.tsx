import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SongProvider } from "./components/context/SongContext.tsx";
import { Toaster } from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SongProvider>
        <Toaster position="top-center" />
        <App />
      </SongProvider>
    </BrowserRouter>
  </React.StrictMode>
);
