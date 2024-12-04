import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Leaderboard from "./pages/Student/Leaderboard";
import CoursePlayer from "./pages/Student/CoursePlayer";
import Login from "./pages/Student/Login";
import Register from "./pages/Student/Register";
import QuizPage from "./pages/Student/Quiz";

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
          path="/quiz/:id"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
