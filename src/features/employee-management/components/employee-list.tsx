import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePagination } from '@/hooks/use-pagination';
import FilterSelect from '@/components/select';
import UploadEmployeeInput from './upload-employee-input';
import { employeeManagementList } from '../constants/employee-list-columns';
import {
    EmployeeFilterParams,
    employeeInitialFilterParams,
    useFetchEmployeeList,
} from '../api/use-fetch-employee-list';
import { useFetchEmployeeFilter } from '../api/use-fetch-employee-filters';

export const EmployeeList = () => {
    const [filterParams, setFilterParams] = useState<EmployeeFilterParams>(employeeInitialFilterParams);
    const { onPaginationChange, resetPaginationState, pagination } = usePagination();
    const { data: employeeListData, refetch: refetchEmployeeList } = useFetchEmployeeList({
        ...filterParams,
        ...pagination,
    });

    const { data: yearFilterOptions } = useFetchEmployeeFilter('year');
    const { data: monthFilterOptions } = useFetchEmployeeFilter('month');

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams((prevFilters: EmployeeFilterParams) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const onFilterValueChangeHandler = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFilterParams((prevFilters: EmployeeFilterParams) => ({
            ...prevFilters,
            [key]: event.target.value,
        }));
    };

    const onClearFilterHandler = useCallback(() => {
        resetPaginationState();
        setFilterParams(employeeInitialFilterParams);
    }, [resetPaginationState]);

    return (
        <div className="flex flex-col">
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
                        <Input
                            type="text"
                            placeholder="รหัสพนักงาน"
                            value={filterParams.employeeId}
                            onChange={event => onFilterValueChangeHandler('employeeId', event)}
                        />
                    </div>

                    <div className="flex w-1/2 justify-end">
                        <UploadEmployeeInput />
                    </div>
                </div>

                <div className="flex w-1/2 mt-2 gap-3">
                    <Input
                        type="text"
                        placeholder="Business Unit"
                        value={filterParams.branchBU}
                        onChange={event => onFilterValueChangeHandler('branchBU', event)}
                    />
                    <Input
                        type="text"
                        placeholder="Store Code"
                        value={filterParams.branchCode}
                        onChange={event => onFilterValueChangeHandler('branchCode', event)}
                    />
                    <div className="flex w-full px-3 py-2"></div>
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button
                    variant="outline"
                    className="text-primary hover:text-primary"
                    onClick={() => refetchEmployeeList()}
                >
                    <Search className="mr-2 h-4 w-4" />
                    ค้นหา
                </Button>
                <Button variant="ghost" className="text-primary hover:text-primary" onClick={onClearFilterHandler}>
                    ล้างตัวกรอง
                </Button>
            </div>

            <Separator className="my-4" />

            <Card className="p-4 text-start">
                <h1 className="text-lg font-medium mb-4">รายการข้อมูลพนักงานห้าง</h1>

                <DataTable
                    columns={employeeManagementList}
                    data={employeeListData?.content || []}
                    onPaginationChange={onPaginationChange}
                    pageCount={employeeListData?.totalElements ?? 0}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};
