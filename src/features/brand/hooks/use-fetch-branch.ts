import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Brand } from '../models/brand';

const fetchBrandList = async () => {
    return await apiClient.get(`/brand`);
};

export const useFetchBrand = () => {
    return useQuery<Brand[], unknown>({
        queryFn: async () => {
            const { data } = await fetchBrandList();
            return data;
        },
        queryKey: ['brand'],
    });
};
