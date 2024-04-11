import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/authContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { MessageContextProvider } from "./context/MessageContext.jsx";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SocketContextProvider>
            <MessageContextProvider>
              <App />
            </MessageContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
