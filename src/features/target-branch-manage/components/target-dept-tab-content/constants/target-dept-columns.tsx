import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader';
import _ from 'lodash';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { Card } from '@/components/ui/card';
import { formatThaiCurrency } from '@/lib/number-utils';

export type TargetDept = {
    id?: number;
    groupDept?: string;
    subDepartmentPool?: SubDepartment[];
    goalDept?: string;
    actualSalesIDLastYear?: string;
};

export const targetDeptColumns: ColumnDef<TargetDept>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />,
        cell: ({ row, table }) => {
            return (
                <div className="text-center">
                    {(table.getSortedRowModel()?.flatRows?.findIndex(flatRow => flatRow.id === row.id) || 0) + 1}
                </div>
            );
        },
        size: 100,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'groupDept',
        accessorKey: 'groupDept',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Group Dept" className="text-start w-[100px]" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'subDepartmentPool',
        accessorKey: 'subDepartmentPool',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dept Pool" className="text-start" />,
        cell: ({ row, table }) => {
            if (row.getValue('subDepartmentPool') === undefined) {
                if (table.options.meta?.selectedSubDepartmentPool && !table.options.meta?.isViewMode) {
                    return (
                        <div className="flex">
                            <Button
                                variant="outline"
                                className="border-dotted border-2"
                                onClick={() => {
                                    if (table.options.meta?.selectedSubDepartmentPool) {
                                        table.options.meta?.selectedSubDepartmentPool(row.index);
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
                <div className="text-start flex flex-wrap items-center w-[500px]">
                    {(row.getValue('subDepartmentPool') as SubDepartment[]).map(subDepartment => {
                        return (
                            <Card className="flex items-center bg-white mx-1 px-2 h-[31px]" key={subDepartment.id}>
                                <p className="truncate text-center">
                                    {subDepartment.subDepartmentCode} - {subDepartment.subDepartmentName}
                                </p>
                            </Card>
                        );
                    })}
                    {!table.options.meta?.isViewMode && (
                        <Button
                            variant="outline"
                            className="border-dotted border-2"
                            onClick={() => {
                                if (table.options.meta?.selectedSubDepartmentPool) {
                                    table.options.meta?.selectedSubDepartmentPool(row.index);
                                }
                            }}
                        >
                            <Plus /> เลือก Sub Dept
                        </Button>
                    )}
                </div>
            );
        },
        footer: () => 'รวม',
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
            <Button variant="ghost" size="sm" onClick={() => {
                if (table.options.meta?.removeRow) {
                    table.options.meta.removeRow(index)
                }
            }}>
                <X color="red" />
            </Button>
        ),
        enableSorting: false,
        enableHiding: false,
    },
];
