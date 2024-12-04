import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? (
    children
  ) : isLoggedIn.role === "admin" ? (
    <Navigate to="/admin/login" />
  ) : (
    <Navigate to="/" />
  );
}
