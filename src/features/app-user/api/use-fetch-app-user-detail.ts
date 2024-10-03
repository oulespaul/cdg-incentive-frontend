import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export interface AppUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    isActive: boolean;
    branch?: UserBranch;
    role: Role;
}

interface UserBranch {
    id: number;
    bu: string;
    brand: string;
    segment: string;
    name: string;
    regionName: string;
    type: string;
    branchNumber: string;
    branchCode: string;
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
