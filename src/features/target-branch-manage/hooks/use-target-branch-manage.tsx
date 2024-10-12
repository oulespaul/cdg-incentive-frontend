import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTargetBranchStore } from './use-target-branch-store';
import { useUser } from '@/app/contexts/user-context';
import { useFetchTargetCommissionDetail } from '@/features/target-commission/api/use-fetch-target-commission-detail';
import { useFetchTargetBranchDetail } from '../api/use-fetch-target-branch-detail-by-target-commission-id';
import { useTargetBranchFilters } from './use-target-branch-filters';

export const useTargetBranchManage = () => {
    const { year, month, mode } = useParams();
    const isEditMode = mode === 'edit';
    const isViewMode = mode === 'view';

    const { user } = useUser();
    const userBranchId = user?.branch?.id;

    const {
        targetCommission,
        setTargetCommission,
        setTargetInHouseList,
        setTargetDeptList,
        setTargetSMMDSMList,
        setTargetDMMList,
        setTargetWorkflow,
        resetState,
    } = useTargetBranchStore();

    const { filterParams, onFilterSelectHandler } = useTargetBranchFilters({ year, month });

    const { refetch: fetchTargetCommissionDetail } = useFetchTargetCommissionDetail({
        branchId: userBranchId,
        ...filterParams,
    });

    const { mutate: fetchTargetBranchDetail } = useFetchTargetBranchDetail({
        onSuccess: useCallback(
            (targetBranchDetail: any) => {
                if (targetBranchDetail) {
                    setTargetInHouseList(() => targetBranchDetail.targetInHouseList);
                    setTargetDeptList(() => targetBranchDetail.targetDeptList);
                    setTargetSMMDSMList(() =>
                        targetBranchDetail.targetSMMDSMList.length === 0
                            ? [{ id: undefined, smmId: '', targetDSMList: [] }]
                            : targetBranchDetail.targetSMMDSMList,
                    );
                    setTargetDMMList(() => targetBranchDetail.targetDMMList);
                    setTargetWorkflow({
                        id: targetBranchDetail.id,
                        status: targetBranchDetail.status,
                        requestedAt: targetBranchDetail.requestedAt,
                        requestedBy: targetBranchDetail.requestedBy,
                        approvedAt: targetBranchDetail.approvedAt,
                        approvedBy: targetBranchDetail.approvedBy,
                        rejectedAt: targetBranchDetail.rejectedAt,
                        rejectedBy: targetBranchDetail.rejectedBy,
                        rejectedReason: targetBranchDetail.rejectedReason,
                        calculatedAt: targetBranchDetail.calculatedAt,
                        calculatedBy: targetBranchDetail.calculatedBy,
                        createdAt: targetBranchDetail.createdAt,
                        createdBy: targetBranchDetail.createdBy,
                    });
                }
            },
            [setTargetInHouseList, setTargetDeptList, setTargetSMMDSMList, setTargetDMMList, setTargetWorkflow],
        ),
    });

    useEffect(() => {
        resetState();
        if (userBranchId && filterParams.year && filterParams.month) {
            fetchTargetCommissionDetail().then(result => {
                if (result.data) {
                    setTargetCommission(result.data);
                    fetchTargetBranchDetail(result.data.id);
                }
            });
        }
    }, [
        userBranchId,
        filterParams.year,
        filterParams.month,
        isEditMode,
        isViewMode,
        fetchTargetCommissionDetail,
        setTargetCommission,
        fetchTargetBranchDetail,
        resetState,
    ]);

    return {
        userBranchId,
        filterParams,
        targetCommission,
        onFilterSelectHandler,
        isEditMode,
        isViewMode,
    };
};
