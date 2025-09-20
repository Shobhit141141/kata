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
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <CursorTrail />
      <SEO title="Home" description="Adding sweetness to your moments. " />

      <div className="bg-orange-300/20 josefin min-h-screen z-10">
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
              <ProtectedRoute>
                <AddSweetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-sweet/:id"
            element={
              <ProtectedRoute>
                <EditSweetPage/>
              </ProtectedRoute>
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
              <ProtectedRoute>
                <InventoryPage />
              </ProtectedRoute>
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
