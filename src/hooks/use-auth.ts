import { useAppUserDetail } from '@/features/app-user/hooks/use-app-user-detail';
import { useMsal } from '@azure/msal-react';
import { useCallback } from 'react';

export const useAuth = () => {
    const { instance } = useMsal();
    const { clearAppUserDetail } = useAppUserDetail();

    const login = useCallback(() => {
        instance.loginRedirect();
    }, []);

    const logout = useCallback(() => {
        clearAppUserDetail();
        instance.logout();
    }, []);

    return { login, logout };
};
