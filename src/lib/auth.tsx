import { routePermissions } from '@/app/routes/routePermission';
import { useAppUserDetail } from '@/features/app-user/hooks/use-app-user-detail';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuList } from './menu-list';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accounts } = useMsal();
    const { appUserDetail } = useAppUserDetail();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const currentRoute = location.pathname;
        const sortedPermissions = [...routePermissions].sort((a, b) => b.path.length - a.path.length);
        const permission = sortedPermissions.find(route => currentRoute.startsWith(route.path));

        if (currentRoute === '/app' || currentRoute === '/app/') {
            if (appUserDetail?.role) {
                const firstMenuPath = getMenuList('')
                    .flatMap(group => group.menus)
                    .find(menu => menu.allowedRoles.includes(appUserDetail.role.roleName))?.href;

                if (firstMenuPath) {
                    navigate(firstMenuPath, { replace: true });
                } else {
                    navigate('/app/unauthorized');
                }
            }
        } else if (
            permission &&
            appUserDetail?.role &&
            !permission.allowedRoles.includes(appUserDetail.role.roleName)
        ) {
            navigate('/app/unauthorized');
        }
    }, [location.pathname, JSON.stringify(appUserDetail), accounts.length]);

    if (!appUserDetail?.role) {
        return (
            <div className="flex justify-center">
                <Loader2 className="ml-2 h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
};
