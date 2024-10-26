import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { IncentiveSegment } from '@/types/api';

const fetchIncentiveSegmentActive = async () => {
    return await apiClient.get("/incentive-segment/active");
};

export const useFetchIncentiveSegmentActive = () => {
    return useQuery<IncentiveSegment[], unknown>({
        queryFn: async () => {
            const { data } = await fetchIncentiveSegmentActive();
            return data;
        },
        queryKey: ['incentive-segment-active'],
    });
};
