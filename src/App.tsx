import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import ProfileRouter from "./pages/ProfileRouter";
import ProfileOnboarding from "./pages/ProfileOnboarding";
import ProfileView from "./pages/ProfileView";
import UserProfile from "./pages/UserProfile";
import SignInPage from "./pages/SignInPage";
import Settings from "./pages/Settings";


const queryClient = new QueryClient();

import MainLayout from "./components/layout/MainLayout";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/login" element={<SignInPage />} />

          <Route element={<MainLayout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfileRouter />} />
            <Route path="/profile/onboarding" element={<ProfileOnboarding />} />
            <Route path="/profile/view" element={<ProfileView />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/spotlight" element={<MainPage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
