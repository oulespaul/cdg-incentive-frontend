import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { Page } from '@/models/pagination-response';
import { TargetCommission } from '../models/target-commission-response';

export interface TargetCommissionFilterParams {
    month?: string;
    year?: string;
    branchNumber?: string;
    branchCode?: string;
    branchBU?: string;
}

export const targetCommissionInitialFilterParams = {
    year: undefined,
    month: undefined,
    branchNumber: undefined,
    branchCode: '',
    branchBU: '',
};

const fetchTargetCommission = async (filterParams: TargetCommissionFilterParams & PaginationState) => {
    const params = new URLSearchParams({
        page: filterParams.pageIndex.toString(),
        pageSize: filterParams.pageSize.toString(),
        ...(filterParams.month && { month: filterParams.month }),
        ...(filterParams.year && { year: filterParams.year }),
        ...(filterParams.branchNumber && { branchNumber: filterParams.branchNumber }),
        ...(filterParams.branchBU && { branchBU: filterParams.branchBU }),
        ...(filterParams.branchCode && { branchCode: filterParams.branchCode }),
    });

    return await apiClient.get(`/target-commission?${params}`);
};

export const useTargetCommission = (filterParams: TargetCommissionFilterParams & PaginationState) => {
    return useQuery<Page<TargetCommission>, unknown>({
        queryFn: async () => {
            const { data } = await fetchTargetCommission(filterParams);
            return data;
        },
        queryKey: ['target-commission', filterParams.pageIndex, filterParams.pageSize],
    });
};
