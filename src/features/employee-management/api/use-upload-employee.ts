import { apiClient } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MutationConfig } from '@/lib/react-query';

const uploadFile = async (file: File): Promise<AxiosResponse<string, FormData>> => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.post('/employee/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const useUploadEmployeeFile = (mutationConfig: MutationConfig<typeof uploadFile>) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: uploadFile,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: ['employee'],
            });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
