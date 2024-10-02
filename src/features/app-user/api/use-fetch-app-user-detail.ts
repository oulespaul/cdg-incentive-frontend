import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export interface AppUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    isActive: boolean;
    branch: null;
    role: Role;
}

interface Role {
    id: number;
    roleName: string;
    description: string;
}

const fetchAppUserDetail = async () => {
    return apiClient.get(`/app-user`);
};

interface UseFetchAppUserDetail {
    onSuccess: (data: any) => void;
}

export const useFetchAppUserDetail = ({ onSuccess }: UseFetchAppUserDetail) => {
    return useMutation({
        mutationFn: () => fetchAppUserDetail(),
        onSuccess,
    });
};
