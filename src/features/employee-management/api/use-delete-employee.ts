import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteEmployeeById = async (employeeId: number) => {
    const { data } = await apiClient.delete(`employee/${employeeId}`);
    return data;
};

export const useDeleteEmployeeById = (mutationConfig: MutationConfig<typeof deleteEmployeeById>) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: (employeeId: number) => deleteEmployeeById(employeeId),
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: ['employee'],
            });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
