import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader';
import _ from 'lodash';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { Card } from '@/components/ui/card';
import { formatThaiCurrency } from '@/lib/number-utils';
import { Department } from '@/features/department/models/department';

export type TargetDMM = {
    id?: number;
    dmmId?: string;
    department?: Department;
    subDepartment?: SubDepartment;
    goalDept?: string;
    actualSalesLastYear?: string;
    goalId?: string;
    actualSalesIDLastYear?: string;
};

export const targetDMMColumns: ColumnDef<TargetDMM>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />,
        cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
        size: 100,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'dmmId',
        accessorKey: 'dmmId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="รหัสพนักงาน DMM" className="text-start w-[100px]" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'department',
        accessorKey: 'department',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Department" className="text-start" />,
        cell: ({ row, table }) => {
            const departmentValue = row.getValue('department') as Department;
            if (departmentValue === undefined) {
                if (table.options.meta?.selectedDepartment) {
                    return (
                        <div className="flex">
                            <Button
                                variant="outline"
                                className="border-dotted border-2"
                                onClick={() => {
                                    if (table.options.meta?.selectedDepartment) {
                                        table.options.meta?.selectedDepartment(row.index);
                                    }
                                }}
                            >
                                <Plus /> เลือก Dept
                            </Button>
                        </div>
                    );
                }
            }
            return (
                <Card className="flex items-center bg-white mx-1 px-2 h-[31px]">
                    <p className="truncate text-center">
                        {departmentValue.departmentCode} - {departmentValue.departmentName}
                    </p>
                </Card>
            );
        },
        footer: () => 'รวม',
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'subDepartment',
        accessorKey: 'subDepartment',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sub Department" className="text-start" />,
        cell: ({ row, table }) => {
            const subDepartmentValue = row.getValue('subDepartment') as SubDepartment;
            if (subDepartmentValue === undefined) {
                if (table.options.meta?.selectedSubDepartment) {
                    return (
                        <div className="flex">
                            <Button
                                variant="outline"
                                className="border-dotted border-2"
                                onClick={() => {
                                    if (table.options.meta?.selectedSubDepartment) {
                                        table.options.meta?.selectedSubDepartment(row.index);
                                    }
                                }}
                            >
                                <Plus /> เลือก Sub Dept
                            </Button>
                        </div>
                    );
                }
            }
            return (
                <Card className="flex items-center bg-white mx-1 px-2 h-[31px]">
                    <p className="truncate text-center">
                        {subDepartmentValue.subDepartmentCode} - {subDepartmentValue.subDepartmentName}
                    </p>
                </Card>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'goalDept',
        accessorKey: 'goalDept',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Goal Dept (บาท)" className="text-start w-[100px]" />
        ),
        footer: info => {
            return formatThaiCurrency(
                info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + +(row.original.goalDept ?? 0), 0),
                '',
            );
        },
        enableSorting: false,
        enableHiding: false,
        meta: { inputType: 'currency' },
    },
    {
        id: 'actualSalesLastYear',
        accessorKey: 'actualSalesLastYear',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Actual sales Last Year (บาท)"
                className="text-start w-[100px]"
            />
        ),
        footer: info => {
            return formatThaiCurrency(
                info.table
                    .getFilteredRowModel()
                    .rows.reduce((sum, row) => sum + +(row.original.actualSalesLastYear ?? 0), 0),
                '',
            );
        },
        enableSorting: false,
        enableHiding: false,
        meta: { inputType: 'currency' },
    },
    {
        id: 'goalId',
        accessorKey: 'goalId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Goal ID (บาท)" className="text-start w-[100px]" />
        ),
        footer: info => {
            return formatThaiCurrency(
                info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + +(row.original.goalId ?? 0), 0),
                '',
            );
        },
        enableSorting: false,
        enableHiding: false,
        meta: { inputType: 'currency' },
    },
    {
        id: 'actualSalesIDLastYear',
        accessorKey: 'actualSalesIDLastYear',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Actual sales ID Last Year (บาท)"
                className="text-start w-[100px]"
            />
        ),
        footer: info => {
            return formatThaiCurrency(
                info.table
                    .getFilteredRowModel()
                    .rows.reduce((sum, row) => sum + +(row.original.actualSalesIDLastYear ?? 0), 0),
                '',
            );
        },
        enableSorting: false,
        enableHiding: false,
        meta: { inputType: 'currency' },
    },
    {
        accessorKey: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="" className="text-center" />,
        cell: ({ row: { index }, table }) => (
            <Button variant="ghost" size="sm" onClick={() => table.options.meta?.removeRow(index)}>
                <X color="red" />
            </Button>
        ),
        enableSorting: false,
        enableHiding: false,
    },
];
