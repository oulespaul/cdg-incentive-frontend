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
import { useModalContext } from '@/app/providers/modal-provider';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const onCreateTargetSuccess = (_data: any) => {
        toast.success(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-green-400">บันทึกข้อมูลเป้าสาขาสำเร็จ</p>
                <p className="mt-2 text-xs">บันทึกข้อมูลเป้าสาขาเรียบร้อย</p>
            </div>,
            { position: 'bottom-right' },
        );
        setTargetInHouseList(() => []);
        setTargetCommission(undefined);
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
            actualSalesIDLastYear: targetInhouse.actualSalesIDLastYear,
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
                });
                closeModal();
            },
        });
    }, [JSON.stringify(targetInHouseList)]);

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
                });
                setTargetInHouseList(() => []);
                setTargetCommission(undefined);
                closeModal();
            },
            onSecondaryActionClick: () => {
                setTargetInHouseList(() => []);
                setTargetCommission(undefined);
                closeModal();
                navigate('/app/target-branch');
            },
        });
    }, [JSON.stringify(targetInHouseList)]);

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
