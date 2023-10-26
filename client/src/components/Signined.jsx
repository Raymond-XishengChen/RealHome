import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Use Outlet and Navigate to check if user is logged in/authenticated
// If not authenticated, redirect user to sign in page
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? 
  <Outlet /> : <Navigate to="/sign-in" />;
}