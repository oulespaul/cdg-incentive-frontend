import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { TargetBranch } from './use-fetch-target-branch-detail-by-target-commission-id';

const fetchTargetBranchDetailByBranchId = async (targetBranchId: string) => {
    return await apiClient.get(`target-branch/${targetBranchId}`);
};

export const useFetchTargetBranchDetailByBranchId = (targetBranchId: string) => {
    return useQuery<TargetBranch, string>({
        queryFn: async () => {
            const { data } = await fetchTargetBranchDetailByBranchId(targetBranchId);
            return data;
        },
        queryKey: ['target-branch-detail-by-target-branch-id'],
    });
};
