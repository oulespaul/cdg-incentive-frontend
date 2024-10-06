import { useUser } from '@/app/contexts/user-context';
import { useMsal } from '@azure/msal-react';
import { useCallback } from 'react';

export const useAuth = () => {
    const { instance } = useMsal();
    const { setUser } = useUser();

    const login = useCallback(() => {
        instance.loginRedirect();
    }, []);

    const logout = useCallback(() => {
        setUser(undefined);
        instance.logout();
    }, []);

    return { login, logout };
};
