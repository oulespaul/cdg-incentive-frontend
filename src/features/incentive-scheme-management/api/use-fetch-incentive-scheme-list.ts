import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { Page } from '@/models/pagination-response';
import { IncentiveScheme } from '@/types/api';

export interface IncentiveSchemeFilterParams {
    schemeKey?: string;
    schemeName?: string;
}

export const incentiveSchemeInitialFilterParams = {
    schemeKey: '',
    schemeName: '',
};

const fetchIncentiveSchemeList = async (filterParams: IncentiveSchemeFilterParams & PaginationState) => {
    const params = new URLSearchParams({
        page: filterParams.pageIndex.toString(),
        pageSize: filterParams.pageSize.toString(),
        ...(filterParams.schemeKey && { schemeKey: filterParams.schemeKey }),
        ...(filterParams.schemeName && { schemeName: filterParams.schemeName }),
    });

    return await apiClient.get(`/incentive-scheme?${params}`);
};

export const useFetchIncentiveSchemeList = (filterParams: IncentiveSchemeFilterParams & PaginationState) => {
    return useQuery<Page<IncentiveScheme>, unknown>({
        queryFn: async () => {
            const { data } = await fetchIncentiveSchemeList(filterParams);
            return data;
        },
        queryKey: ['incentive-scheme', filterParams.pageIndex, filterParams.pageSize],
    });
};
