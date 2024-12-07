import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Leaderboard from "./pages/Student/Leaderboard";
import CoursePlayer from "./pages/Student/CoursePlayer";
import Login from "./pages/Student/Login";
import Register from "./pages/Student/Register";
import QuizPage from "./pages/Student/Quiz";
import AssignmentPage from "./pages/Student/Assignment";
import AdminLogin from "./pages/Admin/Login";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminVideos from "./pages/Admin/Videos";
import AddVideo from "./pages/Admin/AddVideo";
import EditVideo from "./pages/Admin/EditVideo";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/student/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/student/courseplayer"
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/quiz/:id"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/assignment/:id/:assignmentId"
          element={
            <PrivateRoute>
              <AssignmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <AdminVideos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/add"
          element={
            <AdminPrivateRoute>
              <AddVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/video/:id"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
