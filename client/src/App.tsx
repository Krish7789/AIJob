import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewSimulator from "./pages/InterviewSimulator";
import CompanyPrep from "./pages/companyPrep";
import CodingPractice from "./pages/CodingPractice";


const queryClient = new QueryClient();


// Custom Hook for PWA Install Prompt

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
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  return { canInstall, promptInstall };
};

const App = () => {
  const [scrollToProfile, setScrollToProfile] = useState<(() => void) | null>(null);
  const [scrollToAbout, setScrollToAbout] = useState<(() => void) | null>(null);
  const [goHome, setGoHome] = useState<(() => void) | null>(null);

  // PWA support
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

            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/interview" element={<InterviewSimulator />} />
            <Route path="/company-prep" element={<CompanyPrep />} />
            <Route path="/coding-practice" element={<CodingPractice />} />


            <Route path="/contact" element={<Contact />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
