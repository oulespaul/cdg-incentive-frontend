import { Button } from '@/components/ui/button';
import { Check, Search, X } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePagination } from '@/hooks/use-pagination';
import { useFetchTargetCommissionFilter } from '@/features/target-commission/api/use-fetch-target-commission-filters';
import FilterSelect from '@/components/select';
import { TargetBranch } from '@/features/target-branch-manage/api/use-fetch-target-branch-detail-by-target-commission-id';
import {
    TargetBranchFilterParams,
    useFetchTargetBranchDetailList,
} from '@/features/target-branch-manage/api/use-fetch-target-branch-detail-list';
import { targetBranchReviewApproveColumns } from '@/features/target-branch-manage/constants/target-branch-review-approve-columns';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { WorkflowStatus } from '@/constants/workflow-status';
import { useTargetBranchActions } from '@/features/target-branch-manage/hooks/use-target-branch-actions';

const initialFilterParams = {
    year: undefined,
    month: undefined,
    branchNumber: undefined,
    status: undefined,
    branchCode: '',
    branchBU: '',
};

export const TargetBranchReviewApprove = () => {
    const [filterParams, setFilterParams] = useState<TargetBranchFilterParams>(initialFilterParams);

    const [rowSelection, setRowSelection] = useState({});
    const [branchSelected, setBranchSelected] = useState<Row<TargetBranch>[]>([]);

    const { makeActionTargetBranchHandler } = useTargetBranchActions();

    const navigate = useNavigate();

    const { onPaginationChange, resetPaginationState, pagination } = usePagination();
    const { data: targetBranchData, refetch: refetchTargetBranch } = useFetchTargetBranchDetailList({
        ...filterParams,
        ...pagination,
    });

    const { data: yearFilterOptions } = useFetchTargetCommissionFilter('year');
    const { data: monthFilterOptions } = useFetchTargetCommissionFilter('month');
    const { data: branchFilterOptions } = useFetchTargetCommissionFilter('branch');

    useEffect(() => {
        refetchTargetBranch();
    }, [pagination.pageIndex, pagination.pageSize, refetchTargetBranch]);

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams((prevFilters: TargetBranchFilterParams) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const onFilterValueChangeHandler = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFilterParams((prevFilters: TargetBranchFilterParams) => ({
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
                <h1 className="text-2xl font-medium">ตรวจสอบและอนุมัติเป้าสาขา</h1>
            </div>

            <div className="flex flex-col mt-4">
                <div className="flex w-2/4 gap-4">
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
                    <FilterSelect
                        value={filterParams.status}
                        options={[
                            { label: 'New', value: 'New' },
                            { label: 'Pending', value: 'Pending' },
                            { label: 'Approved', value: 'Approved' },
                        ]}
                        placeholder="สถานะ"
                        onChange={value => onFilterSelectHandler('status', value)}
                    />
                </div>

                <div className="flex w-2/4 gap-4 mt-2">
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
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-medium">รายการข้อมูลเป้าสาขา</h1>

                    {(branchSelected.length || 0) > 0 && (
                        <div className="flex gap-2 items-center">
                            <p className="font-medium">เลือกข้อมูล {branchSelected.length} รายการ</p>
                            <div className="flex gap-2">
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        makeActionTargetBranchHandler(
                                            branchSelected.map(b => b.original.id),
                                            WorkflowStatus.REJECTED,
                                        );
                                        setRowSelection({});
                                    }}
                                >
                                    <X />
                                    ไม่อนุมัติ
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => {
                                        makeActionTargetBranchHandler(
                                            branchSelected.map(b => b.original.id),
                                            WorkflowStatus.APPROVED,
                                        );
                                        setRowSelection({});
                                    }}
                                >
                                    <Check />
                                    อนุมัติ
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="overflow-auto">
                    <DataTable
                        columns={targetBranchReviewApproveColumns}
                        data={
                            targetBranchData?.content?.map((target, index) => ({
                                ...target,
                                no: index + 1,
                            })) ?? []
                        }
                        //@ts-ignore
                        meta={{
                            onAction: (id: number) => {
                                navigate(`detail/${id}`);
                            },
                        }}
                        onPaginationChange={onPaginationChange}
                        pageCount={targetBranchData?.totalElements ?? 0}
                        pagination={pagination}
                        tableClassName="max-content"
                        onRowSelectedChange={setBranchSelected}
                        rowSelectionExternal={rowSelection}
                        setRowSelectionExternal={setRowSelection}
                    />
                </div>
            </Card>
        </div>
    );
};
