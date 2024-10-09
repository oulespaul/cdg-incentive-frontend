import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Page } from '@/models/pagination-response';
import { PaginationState } from '@tanstack/react-table';
import { useUser } from '@/app/contexts/user-context';
import { PaginationStateRequest, TargetBranchDetail } from '@/types/api';
import { AxiosResponse } from 'axios';

export interface TargetBranchFilterParams {
    month?: string;
    year?: string;
    status?: string;
    branchNumber?: string;
    branchCode?: string;
    branchBU?: string;
}

export const targetBranchDetailInitialFilterParams: TargetBranchFilterParams = {
    year: undefined,
    month: undefined,
    status: undefined,
    branchNumber: undefined,
    branchCode: undefined,
    branchBU: undefined,
};

const fetchTargetBranchDetailList = async (
    filterParams: TargetBranchFilterParams & PaginationStateRequest,
): Promise<AxiosResponse<Page<TargetBranchDetail>, any>> => {
    const params = new URLSearchParams({
        page: filterParams.page,
        pageSize: filterParams.pageSize,
        ...(filterParams?.month && { month: filterParams.month }),
        ...(filterParams?.year && { year: filterParams.year }),
        ...(filterParams?.status && { status: filterParams.status }),
        ...(filterParams?.branchNumber && { branchNumber: filterParams.branchNumber }),
        ...(filterParams?.branchBU && { branchBU: filterParams.branchBU }),
        ...(filterParams?.branchCode && { branchCode: filterParams.branchCode }),
    });
    return await apiClient.get(`target-branch?${params}`);
};

export const useFetchTargetBranchDetailList = (filterParams: TargetBranchFilterParams & PaginationState) => {
    const { user } = useUser();

    return useQuery<Page<TargetBranchDetail>, number>({
        queryFn: async () => {
            const { data } = await fetchTargetBranchDetailList({
                ...filterParams,
                page: filterParams.pageIndex.toString(),
                pageSize: filterParams.pageSize.toString(),
                branchNumber: user?.branch?.branchNumber,
            });

            return data;
        },
        queryKey: ['target-branch-detail-list', filterParams?.pageSize, filterParams?.pageIndex],
        enabled: !!user?.branch?.branchNumber,
    });
};
