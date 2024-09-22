import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';

export interface TargetBranch {
    id: number;
    status: string;
    requestedAt: string;
    requestedBy: string;
    approvedAt: string;
    approvedBy: string;
    rejectedAt: string;
    rejectedBy: string;
    rejectedReason: string;
    calculatedAt: string;
    calculatedBy: string;
    targetCommission: TargetCommission;
    targetInHouseList: TargetInHouse[];
    targetDeptList: TargetDept[];
}

const fetchTargetBranchDetail = async (targetCommissionId?: number) => {
    if (!targetCommissionId) return { data: null };
    return await apiClient.get(`target-branch/target-commission/${targetCommissionId}`);
};

export const useFetchTargetBranchDetail = (targetCommissionId?: number) => {
    return useQuery<TargetBranch, number>({
        queryFn: async () => {
            const { data } = await fetchTargetBranchDetail(targetCommissionId);
            return data;
        },
        queryKey: ['target-branch-detail'],
        enabled: false,
    });
};
