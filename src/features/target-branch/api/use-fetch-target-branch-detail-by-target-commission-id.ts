import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';
import { TargetDMM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dmm-columns';
import { Status } from '@/lib/status-color-utils';

export interface TargetBranch {
    id: number;
    status: Status;
    requestedAt: Date;
    requestedBy: string;
    approvedAt: Date;
    approvedBy: string;
    rejectedAt: Date;
    rejectedBy: string;
    rejectedReason: string;
    calculatedAt: Date;
    calculatedBy: string;
    createdAt: Date;
    createdBy: string;
    targetCommission: TargetCommission;
    targetInHouseList: TargetInHouse[];
    targetDeptList: TargetDept[];
    targetSMMDSMList: TargetSMMDSM[];
    targetDMMList: TargetDMM[];
}

const fetchTargetBranchDetail = async (targetCommissionId: number) => {
    const { data } = await apiClient.get(`target-branch/target-commission/${targetCommissionId}`);
    return data;
};

interface UseFetchTargetBranchDetailProps {
    onSuccess: (data: any) => void;
}

export const useFetchTargetBranchDetail = ({ onSuccess }: UseFetchTargetBranchDetailProps) => {
    return useMutation({
        mutationFn: (targetCommissionId: number) => fetchTargetBranchDetail(targetCommissionId),
        onSuccess,
    });
};
