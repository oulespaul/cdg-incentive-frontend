import { apiClient } from '@/lib/api-client';
import { FilterOption } from '@/models/filter-option';
import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

interface TargetCommissionYearFilterParams {
    branchId?: number;
}

interface TargetCommissionMonthFilterParams extends TargetCommissionYearFilterParams {}

const fetchTargetCommissionFilter = async (key: string, params?: TargetCommissionYearFilterParams) => {
    const config: AxiosRequestConfig = {
        params,
    };
    return await apiClient.get(`/target-commission/filter/${key}`, config);
};

export const useFetchTargetCommissionYearFilter = (params?: TargetCommissionYearFilterParams) => {
    return useQuery<FilterOption[], unknown>({
        queryFn: async () => {
            const { data } = await fetchTargetCommissionFilter('year', params);
            return data;
        },
        queryKey: ['target-commission/filter/year'],
    });
};

export const useFetchTargetCommissionMonthFilter = (params?: TargetCommissionMonthFilterParams) => {
    return useQuery<FilterOption[], unknown>({
        queryFn: async () => {
            const { data } = await fetchTargetCommissionFilter('month', params);
            return data;
        },
        queryKey: ['target-commission/filter/month'],
    });
};

export const useFetchTargetCommissionBranchFilter = () => {
    return useQuery<FilterOption[], unknown>({
        queryFn: async () => {
            const { data } = await fetchTargetCommissionFilter('branch');
            return data;
        },
        queryKey: ['target-commission/filter/branch'],
    });
};
