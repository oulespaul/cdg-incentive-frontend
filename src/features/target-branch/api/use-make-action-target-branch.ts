import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

interface MakeActionTargetBranchRequst {
    targetBranchId: number;
    action: string;
}

const makeActionTargetBranch = async (targetBranchId: number, action: string) => {
    const { data } = await apiClient.put(`target-branch/make-action/${targetBranchId}/${action}`);
    return data;
};

interface UseMakeActionTargetBranchProps {
    onSuccess: () => void;
    onError: () => void;
}

export const useMakeActionTargetBranch = ({ onSuccess, onError }: UseMakeActionTargetBranchProps) => {
    return useMutation({
        mutationFn: (request: MakeActionTargetBranchRequst) =>
            makeActionTargetBranch(request.targetBranchId, request.action),
        onSuccess,
        onError,
    });
};
