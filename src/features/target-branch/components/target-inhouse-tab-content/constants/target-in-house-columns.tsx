import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader';
import _ from 'lodash';
import { formatThaiCurrency } from '@/lib/number-utils';

export type TargetInHouse = {
    id?: number;
    departmentCode?: string;
    departmentName?: string;
    subDepartmentCode?: string;
    subDepartmentName?: string;
    brandId?: number;
    brandName?: string;
    groupBrand: string;
    goalBrand?: number;
    actualSalesIDLastYear?: number;
};

export const targetInHouseColumns: ColumnDef<TargetInHouse>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />,
        cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
        size: 100,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'department',
        accessorFn: row => {
            if (_.isEmpty(row.departmentCode) || _.isEmpty(row.departmentName)) return undefined;
            return `${row.departmentCode} - ${row.departmentName}`;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Department" className="text-start w-[120px]" />
        ),
        cell: ({ row, table }) => {
            if (row.getValue('department') === undefined) {
                if (table.options.meta?.selectedBrand) {
                    return (
                        <Button
                            variant="outline"
                            className="border-dotted border-2"
                            onClick={() => {
                                if (table.options.meta?.selectedBrand) {
                                    table.options.meta?.selectedBrand(row.index);
                                }
                            }}
                        >
                            <Plus /> เลือก Brand
                        </Button>
                    );
                }
            }
            return <div className="text-start">{`${row.getValue('department')}`}</div>;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'subDepartment',
        accessorFn: row => {
            if (_.isEmpty(row.subDepartmentCode) || _.isEmpty(row.subDepartmentName)) return '';
            return `${row.subDepartmentCode} - ${row.subDepartmentName}`;
        },

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sub Department" className="text-start w-[120px]" />
        ),
        cell: ({ row }) => <div className="text-start">{`${row.getValue('subDepartment')}`}</div>,
        footer: () => 'รวม',
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'brandName',
        accessorKey: 'brandName',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('brandName')}`}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'groupBrand',
        accessorKey: 'groupBrand',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Group" className="text-start" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'goalBrand',
        accessorKey: 'goalBrand',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Goal Brand (บาท)" className="text-start" />
        ),
        footer: info => {
            return formatThaiCurrency(
                info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + +(row.original.goalBrand ?? 0), 0),
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
                className="text-start w-[200px]"
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
