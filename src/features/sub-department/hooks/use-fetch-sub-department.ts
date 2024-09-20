import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { SubDepartment } from '../models/sub-department';

const getSubDepartment = async () => {
    return await apiClient.get(`/sub-department`);
};

export const useFetchSubDepartment = () => {
    return useQuery<SubDepartment[], unknown>({
        queryFn: async () => {
            const { data } = await getSubDepartment();
            return data;
        },
        queryKey: ['sub-department'],
    });
};
