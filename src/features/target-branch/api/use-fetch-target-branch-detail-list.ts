import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Page } from '@/models/pagination-response';
import { PaginationState } from '@tanstack/react-table';
import { useAppUserDetail } from '@/features/app-user/hooks/use-app-user-detail';

export interface TargetBranchDetail {
    id: number;
    year: string;
    month: string;
    branchBU: string;
    branchNumber: string;
    branchName: string;
    branchCode: string;
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
    status?: string;
    branchNumber?: string;
    branchCode?: string;
    branchBU?: string;
}

const fetchTargetBranchDetailList = async (filterParams?: TargetBranchFilterParams & PaginationState) => {
    const params = new URLSearchParams({
        page: (filterParams?.pageIndex ?? 0).toString(),
        pageSize: (filterParams?.pageSize ?? 10).toString(),
        ...(filterParams?.month && { month: filterParams.month }),
        ...(filterParams?.year && { year: filterParams.year }),
        ...(filterParams?.status && { status: filterParams.status }),
        ...(filterParams?.branchNumber && { branchNumber: filterParams.branchNumber }),
        ...(filterParams?.branchBU && { branchBU: filterParams.branchBU }),
        ...(filterParams?.branchCode && { branchCode: filterParams.branchCode }),
    });
    return await apiClient.get(`target-branch?${params}`);
};

export const useFetchTargetBranchDetailList = (filterParams?: TargetBranchFilterParams & PaginationState) => {
    const { appUserDetail } = useAppUserDetail();
    return useQuery<Page<TargetBranchDetail>, number>({
        queryFn: async () => {
            //@ts-ignore
            const { data } = await fetchTargetBranchDetailList({
                ...filterParams,
                branchNumber: appUserDetail?.branch?.branchNumber,
            });
            return data;
        },
        queryKey: ['target-branch-detail-list'],
        enabled: !!appUserDetail?.branch?.branchNumber,
    });
};
