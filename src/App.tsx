
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";

// Client Pages
import ClientBookAppointment from "./pages/client/BookAppointment";
import ClientAppointmentsDashboard from "./pages/client/AppointmentsDashboard";
import ClientLiveMapView from "./pages/client/LiveMapView";
import ClientNotifications from "./pages/client/Notifications";
import ClientProfile from "./pages/client/Profile";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/AppointmentsList";
import DoctorMapRoute from "./pages/doctor/MapRouteView";
import DoctorHistory from "./pages/doctor/StatusHistory";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Client Routes */}
            <Route path="/book" element={<ClientBookAppointment />} />
            <Route path="/appointments" element={<ClientAppointmentsDashboard />} />
            <Route path="/map" element={<ClientLiveMapView />} />
            <Route path="/notifications" element={<ClientNotifications />} />
            <Route path="/profile" element={<ClientProfile />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/map" element={<DoctorMapRoute />} />
            <Route path="/doctor/history" element={<DoctorHistory />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
