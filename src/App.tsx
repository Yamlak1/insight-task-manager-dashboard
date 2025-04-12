
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/dashboard/Layout";
import Tasks from "./pages/tasks";
import Facilities from "./pages/Facilities";
import Teams from "./pages/Teams";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          
          <Route 
            path="/tasks" 
            element={
              <Layout>
                <Tasks />
              </Layout>
            } 
          />
          
          <Route 
            path="/facilities" 
            element={
              <Layout>
                <Facilities />
              </Layout>
            } 
          />
          
          <Route 
            path="/teams" 
            element={
              <Layout>
                <Teams />
              </Layout>
            } 
          />
          
          <Route 
            path="/notifications" 
            element={
              <Layout>
                <Notifications />
              </Layout>
            } 
          />
          
          <Route 
            path="/reports" 
            element={
              <Layout>
                <Reports />
              </Layout>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <Layout>
                <Settings />
              </Layout>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
