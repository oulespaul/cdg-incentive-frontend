import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { SubDepartment } from '../models/sub-department';

export interface SubDepartmentFilterParams {
    departmentId?: number;
}

const getSubDepartment = async (filterParams: SubDepartmentFilterParams) => {
    const params = new URLSearchParams({
        ...(filterParams.departmentId && { department_id: filterParams.departmentId.toString() }),
    });
    return await apiClient.get(`/sub-department?${params}`);
};

export const useFetchSubDepartment = (filterParams: SubDepartmentFilterParams) => {
    return useQuery<SubDepartment[], unknown>({
        queryFn: async () => {
            const { data } = await getSubDepartment(filterParams);
            return data;
        },
        queryKey: ['sub-department'],
    });
};
