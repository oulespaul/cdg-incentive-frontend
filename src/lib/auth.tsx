import { useMsal } from '@azure/msal-react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useMsal();
  const location = useLocation();

  if (user.accounts.length === 0) {
    return <Navigate to={`/`} replace />;
  } else {
    if (location.pathname === '/app') {
      return <Navigate to={`/app/target-commission`} replace />;
    }
  }

  return children;
};
