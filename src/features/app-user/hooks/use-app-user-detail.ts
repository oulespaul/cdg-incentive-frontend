import { useCallback, useEffect, useState } from 'react';
import { useMsal, useAccount } from '@azure/msal-react';
import { loginRequest } from '@/configs/authConfig';
import { apiClient } from '@/lib/api-client';
import { AppUser, useFetchAppUserDetail } from '../api/use-fetch-app-user-detail';

export const useAppUserDetail = () => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0]);
    const [appUserDetail, setAppUserDetail] = useState<AppUser | undefined>(undefined);

    const onFetchAppUserSuccess = (response: any) => {
        if (response.status === 200) {
            const appUserDetail = response.data;
            localStorage.setItem('appUserDetail', JSON.stringify(appUserDetail));
            setAppUserDetail(appUserDetail);
        } else {
            setAppUserDetail(undefined);
        }
    };

    const { mutate: fetchAppUserDetail } = useFetchAppUserDetail({ onSuccess: onFetchAppUserSuccess });

    useEffect(() => {
        if (!account) return;

        apiClient.interceptors.request.use(async config => {
            if (!account) {
                throw Error('No active account! Verify a user has been signed in.');
            }
            const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account,
            });
            const bearer = `Bearer ${response.accessToken}`;
            config.headers.Authorization = bearer;
            return config;
        });

        const storeAppUserDetail = localStorage.getItem('appUserDetail');
        if (storeAppUserDetail) {
            setAppUserDetail(JSON.parse(storeAppUserDetail));
        } else {
            const fetchUserRole = async () => {
                fetchAppUserDetail();
            };

            fetchUserRole();
        }
    }, [account, instance, accounts.length]);

    const clearAppUserDetail = useCallback(() => {
        setAppUserDetail(undefined);
        localStorage.removeItem('appUserDetail');
    }, []);

    return { appUserDetail, clearAppUserDetail };
};
