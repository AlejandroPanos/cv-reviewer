import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
        <Toaster />
      </StrictMode>
    </QueryClientProvider>
  </AuthContextProvider>,
);
