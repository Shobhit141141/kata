import SweetDetailsPage from "./pages/SweetDetailsPage.jsx";
import "./App.css";
import { Container } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import SEO from "./pages/SEO.jsx";
import Home from "./pages/HomePage.jsx";
import { SweetsList } from "./pages/SweetsPage.jsx";
import { InventoryPage } from "./pages/InventoryPage.jsx";
import { ErrorBoundary } from "./pages/ErrorBoundary.jsx";
import CursorTrail from "./components/Cursor.jsx";
import AddSweetPage from "./pages/AddSweetPage.jsx";
import BlobBackground from "./components/Blob.jsx";
import EditSweetPage from "./pages/EditSweetPage.jsx";
import SweetQuiz from "./pages/Quiz.jsx";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuthContext();
  if (isLoading) return <Loader className="mx-auto mt-12" />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuthContext();
  if (isLoading) return <Loader className="mx-auto mt-12" />;
  if (isAuthenticated) return <Navigate to="/sweets" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { isLoading, isAuthenticated, isAdmin } = useAuthContext();
  if (isLoading) return <Loader className="mx-auto mt-12" />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <CursorTrail />

      <div className="josefin min-h-screen z-10">
        {/* <BlobBackground /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sweets"
            element={
              <ProtectedRoute>
                <SweetsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-sweet"
            element={
              <AdminRoute>
                <AddSweetPage />
              </AdminRoute>
            }
          />
          <Route
            path="/edit-sweet/:id"
            element={
              <AdminRoute>
                <EditSweetPage/>
              </AdminRoute>
            }
          />
          <Route
            path="/sweets/:id"
            element={
              <ProtectedRoute>
                <SweetDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <AdminRoute>
                <InventoryPage />
              </AdminRoute>
            }
          />
          <Route 
            path="/quiz"
            element={
              <ProtectedRoute>
                <SweetQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
