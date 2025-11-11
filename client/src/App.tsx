import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// ✅ Hook to detect PWA install prompt
const usePWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setCanInstall(true);
  });

  const promptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setCanInstall(false);
      return choice;
    }
  };

  return { canInstall, promptInstall };
};

const App = () => {
  const [scrollToProfile, setScrollToProfile] = useState<(() => void) | null>(
    null
  );
  const [scrollToAbout, setScrollToAbout] = useState<(() => void) | null>(null);
  const [goHome, setGoHome] = useState<(() => void) | null>(null);

  // ✅ Enable install prompt in Navbar
  const { canInstall, promptInstall } = usePWAInstallPrompt();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar
            onHomeClick={() => goHome?.()}
            onInternshipsClick={() => scrollToProfile?.()}
            onAboutClick={() => scrollToAbout?.()}
            canInstall={canInstall}
            onInstallClick={promptInstall}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Index
                  setScrollToProfile={setScrollToProfile}
                  setScrollToAbout={setScrollToAbout}
                  setGoHome={setGoHome}
                />
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
