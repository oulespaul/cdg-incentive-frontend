import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Page } from '@/models/pagination-response';
import { PaginationState } from '@tanstack/react-table';

export interface TargetBranchDetail {
    id: number;
    year: string;
    month: string;
    targetCommission: number;
    actualSalesLyTotal: number;
    targetID: number;
    actualLyID: number;
    changeTargetCommissionPercentage: number;
    changeTargetIDPercentage: number;
    status: string;
}

export interface TargetBranchFilterParams {
    month?: string;
    year?: string;
}

const fetchTargetBranchDetailList = async (filterParams: TargetBranchFilterParams & PaginationState) => {
    const params = new URLSearchParams({
        page: filterParams.pageIndex.toString(),
        pageSize: filterParams.pageSize.toString(),
        ...(filterParams.month && { month: filterParams.month }),
        ...(filterParams.year && { year: filterParams.year }),
    });
    return await apiClient.get(`target-branch?${params}`);
};

export const useFetchTargetBranchDetailList = (filterParams: TargetBranchFilterParams & PaginationState) => {
    return useQuery<Page<TargetBranchDetail>, number>({
        queryFn: async () => {
            const { data } = await fetchTargetBranchDetailList(filterParams);
            return data;
        },
        queryKey: ['target-branch-detail-list'],
    });
};
