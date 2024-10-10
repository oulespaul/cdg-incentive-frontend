import { apiClient } from '@/lib/api-client';
import { TargetCommission } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export interface TargetCommissionDetailFilterParams {
    year?: string;
    month?: string;
    branchId?: number;
}

const fetchTargetCommissionDetail = async (filterParams: TargetCommissionDetailFilterParams) => {
    const params = new URLSearchParams({
        ...(filterParams.year && { year: filterParams.year }),
        ...(filterParams.month && { month: filterParams.month }),
        ...(filterParams.branchId && { branchId: filterParams.branchId.toString() }),
    });

    return await apiClient.get(`/target-commission/detail?${params}`);
};

export const useFetchTargetCommissionDetail = (filterParams: TargetCommissionDetailFilterParams) => {
    return useQuery<TargetCommission, unknown>({
        queryFn: async () => {
            const { data } = await fetchTargetCommissionDetail(filterParams);
            return data;
        },
        queryKey: ['target-commission-detail', filterParams.year, filterParams.month],
        enabled: !!filterParams.year && !!filterParams.month,
    });
};
