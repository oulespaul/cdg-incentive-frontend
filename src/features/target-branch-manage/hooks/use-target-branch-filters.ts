import { useState } from 'react';
import { TargetCommissionDetailFilterParams } from '@/features/target-commission/api/use-fetch-target-commission-detail';

interface UseTargetBranchFiltersProps {
    year: string | undefined;
    month: string | undefined;
}

export const useTargetBranchFilters = ({ year, month }: UseTargetBranchFiltersProps) => {
    const [filterParams, setFilterParams] = useState<TargetCommissionDetailFilterParams>({ year, month });

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    return {
        filterParams,
        onFilterSelectHandler,
    };
};
