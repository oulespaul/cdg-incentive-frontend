import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

const deleteTargetBranch = async (targetBranch: number) => {
    const { data } = await apiClient.delete(`target-branch/${targetBranch}`);
    return data;
};

interface UseDeleteTargetBranchProps {
    onSuccess: () => void;
    onError: () => void;
}

export const useDeleteTargetBranch = ({ onSuccess, onError }: UseDeleteTargetBranchProps) => {
    return useMutation({
        mutationFn: (targetBranch: number) => deleteTargetBranch(targetBranch),
        onSuccess,
        onError,
    });
};
