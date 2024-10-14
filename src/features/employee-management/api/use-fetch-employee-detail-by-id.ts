import { apiClient } from '@/lib/api-client';
import { Employee } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const fetchEmployeeDetailById = async (id: number) => {
    return await apiClient.get(`employee/${id}`);
};

export const useFetchEmployeeDetailById = (id: number | undefined) => {
    return useQuery<Employee, number>({
        queryFn: async () => {
            const { data } = await fetchEmployeeDetailById(id!!);
            return data;
        },
        queryKey: ['employee-detail-by-id', id],
        enabled: !!id,
    });
};
