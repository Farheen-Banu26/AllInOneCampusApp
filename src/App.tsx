import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import Events from "./pages/Events";
import Complaints from "./pages/Complaints";
import Hostel from "./pages/Hostel";
import Marks from "./pages/Marks";
import Leave from "./pages/Leave";
import Connect from "./pages/Connect";
import Groups from "./pages/Groups";
import WiFi from "./pages/WiFi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/events" element={<Events />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/hostel" element={<Hostel />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/wifi" element={<WiFi />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
