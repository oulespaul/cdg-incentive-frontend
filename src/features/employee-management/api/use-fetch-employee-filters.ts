import { apiClient } from '@/lib/api-client';
import { getThaiMonthName } from '@/lib/month-utils';
import { FilterOption } from '@/models/filter-option';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

const fetchEmployeeFilter = async (key: string) => {
    return await apiClient.get(`/employee/filter/${key}`);
};

export const useFetchEmployeeFilter = (key: string) => {
    return useQuery<FilterOption[], unknown>({
        queryFn: async () => {
            const { data } = await fetchEmployeeFilter(key);
            return data;
        },
        queryKey: ['employee/filter', key],
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
