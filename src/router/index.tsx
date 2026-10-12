import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateArticle from "../pages/CreateArticle";
import ArticleDetails from "../pages/ArticleDetails";
import type { ReactNode } from "react";

type RequiredTypes = {
  children: ReactNode;
  roles?: string[];
};

const RequireAuth = ({ children, roles }: RequiredTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some((role) => user?.roles?.includes(role))) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

  return <>{children}</>;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/create-article" element={<RequireAuth><CreateArticle /></RequireAuth>} />
        <Route path="/articles/:id" element={<RequireAuth><ArticleDetails /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;