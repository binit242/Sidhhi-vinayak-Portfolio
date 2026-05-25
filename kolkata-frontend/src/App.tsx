import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import PageTransition from "./components/PageTransition";

import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectEdit from "./pages/admin/AdminProjectEdit";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminStats from "./pages/admin/AdminStats";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminEnquiries from "./pages/admin/AdminEnquiries";

// Protected admin route wrapper
function ProtectedAdminRoute({ element }: { element: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout>{element}</AdminLayout>;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <MainLayout>
                <Index />
              </MainLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <MainLayout>
                <Projects />
              </MainLayout>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <MainLayout>
                <ProjectDetail />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDashboard />} />} />
          <Route path="/admin/projects" element={<ProtectedAdminRoute element={<AdminProjects />} />} />
          <Route path="/admin/projects/new" element={<ProtectedAdminRoute element={<AdminProjectEdit />} />} />
          <Route path="/admin/projects/:id" element={<ProtectedAdminRoute element={<AdminProjectEdit />} />} />
          <Route path="/admin/testimonials" element={<ProtectedAdminRoute element={<AdminTestimonials />} />} />
          <Route path="/admin/stats" element={<ProtectedAdminRoute element={<AdminStats />} />} />
          <Route path="/admin/appointments" element={<ProtectedAdminRoute element={<AdminAppointments />} />} />
          <Route path="/admin/enquiries" element={<ProtectedAdminRoute element={<AdminEnquiries />} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
