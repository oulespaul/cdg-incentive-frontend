import {
    TargetCommissionDetailFilterParams,
    useFetchTargetCommissionDetail,
} from '@/features/target-commission/api/use-fetch-target-commission-detail';
import {
    useFetchTargetCommissionYearFilter,
    useFetchTargetCommissionMonthFilter,
} from '@/features/target-commission/api/use-fetch-target-commission-filters';
import { useCallback, useEffect, useState } from 'react';
import { useTargetBranchStore } from '../api/use-target-branch-store';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import {
    TargetDeptRequest,
    TargetDMMRequest,
    TargetInhouseRequest,
    TargetSMMDSMRequest,
    useCreateTargetBranch,
} from '../api/use-create-target-branch';
import { useFetchTargetBranchDetail } from '../api/use-fetch-target-branch-detail-by-target-commission-id';
import { useModalContext } from '@/app/providers/modal-provider';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';
import { TargetDMM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dmm-columns';
import _ from 'lodash';
import { useFetchTargetBranchDetailList } from '../api/use-fetch-target-branch-detail-list';
import { useDeleteTargetBranch } from '../api/use-delete-target-branch';
import { useMakeActionTargetBranch } from '../api/use-make-action-target-branch';

export const useTargetBranchManage = () => {
    const { year, month, mode } = useParams();
    const [filterParams, setFilterParams] = useState<TargetCommissionDetailFilterParams>({ year, month });
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
            setTargetSMMDSMList(() => {
                if (targetBranchDetail.targetSMMDSMList.length === 0) {
                    return [
                        {
                            id: undefined,
                            smmId: '',
                            targetDSMList: [],
                        },
                    ];
                }

                return targetBranchDetail.targetSMMDSMList;
            });
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
        setIsTargetBranchLoading(false);
    };

    const { refetch: refetchTargetBranch } = useFetchTargetBranchDetailList();
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

    const onDeleteTargetBranchSuccess = () => {
        toast.success(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-green-400">ลบข้อมูลสำเร็จ</p>
                <p className="mt-2 text-xs">ลบข้อมูลเป้าสาขาเรียบร้อย</p>
            </div>,
            { position: 'bottom-right' },
        );
        refetchTargetBranch();
    };

    const onDeleteTargetBranchError = () => {
        toast.error(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-ref-400">ลบข้อมูลไม่สำเร็จ</p>
                <p className="mt-2 text-xs">ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
            </div>,
            { position: 'bottom-right' },
        );
    };

    const { mutate: deleteTargetBranch } = useDeleteTargetBranch({
        onSuccess: onDeleteTargetBranchSuccess,
        onError: onDeleteTargetBranchError,
    });

    const onMakeActionTargetBranchSuccess = () => {
        toast.success(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-green-400">ส่งคำขออนุมติสำเร็จ</p>
                <p className="mt-2 text-xs">ส่งคำขออนุมติเป้าสาขาเรียบร้อย</p>
            </div>,
            { position: 'bottom-right' },
        );
        refetchTargetBranch();
    };

    const onMakeActionTargetBranchError = () => {
        toast.error(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-ref-400">ไม่สามารถส่งคำขออนุมติ</p>
                <p className="mt-2 text-xs">กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่งคำขออนุมัติ</p>
            </div>,
            { position: 'bottom-right' },
        );
    };

    const { mutate: makeActionTargetBranch } = useMakeActionTargetBranch({
        onSuccess: onMakeActionTargetBranchSuccess,
        onError: onMakeActionTargetBranchError,
    });

    const { openModal, closeModal } = useModalContext();

    useEffect(() => {
        setTargetCommission(undefined);
        if (currentBranchId && filterParams.year && filterParams.month) {
            fetchTargetCommissionDetail().then(result => {
                setTargetInHouseList(() => []);
                setTargetDeptList(() => []);
                setTargetSMMDSMList(() => [
                    {
                        id: undefined,
                        smmId: '',
                        targetDSMList: [],
                    },
                ]);
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

    const deleteTargetBranchHandler = (targetbranchId: number) => {
        openModal({
            title: (
                <div className="flex items-center gap-2">
                    <InfoCircledIcon className="w-6 h-6" color="orange" /> <span>ยืนยันลบเป้าสาขา ?</span>
                </div>
            ),
            content: 'เมื่อลบข้อมูลเป้าหมาย จะไม่สามารถกู้คืนได้',
            confirmTitle: 'ใช่, ลบ',
            confirmClassName: 'bg-red-500',
            showCancelButton: true,
            onConfirm: () => {
                deleteTargetBranch(targetbranchId);
                closeModal();
                navigate('/app/target-branch');
            },
        });
    };

    const makeActionTargetBranchHandler = (targetBranchId: number, action: string) => {
        openModal({
            title: (
                <div className="flex items-center gap-2">
                    <InfoCircledIcon className="w-6 h-6" color="orange" /> <span>ยืนยันการอนุมัติข้อมูล</span>
                </div>
            ),
            content: 'บันทึกข้อมูลและส่งคำขออนุมัติสาขา',
            showCancelButton: true,
            onConfirm: () => {
                makeActionTargetBranch({ targetBranchId, action });
                closeModal();
                navigate('/app/target-branch');
            },
        });
    };

    return {
        filterParams,
        yearFilterOptions,
        monthFilterOptions,
        targetCommission,
        onFilterSelectHandler,
        onSaveTargetHandler,
        onCancelTargetHandler,
        deleteTargetBranchHandler,
        makeActionTargetBranchHandler,
        isEditMode: mode === 'edit',
        isViewMode: mode === 'view',
    };
};
