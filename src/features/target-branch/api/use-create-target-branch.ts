import { apiClient } from '@/lib/api-client';
import { useMsal } from '@azure/msal-react';
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

export interface TargetDSMRequest {
    dsmId?: string;
    departmentId?: number;
    subDepartmentId?: number;
    goalDept?: string;
    actualSalesLastYear?: string;
    goalId?: string;
    actualSalesIDLastYear?: string;
}

export interface TargetSMMDSMRequest {
    smmId?: string;
    targetDSMList?: TargetDSMRequest[];
}

export interface TargetDMMRequest {
    dmmId?: string;
    departmentId?: number;
    subDepartmentId?: number;
    goalDept?: string;
    actualSalesLastYear?: string;
    goalId?: string;
    actualSalesIDLastYear?: string;
}

export interface CreateTargetBranchRequest {
    targetCommissionId?: number;
    branchId?: number;
    targetInHouseList: TargetInhouseRequest[];
    targetDeptList: TargetDeptRequest[];
    targetSMMDSMList: TargetSMMDSMRequest[];
    targetDMMList: TargetDMMRequest[];
    createdBy?: string;
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
    const { accounts } = useMsal();

    return useMutation({
        mutationFn: (request: CreateTargetBranchRequest) =>
            createTargetBranch({ ...request, createdBy: accounts[0].name }),
        onSuccess: response => {
            onCreateTargetSuccess(response.data);
        },
        onError: onCreateTargetError,
    });
};
