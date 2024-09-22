import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Department } from '../models/department';

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
