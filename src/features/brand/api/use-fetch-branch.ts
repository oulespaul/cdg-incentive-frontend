import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Brand } from '../models/brand';

const fetchBrandList = async () => {
    return await apiClient.get(`/brand`);
};

type UseFetchBrandOptions = {
    queryConfig?: { enabled?: boolean };
};

export const useFetchBrand = ({ queryConfig }: UseFetchBrandOptions = {}) => {
    return useQuery<Brand[], unknown>({
        queryFn: async () => {
            const { data } = await fetchBrandList();
            return data;
        },
        queryKey: ['brand'],
        ...queryConfig,
    });
};
