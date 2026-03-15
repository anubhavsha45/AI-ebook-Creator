import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = false;
  const loading = false;
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default ProtectedRoute;
