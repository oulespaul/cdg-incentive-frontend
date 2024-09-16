import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePagination } from '@/hooks/use-pagination';
import { useFetchTargetCommission } from '@/features/target-commission/hooks/use-fetch-target-commission';
import {
    useFetchTargetCommissionMonthFilter,
    useFetchTargetCommissionYearFilter,
} from '@/features/target-commission/hooks/use-fetch-target-commission-filters';
import { FilterParams } from '@/features/target-commission/models/target-commission-filter-params';
import FilterSelect from '@/components/select';
import { TargetBranchTabs } from '@/features/target-branch/components/TargetBranchTabs';
import { useNavigate } from 'react-router-dom';

const initialFilterParams = {
    year: undefined,
    month: undefined,
};

export const TargetBranchManagePage = () => {
    const [filterParams, setFilterParams] = useState<FilterParams>(initialFilterParams);
    const navigate = useNavigate();

    const { pagination } = usePagination();
    const { refetch: refetchTargetCommission } = useFetchTargetCommission({
        ...filterParams,
        ...pagination,
    });

    const { data: yearFilterOptions } = useFetchTargetCommissionYearFilter();
    const { data: monthFilterOptions } = useFetchTargetCommissionMonthFilter();

    useEffect(() => {
        refetchTargetCommission();
    }, [pagination.pageIndex, pagination.pageSize, refetchTargetCommission]);

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">จัดการเป้าสาขา</h1>
                <h2 className="text-xl font-medium">สาขา: 10102 - Chidlom</h2>
            </div>

            <div className="flex mt-2">
                <div className="flex gap-2 w-1/3">
                    <FilterSelect
                        value={filterParams.year}
                        options={yearFilterOptions}
                        placeholder="ปี"
                        onChange={value => onFilterSelectHandler('year', value)}
                    />
                    <FilterSelect
                        value={filterParams.month}
                        options={monthFilterOptions}
                        placeholder="เดือน"
                        onChange={value => onFilterSelectHandler('month', value)}
                    />
                </div>
                <div className="flex w-1/3">
                    <p className="text-lg font-medium text-end self-center ml-2">
                        เป้า commission (เป้าสาขา): <span className="text-blue-500">65,000,000 บาท</span>
                    </p>
                </div>
                <div className="flex w-1/3 gap-3 justify-end">
                    <Button variant="outline" onClick={() => navigate('/app/target-branch')}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary">บันทึก</Button>
                    <Button variant="success">ส่งคำขออนุมัติ</Button>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                    <div className="flex flex-col">
                        <TargetBranchTabs />
                    </div>
                </div>
                <div className="">
                    <Card className="p-4 text-start">
                        <h1 className="text-lg font-medium mb-4">รายการข้อมูลเป้าสาขา</h1>
                    </Card>
                </div>
            </div>
        </div>
    );
};
