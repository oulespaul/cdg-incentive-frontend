import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export interface TargetInhouseRequest {
    brandId?: number;
    groupBrand?: string;
    goalBrand?: number;
    actualSalesIDLastYear?: number;
}

export interface TargetDeptRequest {
    groupDept?: string;
    subDepartmentPool?: number[];
    goalDept?: string;
    actualSalesIDLastYear?: string;
}

export interface CreateTargetBranchRequest {
    targetCommissionId?: number;
    branchId?: number;
    targetInHouseList: TargetInhouseRequest[];
    targetDeptList: TargetDeptRequest[];
}

const createTargetBranch = async (data: CreateTargetBranchRequest) => {
    const response = await apiClient.post('/target-branch', data);
    return response.data;
};

interface UseCrerateTargetBranchProps {
    onCreateTargetSuccess: (data: any) => void;
    onCreateTargetError: (error: Error) => void;
}

export const useCreateTargetBranch = ({ onCreateTargetSuccess, onCreateTargetError }: UseCrerateTargetBranchProps) => {
    return useMutation({
        mutationFn: (request: CreateTargetBranchRequest) => createTargetBranch(request),
        onSuccess: response => {
            onCreateTargetSuccess(response.data);
        },
        onError: onCreateTargetError,
    });
};
