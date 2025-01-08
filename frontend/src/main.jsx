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
import { SubjectProvider } from "./context/QuizContext.jsx";
import store from "./redux/store.js";
import App from "./App.jsx";
import {
  AdminDashboard,
  AdminFileUpload,
  Exam,
  ExamDrills,
  Flashcards,
  Home,
  Premium,
  QuestionsList,
  Quiz,
  Revision,
  RevisionDrills,
  Subject,
  SubjectDrills,
  SubjectQuiz,
  SubjectQuizFree,
  TutorForm,
  UserFileViewer,
  UsersList,
} from "./pages";
import { PrivateRoute, ConsultationForm, AdminRoute } from "./components";
import { Provider, useSelector } from "react-redux";
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
        <Route path="/revision-drills" element={<RevisionDrills />} />
        <Route path="/subject-drills" element={<SubjectDrills />} />
        <Route path="/subject-drills/:subjectName" element={<Subject />} />
        <Route
          path="/subject-quiz/:subjectName"
          element={<DynamicSubjectQuiz />}
        />
        <Route path="/exam-drills" element={<ExamDrills />} />
        <Route path="/exam/:subjectName" element={<Exam />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/case-studies" element={<UserFileViewer />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/manage-users" element={<UsersList />} />
        <Route path="/admin-dashboard/subject-questions" element={<QuestionsList />} />
        <Route path="/admin-dashboard/add-case-study" element={<AdminFileUpload />} />
      </Route>
    </Route>
  )
);

// Root Rendering
createRoot(document.getElementById("root")).render(
  <StrictMode>
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
  </StrictMode>
);
