import { WorkflowStatus } from '@/constants/workflow-status';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export interface MakeActionTargetBranchRequst {
    targetBranchIdList: number[];
    action: WorkflowStatus;
    rejectReason?: string;
}

const makeActionTargetBranch = async (request: MakeActionTargetBranchRequst) => {
    const { data } = await apiClient.put(`target-branch/make-action`, request);
    return data;
};

export const useMakeActionTargetBranch = (mutationConfig: MutationConfig<typeof makeActionTargetBranch>) => {
    return useMutation({
        mutationFn: (request: MakeActionTargetBranchRequst) => makeActionTargetBranch(request),
        ...mutationConfig,
    });
};
