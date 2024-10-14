import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Employee } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const validateUploadFile = async (file: File): Promise<AxiosResponse<Employee[], FormData>> => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.post('/employee/upload/validate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const useValidatedEmployeeUploadFile = (mutationConfig: MutationConfig<typeof validateUploadFile>) => {
    return useMutation({
        mutationFn: validateUploadFile,
        ...mutationConfig,
    });
};
