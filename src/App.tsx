// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AdminRedirect from "./pages/AdminRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ⬇ Vracíme zpět, aby homepage byla opět tvoje funkční Index stránka */}
          <Route path="/" element={<HomePage />} />

          {/* ⬇ /admin posíláme na public/admin/index.html */}
          <Route path="/admin/*" element={<AdminRedirect />} />

          {/* ⬇ Catch-all necháváme beze změny */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

