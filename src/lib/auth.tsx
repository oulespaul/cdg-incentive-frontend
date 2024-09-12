import { useMsal } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useMsal();

  if (user.accounts.length === 0) {
    return <Navigate to={`/`} replace />;
  }

  return children;
};
