import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => {
  const [scrollToProfile, setScrollToProfile] = useState<(() => void) | null>(null);
  const [scrollToAbout, setScrollToAbout] = useState<(() => void) | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar 
            onInternshipsClick={() => scrollToProfile?.()} 
            onAboutClick={() => scrollToAbout?.()} 
          />

          <Routes>
            <Route 
              path="/" 
              element={<Index setScrollToProfile={setScrollToProfile} setScrollToAbout={setScrollToAbout} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
