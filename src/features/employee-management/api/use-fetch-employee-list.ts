import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { Page } from '@/models/pagination-response';
import { Employee } from '@/types/api';

export interface EmployeeFilterParams {
    month?: string;
    year?: string;
    employeeId?: string;
    branchCode?: string;
    branchBU?: string;
}

export const employeeInitialFilterParams = {
    year: undefined,
    month: undefined,
    employeeId: '',
    branchCode: '',
    branchBU: '',
};

const fetchEmployeeList = async (filterParams: EmployeeFilterParams & PaginationState) => {
    const params = new URLSearchParams({
        page: filterParams.pageIndex.toString(),
        pageSize: filterParams.pageSize.toString(),
        ...(filterParams.month && { month: filterParams.month }),
        ...(filterParams.year && { year: filterParams.year }),
        ...(filterParams.employeeId && { employeeId: filterParams.employeeId }),
        ...(filterParams.branchCode && { branchCode: filterParams.branchCode }),
        ...(filterParams.branchBU && { branchBU: filterParams.branchBU }),
    });

    return await apiClient.get(`/employee?${params}`);
};

export const useFetchEmployeeList = (filterParams: EmployeeFilterParams & PaginationState) => {
    return useQuery<Page<Employee>, unknown>({
        queryFn: async () => {
            const { data } = await fetchEmployeeList(filterParams);
            return data;
        },
        queryKey: ['employee', filterParams.pageIndex, filterParams.pageSize],
    });
};
