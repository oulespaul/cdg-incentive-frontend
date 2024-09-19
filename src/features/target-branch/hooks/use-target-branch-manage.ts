import {
    TargetCommissionDetailFilterParams,
    useFetchTargetCommissionDetail,
} from '@/features/target-commission/hooks/use-fetch-target-commission-detail';
import {
    useFetchTargetCommissionYearFilter,
    useFetchTargetCommissionMonthFilter,
} from '@/features/target-commission/hooks/use-fetch-target-commission-filters';
import { useCallback, useEffect, useState } from 'react';
import { useTargetBranchStore } from './use-target-branch-store';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetInhouseRequest, useCreateTargetBranch } from './use-create-target-branch';
import { useFetchTargetBranchDetail } from './use-fetch-target-branch-detail';

const initialFilterParams = {
    year: undefined,
    month: undefined,
};

export const useTargetBranchManage = () => {
    const [filterParams, setFilterParams] = useState<TargetCommissionDetailFilterParams>(initialFilterParams);
    const { currentBranchId, targetCommission, setTargetCommission, targetInHouseList, setTargetInHouseList } =
        useTargetBranchStore();

    const { data: yearFilterOptions } = useFetchTargetCommissionYearFilter({ branchId: currentBranchId });
    const { data: monthFilterOptions } = useFetchTargetCommissionMonthFilter({ branchId: currentBranchId });

    const { refetch: fetchTargetCommissionDetail } = useFetchTargetCommissionDetail({
        branchId: currentBranchId,
        ...filterParams,
    });

    const { refetch: fetchTargetBranchDetail } = useFetchTargetBranchDetail(targetCommission?.id);

    const { mutate: createTargetBranch } = useCreateTargetBranch();

    useEffect(() => {
        setTargetCommission(undefined);
        if (currentBranchId && filterParams.year && filterParams.month) {
            fetchTargetCommissionDetail().then(result => {
                if (result.data) {
                    setTargetCommission(result.data);
                }
            });
        }
    }, [currentBranchId, filterParams.year, filterParams.month, fetchTargetBranchDetail, setTargetCommission]);

    useEffect(() => {
        setTargetInHouseList(() => []);
        if (targetCommission?.id) {
            fetchTargetBranchDetail().then(result => {
                if (result.data && result.data.targetInHouseList?.length > 0) {
                    setTargetInHouseList(() => result.data.targetInHouseList);
                }
            });
        }
    }, [targetCommission?.id]);

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const transformToRequestFormat = (targetInhouse: TargetInHouse): TargetInhouseRequest => {
        return {
            brandId: targetInhouse.brandId,
            groupBrand: targetInhouse.groupBrand,
            goalBrand: targetInhouse.goalBrand,
        };
    };

    const onSaveTargetHandler = useCallback(() => {
        createTargetBranch({
            targetCommissionId: targetCommission?.id,
            branchId: currentBranchId,
            targetInHouseList: targetInHouseList.map(transformToRequestFormat),
        });
    }, [JSON.stringify(targetInHouseList)]);

    return {
        filterParams,
        yearFilterOptions,
        monthFilterOptions,
        targetCommission,
        onFilterSelectHandler,
        onSaveTargetHandler,
    };
};
