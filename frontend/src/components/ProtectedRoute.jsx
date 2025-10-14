import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="spinner" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if route has role restrictions
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to user's appropriate dashboard
    const dashboardPath = `/${user.role}/dashboard`;
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute;

