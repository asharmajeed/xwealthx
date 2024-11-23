import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

// Context and Components
import { UserProvider, useUser } from "./context/UserContext.jsx";
import { SubjectProvider } from "./context/QuizContext.jsx";
import App from "./App.jsx";
import { Home, StudentDashboard, Quiz } from "./pages";
import { PrivateRoute, ConsultationForm } from "./components";

// Google OAuth Wrapper
const GoogleWrapper = () => (
  <GoogleOAuthProvider clientId="423390367187-a0itrkdbugkrv0tsbua5hlks56pdpref.apps.googleusercontent.com">
    <Home />
  </GoogleOAuthProvider>
);

// Dynamic Home component
const DynamicHome = () => {
  const { userInfo } = useUser(); // Check login status from context

  // Render StudentDashboard if logged in, otherwise render GoogleWrapper
  return userInfo ? <StudentDashboard /> : <GoogleWrapper />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Dynamic home route */}
      <Route index element={<DynamicHome />} />

      {/* Public Routes */}
      <Route path="/consultation-form" element={<ConsultationForm />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/quiz/:subjectName" element={<Quiz />} />
      </Route>
    </Route>
  )
);

// Root Rendering
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SubjectProvider>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
          }}
        />
      </SubjectProvider>
    </UserProvider>
  </StrictMode>
);
