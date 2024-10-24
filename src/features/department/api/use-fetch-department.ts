import { apiClient } from '@/lib/api-client';
import { Department } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getDepartment = async () => {
    return await apiClient.get(`/department`);
};

export const useFetchDepartment = () => {
    return useQuery<Department[], unknown>({
        queryFn: async () => {
            const { data } = await getDepartment();
            return data;
        },
        queryKey: ['department'],
    });
};
