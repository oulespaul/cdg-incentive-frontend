import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Employee } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const updateEmployeeInputSchema = z.object({
    employeeId: z.string().min(1, 'Required'),
    newCostCenter: z.string().min(1, 'Required'),
    costCenter: z.string().min(1, 'Required'),
    employeeGroup: z.string().min(1, 'Required'),
    businessUnit: z.string().min(1, 'Required'),
    positionDescription: z.string().min(1, 'Required'),
    scheme: z.string().optional(),
    brandId: z.string().optional(),
    corporateTitle: z.string().min(1, 'Required'),
    branchNo: z.string().min(1, 'Required'),
    terminatedDate: z.string().optional(),
    hireDate: z.string().min(1, 'Required'),
    dayWorking: z.number(),
});

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeInputSchema>;

export const updateEmployee = ({ id, data }: { id: number; data: UpdateEmployeeInput }): Promise<Employee> => {
    return apiClient.put(`/employee/${id}`, data);
};

export const useUpdateEmployee = (mutationConfig: MutationConfig<typeof updateEmployee>) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: updateEmployee,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: ['employee'],
            });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
