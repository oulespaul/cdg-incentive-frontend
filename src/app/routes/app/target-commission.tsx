import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePagination } from '@/hooks/use-pagination';
import {
    TargetCommissionFilterParams,
    useFetchTargetCommission,
} from '@/features/target-commission/api/use-fetch-target-commission';
import {
    useFetchTargetCommissionMonthFilter,
    useFetchTargetCommissionBranchFilter,
    useFetchTargetCommissionYearFilter,
} from '@/features/target-commission/api/use-fetch-target-commission-filters';
import UploadFile from '@/features/target-commission/components/upload-file-button';
import FilterSelect from '@/components/select';
import { targetCommissionColumns } from '@/features/target-commission/constants/target-commission-columns';

const initialFilterParams = {
    year: undefined,
    month: undefined,
    branchNumber: undefined,
    branchCode: '',
    branchBU: '',
};

export const TargetCommissionPage = () => {
    const [filterParams, setFilterParams] = useState<TargetCommissionFilterParams>(initialFilterParams);
    const { onPaginationChange, resetPaginationState, pagination } = usePagination();
    const { data: targetCommissionData, refetch: refetchTargetCommission } = useFetchTargetCommission({
        ...filterParams,
        ...pagination,
    });

    const { data: yearFilterOptions } = useFetchTargetCommissionYearFilter();
    const { data: monthFilterOptions } = useFetchTargetCommissionMonthFilter();
    const { data: branchFilterOptions } = useFetchTargetCommissionBranchFilter();

    useEffect(() => {
        refetchTargetCommission();
    }, [pagination.pageIndex, pagination.pageSize, refetchTargetCommission]);

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams((prevFilters: TargetCommissionFilterParams) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const onFilterValueChangeHandler = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFilterParams((prevFilters: TargetCommissionFilterParams) => ({
            ...prevFilters,
            [key]: event.target.value,
        }));
    };

    const onClearFilterHandler = useCallback(() => {
        resetPaginationState();
        setFilterParams(initialFilterParams);
    }, [resetPaginationState]);

    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">นำเข้าเป้า commission (เป้าสาขา)</h1>
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
                        <FilterSelect
                            value={filterParams.branchNumber}
                            options={branchFilterOptions}
                            placeholder="สาขา"
                            onChange={value => onFilterSelectHandler('branchNumber', value)}
                        />
                    </div>

                    <div className="flex w-1/2 justify-end">
                        <UploadFile />
                    </div>
                </div>

                <div className="flex w-1/2 gap-2 mt-2">
                    <Input
                        type="text"
                        placeholder="Business Unit"
                        value={filterParams.branchBU}
                        onChange={event => onFilterValueChangeHandler('branchBU', event)}
                    />

                    <Input
                        type="text"
                        placeholder="Branch Code"
                        value={filterParams.branchCode}
                        onChange={event => onFilterValueChangeHandler('branchCode', event)}
                    />
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button
                    variant="outline"
                    className="text-primary hover:text-primary"
                    onClick={() => refetchTargetCommission()}
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
                <h1 className="text-lg font-medium mb-4">รายการข้อมูลเป้า commission (เป้าสาขา)</h1>
                <DataTable
                    columns={targetCommissionColumns}
                    data={targetCommissionData?.content?.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                    onPaginationChange={onPaginationChange}
                    pageCount={targetCommissionData?.totalElements ?? 0}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};
