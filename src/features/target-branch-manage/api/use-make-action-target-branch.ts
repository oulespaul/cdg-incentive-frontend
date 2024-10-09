import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export interface MakeActionTargetBranchRequst {
    targetBranchIdList: number[];
    action: string;
    rejectReason?: string;
}

const makeActionTargetBranch = async (request: MakeActionTargetBranchRequst) => {
    const { data } = await apiClient.put(`target-branch/make-action`, request);
    return data;
};

interface UseMakeActionTargetBranchProps {
    onSuccess:
        | ((data: any, variables: MakeActionTargetBranchRequst, context: unknown) => Promise<unknown> | unknown)
        | undefined;
    onError:
        | ((error: Error, variables: MakeActionTargetBranchRequst, context: unknown) => Promise<unknown> | unknown)
        | undefined;
}

export const useMakeActionTargetBranch = ({ onSuccess, onError }: UseMakeActionTargetBranchProps) => {
    return useMutation({
        mutationFn: (request: MakeActionTargetBranchRequst) => makeActionTargetBranch(request),
        onSuccess,
        onError,
    });
};
