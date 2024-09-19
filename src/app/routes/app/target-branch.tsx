import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePagination } from '@/hooks/use-pagination';
import {
    useFetchTargetCommissionMonthFilter,
    useFetchTargetCommissionYearFilter,
} from '@/features/target-commission/hooks/use-fetch-target-commission-filters';
import FilterSelect from '@/components/select';
import { targetBranchColumns } from '@/features/target-branch/constants/target-branch-columns';
import { useNavigate } from 'react-router-dom';
import {
    TargetBranchFilterParams,
    useFetchTargetBranchDetailList,
} from '@/features/target-branch/hooks/use-fetch-target-branch-detail-list';

const initialFilterParams = {
    year: undefined,
    month: undefined,
};

export const TargetBranchPage = () => {
    const [filterParams, setFilterParams] = useState<TargetBranchFilterParams>(initialFilterParams);
    const navigate = useNavigate();

    const { onPaginationChange, resetPaginationState, pagination } = usePagination();
    const { data: targetBranchData, refetch: refetchTargetBranch } = useFetchTargetBranchDetailList({
        ...filterParams,
        ...pagination,
    });

    const { data: yearFilterOptions } = useFetchTargetCommissionYearFilter();
    const { data: monthFilterOptions } = useFetchTargetCommissionMonthFilter();

    useEffect(() => {
        refetchTargetBranch();
    }, [pagination.pageIndex, pagination.pageSize, refetchTargetBranch]);

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const onClearFilterHandler = useCallback(() => {
        resetPaginationState();
        setFilterParams(initialFilterParams);
    }, [resetPaginationState]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">จัดการเป้าสาขา</h1>
                <h2 className="text-xl font-medium">สาขา: 10102 - Chidlom</h2>
            </div>

            <div className="flex flex-col mt-4">
                <div className="flex">
                    <div className="flex w-1/2 gap-3">
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

                    <div className="flex w-1/2 justify-end">
                        <Button
                            className="bg-gradient-to-l from-cyan-500 to-blue-500"
                            onClick={() => navigate('/app/target-branch/create')}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            สร้าง Target
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button
                    variant="outline"
                    className="text-primary hover:text-primary"
                    onClick={() => refetchTargetBranch()}
                >
                    <Search className="mr-2 h-4 w-4" />
                    ค้นหา
                </Button>
                <Button
                    variant="ghost"
                    className="text-primary hover:text-primary"
                    onClick={() => onClearFilterHandler()}
                >
                    ล้างตัวกรอง
                </Button>
            </div>

            <Separator className="my-4" />

            <Card className="p-4 text-start">
                <h1 className="text-lg font-medium mb-4">รายการข้อมูลเป้าสาขา</h1>
                <DataTable
                    columns={targetBranchColumns}
                    data={
                        targetBranchData?.content?.map((target, index) => ({
                            ...target,
                            id: index + 1,
                        })) ?? []
                    }
                    onPaginationChange={onPaginationChange}
                    pageCount={targetBranchData?.totalElements ?? 0}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};
