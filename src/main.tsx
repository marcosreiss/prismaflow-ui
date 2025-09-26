import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { NotificationProvider } from "./context/NotificationContext.tsx";

// Criar instância do cliente
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <Suspense>
              <App />
            </Suspense>
          </NotificationProvider>
        </AuthProvider>
        {/* Ferramenta para debugar queries e mutations */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
