import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

const deleteTargetBranch = async (targetBranch: number) => {
    const { data } = await apiClient.delete(`target-branch/${targetBranch}`);
    return data;
};

export const useDeleteTargetBranch = (mutationConfig: MutationConfig<typeof deleteTargetBranch>) => {
    return useMutation({
        mutationFn: (targetBranch: number) => deleteTargetBranch(targetBranch),
        ...mutationConfig,
    });
};
