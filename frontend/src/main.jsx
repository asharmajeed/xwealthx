import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ScoreDashboard from "./components/ScoreDashboard";
import { questions } from "./data/questions";
import App2 from "./App2.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import ConsultationForm from "./components/ConsultationForm.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext.jsx";
import GPQuiz from "./quizes/GPQuiz.jsx";
import RMQuiz from "./quizes/RMQuiz.jsx";
import IPQuiz from "./quizes/IPQuiz.jsx";
import TPQuiz from "./quizes/TPQuiz.jsx";
import RSQuiz from "./quizes/RSQuiz.jsx";
import EPQuiz from "./quizes/EPQuiz.jsx";

const GoogleWrapper = () => (
  <GoogleOAuthProvider clientId="423390367187-a0itrkdbugkrv0tsbua5hlks56pdpref.apps.googleusercontent.com">
    <App2 />
  </GoogleOAuthProvider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<GoogleWrapper />} />
      <Route path="/consultation-form" element={<ConsultationForm />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/general-principle-quiz" element={<GPQuiz />} />
        <Route path="/risk-management-quiz" element={<RMQuiz />} />
        <Route path="/investment-planning-quiz" element={<IPQuiz />} />
        <Route path="/tax-planning-quiz" element={<TPQuiz />} />
        <Route path="/retirement-quiz" element={<RSQuiz />} />
        <Route path="/estate-planning-quiz" element={<EPQuiz />} />
        <Route
          path="/dashboard"
          element={<ScoreDashboard questions={questions} />}
        />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
