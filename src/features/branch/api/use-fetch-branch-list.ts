import { apiClient } from '@/lib/api-client';
import { Branch } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const fetchBranchList = async () => {
    return await apiClient.get(`/branch`);
};

type UseFetchBrandOptions = {
    queryConfig?: { enabled?: boolean };
};

export const useFetchBranchList = ({ queryConfig }: UseFetchBrandOptions = {}) => {
    return useQuery<Branch[], unknown>({
        queryFn: async () => {
            const { data } = await fetchBranchList();
            return data;
        },
        queryKey: ['branch'],
        ...queryConfig,
    });
};
