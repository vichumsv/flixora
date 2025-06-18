import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; //Tanstack Query
import { MovieProvider } from "./context/MovieContext.jsx";

import "./index.css";
import "./app.css";
import App from "./App.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MovieProvider>
      <App />
      <ReactQueryDevtools />
    </MovieProvider>
  </QueryClientProvider>
);
