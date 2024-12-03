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
import { UserProvider } from "./context/UserContext.jsx";
import { SubjectProvider } from "./context/QuizContext.jsx";
import store from "./redux/store.js";
import App from "./App.jsx";
import {
  AdminDashboard,
  Exam,
  ExamDrills,
  Home,
  Premium,
  Quiz,
  Revision,
  RevisionDrills,
  Subject,
  SubjectDrills,
  SubjectQuiz,
  SubjectQuizFree,
  TutorForm,
} from "./pages";
import { PrivateRoute, ConsultationForm, AdminRoute } from "./components";
import { Provider, useSelector } from "react-redux";
import EPQuiz from "./pages/Quiz/EPQuiz.jsx";
import HomeLoggedIn from "./pages/Home/HomeLoggedIn.jsx";

// Google OAuth Wrapper
const GoogleWrapper = () => (
  <GoogleOAuthProvider clientId="423390367187-a0itrkdbugkrv0tsbua5hlks56pdpref.apps.googleusercontent.com">
    <Home />
  </GoogleOAuthProvider>
);

// Dynamic Home component
const DynamicHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <HomeLoggedIn /> : <GoogleWrapper />;
};

const DynamicSubjectQuiz = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isPremium ? <SubjectQuiz /> : <SubjectQuizFree />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Dynamic home route */}
      <Route index element={<DynamicHome />} />

      {/* Public Routes */}
      <Route path="/consultation-form" element={<ConsultationForm />} />
      <Route path="/tutor-form" element={<TutorForm />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/revision-drills/revision" element={<Revision />} />
        <Route path="/quiz/:subjectName" element={<Quiz />} />
        <Route path="/estate-quiz" element={<EPQuiz />} />
        <Route path="/revision-drills" element={<RevisionDrills />} />
        <Route path="/subject-drills" element={<SubjectDrills />} />
        <Route path="/subject-drills/:subjectName" element={<Subject />} />
        <Route path="/subject-quiz/:subjectName" element={<DynamicSubjectQuiz />} />
        <Route path="/exam-drills" element={<ExamDrills />} />
        <Route path="/exam/:subjectName" element={<Exam />} />
        <Route path="/premium" element={<Premium />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

// Root Rendering
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SubjectProvider>
        <Provider store={store}>
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
        </Provider>
      </SubjectProvider>
    </UserProvider>
  </StrictMode>
);
