import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const duplicateEmployeeId = async (employeeId: number) => {
    const response = await apiClient.post(`/employee/duplicate/${employeeId}`);
    return response.data;
};

export const useDuplicateEmployeeId = (mutationConfig: MutationConfig<typeof duplicateEmployeeId>) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: duplicateEmployeeId,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: ['employee'],
            });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
