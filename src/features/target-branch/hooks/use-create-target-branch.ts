import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export interface TargetInhouseRequest {
    brandId?: number;
    groupBrand?: string;
    goalBrand?: number;
}

export interface CreateTargetBranchRequest {
    targetCommissionId?: number;
    branchId?: number;
    targetInHouseList: TargetInhouseRequest[];
}

const createTargetBranch = async (data: CreateTargetBranchRequest) => {
    const response = await apiClient.post('/target-branch', data);
    return response.data;
};

export const useCreateTargetBranch = () => {
    return useMutation({
        mutationFn: (request: CreateTargetBranchRequest) => createTargetBranch(request),
    });
};
