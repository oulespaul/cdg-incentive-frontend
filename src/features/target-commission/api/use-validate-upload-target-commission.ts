import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { TargetCommission } from '../models/target-commission-response';

const validateUploadFile = async (file: File): Promise<AxiosResponse<TargetCommission[], FormData>> => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.post('/target-commission/upload/validate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const useValidatedTargetCommissionUploadFile = (mutationConfig: MutationConfig<typeof validateUploadFile>) => {
    return useMutation({
        mutationFn: validateUploadFile,
        ...mutationConfig,
    });
};
