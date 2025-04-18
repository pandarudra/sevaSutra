import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import RequestHelpPage from "./pages/RequestHelpPage";
import LoginPage from "./pages/LoginPage";
import DonorRegistrationPage from "./pages/DonorRegistrationPage";
import NGORegistrationPage from "./pages/NGORegistartionPage";
import DonorDashboardPage from "./pages/donor/DonorDashboardPage";
import DonateFormPage from "./pages/donor/DonateFormPage";
import NGODashboardPage from "./pages/ngo/NGODashboardPage";
import GovernmentDashboardPage from "./pages/government/GovernmentDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/request-help" element={<RequestHelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donor/register" element={<DonorRegistrationPage />} />
          <Route path="/donor/login" element={<LoginPage />} />
          <Route path="/donor/dashboard" element={<DonorDashboardPage />} />
          <Route path="/donor/donate/:projectId" element={<DonateFormPage />} />
          <Route path="/ngo/register" element={<NGORegistrationPage />} />
          <Route path="/ngo/login" element={<LoginPage />} />
          <Route path="/ngo/dashboard" element={<NGODashboardPage />} />
          <Route path="/government/login" element={<LoginPage />} />
          <Route path="/government/dashboard" element={<GovernmentDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;