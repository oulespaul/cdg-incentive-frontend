import { apiClient } from '@/lib/api-client';
import { getThaiMonthName } from '@/lib/month-utils';
import { FilterOption } from '@/models/filter-option';
import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import _ from 'lodash';

interface TargetCommissionYearFilterParams {
    branchId?: number;
}

const fetchTargetCommissionFilter = async (key: string, params?: TargetCommissionYearFilterParams) => {
    const config: AxiosRequestConfig = {
        params,
    };
    return await apiClient.get(`/target-commission/filter/${key}`, config);
};

export const useFetchTargetCommissionFilter = (key: string, params?: TargetCommissionYearFilterParams) => {
    return useQuery<FilterOption[], unknown>({
        queryFn: async () => {
            const { data } = await fetchTargetCommissionFilter(key, params);
            return data;
        },
        queryKey: ['target-commission/filter', key],
        select: data => {
            if (key === 'month') {
                return _.sortBy(
                    _.map(data, d => ({
                        label: getThaiMonthName(d.label),
                        value: d.value,
                    })),
                    'value',
                );
            }
            return data;
        },
    });
};
