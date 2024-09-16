import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader';

export type TargetDept = {
    id?: number;
    groupDept?: string;
    subDepartmentCode?: string;
    subDepartmentName?: string;
    goalDept?: number;
    actualSalesIdLastYear?: number;
};

export const targetDeptColumns: ColumnDef<TargetDept>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />,
        cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
        size: 100,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'groupDept',
        accessorKey: 'groupDept',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Group Dept"
                className="text-start w-[200px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'deptPool',
        accessorFn: row => `${row.subDepartmentCode} - ${row.subDepartmentName}`,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dept Pool" className="text-start w-[120px]" />
        ),
        cell: ({ row, table }) => {
            if (row.getValue('deptPool') === 'NEW - NEW') {
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
                            <Plus /> เลือก Sub Dept
                        </Button>
                    );
                }
            }
            return <div className="text-start">{`${row.getValue('deptPool')}`}</div>;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'goalDept',
        accessorKey: 'goalDept',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Goal Dept (บาท)" className="text-start" />
        ),
        enableSorting: false,
        enableHiding: false,
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
        enableSorting: false,
        enableHiding: false,
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
