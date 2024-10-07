import { useUser } from '@/app/contexts/user-context';
import { roleBasedRoutes, ROLES } from '@/types/auth';
import { useMsal } from '@azure/msal-react';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const handleNavigation = (userRole: ROLES) => {
            const targetRoute = roleBasedRoutes[userRole] || '/';
            navigate(targetRoute, { replace: true });
        };

        instance.handleRedirectPromise().then(response => {
            if (response?.account && user?.role) {
                handleNavigation(user.role.roleName);
            }
        });

        (async () => {
            const account = instance.getActiveAccount();
            if (account && user?.role) {
                handleNavigation(user.role.roleName);
            } else {
                instance.initialize();
            }
        })();
    }, []);

    return (
        <div className="flex justify-center">
            <Loader2 className="ml-2 h-12 w-12 animate-spin text-primary" />
        </div>
    );
};
