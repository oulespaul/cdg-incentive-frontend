import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useMsal();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.accounts.length === 0) {
            navigate('/');
        } else {
            if (location.pathname === '/app') {
                navigate('/app/target-commission', { replace: true });
            }
        }
    }, [location.pathname]);

    return children;
};
