import {
    TargetCommissionDetailFilterParams,
    useFetchTargetCommissionDetail,
} from '@/features/target-commission/api/use-fetch-target-commission-detail';
import {
    useFetchTargetCommissionYearFilter,
    useFetchTargetCommissionMonthFilter,
} from '@/features/target-commission/api/use-fetch-target-commission-filters';
import { useCallback, useEffect, useState } from 'react';
import { useTargetBranchStore } from './use-target-branch-store';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import {
    TargetDeptRequest,
    TargetDMMRequest,
    TargetInhouseRequest,
    TargetSMMDSMRequest,
    useCreateTargetBranch,
} from './use-create-target-branch';
import { useFetchTargetBranchDetail } from './use-fetch-target-branch-detail';
import { useModalContext } from '@/app/providers/modal-provider';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';
import { TargetDMM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dmm-columns';

const initialFilterParams = {
    year: undefined,
    month: undefined,
};

export const useTargetBranchManage = () => {
    const [filterParams, setFilterParams] = useState<TargetCommissionDetailFilterParams>(initialFilterParams);
    const {
        currentBranchId,
        targetCommission,
        setTargetCommission,
        targetInHouseList,
        setTargetInHouseList,
        targetDeptList,
        setTargetDeptList,
        targetSMMDSMList,
        setTargetSMMDSMList,
        targetDMMList,
        setTargetDMMList,
        setTargetWorkflow,
        resetState,
        setIsTargetBranchLoading,
    } = useTargetBranchStore();

    const { data: yearFilterOptions } = useFetchTargetCommissionYearFilter({ branchId: currentBranchId });
    const { data: monthFilterOptions } = useFetchTargetCommissionMonthFilter({ branchId: currentBranchId });
    const { refetch: fetchTargetCommissionDetail } = useFetchTargetCommissionDetail({
        branchId: currentBranchId,
        ...filterParams,
    });

    const onFetchTargetBranchDetailSuccess = (targetBranchDetail: any) => {
        if (targetBranchDetail) {
            setTargetInHouseList(() => targetBranchDetail.targetInHouseList);
            setTargetDeptList(() => targetBranchDetail.targetDeptList);
            setTargetSMMDSMList(() => targetBranchDetail.targetSMMDSMList);
            setTargetDMMList(() => targetBranchDetail.targetDMMList);
            setTargetWorkflow({
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
        setIsTargetBranchLoading(false);
    };

    const { mutate: fetchTargetBranchDetail } = useFetchTargetBranchDetail({
        onSuccess: onFetchTargetBranchDetailSuccess,
    });

    const navigate = useNavigate();

    const onCreateTargetSuccess = (_data: any) => {
        toast.success(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-green-400">บันทึกข้อมูลเป้าสาขาสำเร็จ</p>
                <p className="mt-2 text-xs">บันทึกข้อมูลเป้าสาขาเรียบร้อย</p>
            </div>,
            { position: 'bottom-right' },
        );
        resetState();
        navigate('/app/target-branch');
    };

    const onCreateTargetError = () => {
        toast.error(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-ref-400">บันทึกข้อมูลเป้าสาขาไม่สำเร็จ</p>
                <p className="mt-2 text-xs">ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
            </div>,
            { position: 'bottom-right' },
        );
    };

    const { mutate: createTargetBranch } = useCreateTargetBranch({ onCreateTargetSuccess, onCreateTargetError });

    const { openModal, closeModal } = useModalContext();

    useEffect(() => {
        setTargetCommission(undefined);
        if (currentBranchId && filterParams.year && filterParams.month) {
            fetchTargetCommissionDetail().then(result => {
                setTargetInHouseList(() => []);
                setTargetDeptList(() => []);
                setTargetSMMDSMList(() => []);
                setTargetDMMList(() => []);
                setTargetWorkflow(undefined);

                if (result.data) {
                    setTargetCommission(result.data);
                    setIsTargetBranchLoading(true);
                    fetchTargetBranchDetail(result.data.id);
                }
            });
        }
    }, [currentBranchId, filterParams.year, filterParams.month, fetchTargetBranchDetail, setTargetCommission]);

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
            actualSalesIDLastYear: targetInhouse.actualSalesIDLastYear,
        };
    };

    const transformToTargetDeptRequestFormat = (targetDept: TargetDept): TargetDeptRequest => {
        return {
            groupDept: targetDept.groupDept,
            goalDept: targetDept.goalDept,
            actualSalesIDLastYear: targetDept.actualSalesIDLastYear,
            subDepartmentPool: targetDept?.subDepartmentPool?.map(sub => sub.id) ?? [],
        };
    };

    const transformToTargetSMMDSMListRequestFormat = (targetSMMDSM: TargetSMMDSM): TargetSMMDSMRequest => {
        return {
            smmId: targetSMMDSM.smmId,
            targetDSMList: targetSMMDSM.targetDSMList.map(targetDSM => ({
                dsmId: targetDSM.dsmId,
                departmentId: targetDSM.department?.id,
                subDepartmentId: targetDSM.subDepartment?.id,
                goalDept: targetDSM.goalDept,
                actualSalesLastYear: targetDSM.actualSalesLastYear,
                goalId: targetDSM.goalId,
                actualSalesIDLastYear: targetDSM.actualSalesIDLastYear,
            })),
        };
    };

    const transformToTargetDMMListRequestFormat = (targetDMM: TargetDMM): TargetDMMRequest => {
        return {
            dmmId: targetDMM.dmmId,
            departmentId: targetDMM.department?.id,
            subDepartmentId: targetDMM.subDepartment?.id,
            goalDept: targetDMM.goalDept,
            actualSalesLastYear: targetDMM.actualSalesLastYear,
            goalId: targetDMM.goalId,
            actualSalesIDLastYear: targetDMM.actualSalesIDLastYear,
        };
    };

    const onSaveTargetHandler = useCallback(() => {
        openModal({
            title: (
                <div className="flex items-center gap-2">
                    <InfoCircledIcon className="w-6 h-6" color="orange" /> <span>ยืนยันบันทึกเป้าสาขา ?</span>
                </div>
            ),
            content: 'บันทึกข้อมูลเป้าสาขา',
            showCancelButton: true,
            onConfirm: () => {
                createTargetBranch({
                    targetCommissionId: targetCommission?.id,
                    branchId: currentBranchId,
                    targetInHouseList: targetInHouseList.map(transformToRequestFormat),
                    targetDeptList: targetDeptList.map(transformToTargetDeptRequestFormat),
                    targetSMMDSMList: targetSMMDSMList.map(transformToTargetSMMDSMListRequestFormat),
                    targetDMMList: targetDMMList.map(transformToTargetDMMListRequestFormat),
                });
                closeModal();
            },
        });
    }, [
        JSON.stringify(targetInHouseList),
        JSON.stringify(targetDeptList),
        JSON.stringify(targetSMMDSMList),
        JSON.stringify(targetDMMList),
    ]);

    const onCancelTargetHandler = useCallback(() => {
        openModal({
            title: (
                <div className="flex items-center gap-2">
                    <InfoCircledIcon className="w-6 h-6" color="orange" /> <span>ต้องการบันทึกข้อมูลหรือไม่ ?</span>
                </div>
            ),
            content: 'หากยกเลิกการสร้าง Target โดยไม่บันทึกข้อมูล ข้อมูลบางส่วนอาจสูญหาย',
            showCancelButton: true,
            showSecondaryActionButton: true,
            secondaryActionButtonTitle: 'ไม่บันทึก',
            onConfirm: () => {
                createTargetBranch({
                    targetCommissionId: targetCommission?.id,
                    branchId: currentBranchId,
                    targetInHouseList: targetInHouseList.map(transformToRequestFormat),
                    targetDeptList: targetDeptList.map(transformToTargetDeptRequestFormat),
                    targetSMMDSMList: targetSMMDSMList.map(transformToTargetSMMDSMListRequestFormat),
                    targetDMMList: targetDMMList.map(transformToTargetDMMListRequestFormat),
                });
                resetState();
                closeModal();
            },
            onSecondaryActionClick: () => {
                resetState();
                closeModal();
                navigate('/app/target-branch');
            },
        });
    }, [
        JSON.stringify(targetInHouseList),
        JSON.stringify(targetDeptList),
        JSON.stringify(targetSMMDSMList),
        JSON.stringify(targetDMMList),
    ]);

    return {
        filterParams,
        yearFilterOptions,
        monthFilterOptions,
        targetCommission,
        onFilterSelectHandler,
        onSaveTargetHandler,
        onCancelTargetHandler,
    };
};
