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
import CursorTrail from "./components/Cursor.jsx";

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
  const { user, isLoading } = useAuthContext();
  return (
    <>
      <Navbar user={user} isLoading={isLoading} />
      <CursorTrail/>
      <SEO title="Home" description="Adding sweetness to your moments. " />
      <Container size="xl" className="py-8">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
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
      </Container>
    </>
  );
}

export default App;
