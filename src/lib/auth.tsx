import React, { useEffect, ReactNode, useState } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@/app/contexts/user-context';
import { loginRequest } from '@/configs/authConfig';
import { apiClient } from './api-client';
import { Loader2 } from 'lucide-react';
import { roleBasedRoutes } from '@/types/auth';
import { getRoutePermissionByPath } from '@/constants/route-permission';

interface ProtectedRouteProps {
    children: ReactNode;
}

const fetchAccessToken = async (instance: any, account: any) => {
    return await instance.acquireTokenSilent({
        account,
        ...loginRequest,
    });
};

const fetchUserDetails = async (accessToken: string) => {
    try {
        const response = await apiClient.get('/app-user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts } = useMsal();
    const { user, setUser } = useUser();

    const location = useLocation();
    const navigate = useNavigate();

    const checkAccess = React.useCallback(
        ({ allowedRoles }: { allowedRoles: string[] }) => {
            if (allowedRoles && allowedRoles.length > 0 && user) {
                return allowedRoles?.includes(user.role.roleName);
            }

            return true;
        },
        [user?.id],
    );

    useEffect(() => {
        const loadUserDetails = async () => {
            setIsLoading(false);
            if (isAuthenticated && accounts.length > 0 && !user) {
                setIsLoading(true);
                try {
                    const accessTokenResponse = await fetchAccessToken(instance, accounts[0]);

                    const userDetails = await fetchUserDetails(accessTokenResponse.accessToken);
                    setUser(userDetails);

                    apiClient.interceptors.request.use(async config => {
                        const bearer = `Bearer ${accessTokenResponse.accessToken}`;
                        config.headers.Authorization = bearer;
                        return config;
                    });
                    setIsLoading(false);
                } catch (error) {
                    console.error('Failed to load user details');
                }
            }
        };

        loadUserDetails();
    }, [isAuthenticated, accounts, user, setUser, instance]);

    useEffect(() => {
        if (user && user.role) {
            const targetRoute = roleBasedRoutes[user.role.roleName] || '/';
            navigate(targetRoute);
        }
    }, [user, navigate]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!checkAccess({ allowedRoles: getRoutePermissionByPath(location.pathname)?.allowedRoles || [] })) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Loader2 className="ml-2 h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return children;
};
