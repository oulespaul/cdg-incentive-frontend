import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../components/data-table/ColumnHeader';
import { formatThaiCurrency } from '@/lib/number-utils';
import { getThaiMonthName } from '@/lib/month-utils';
import { TargetCommission } from '@/types/api';

export const targetCommissionColumns: ColumnDef<TargetCommission>[] = [
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
        id: 'monthYear',
        accessorFn: row => `${getThaiMonthName(row.month)} - ${row.year}`,
        header: ({ column }) => <DataTableColumnHeader column={column} title="เดือน ปี" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('monthYear')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'branchBU',
        accessorKey: 'branchBU',
        header: ({ column }) => <DataTableColumnHeader column={column} title="BU" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('branchBU')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'branch',
        accessorFn: row => `${row.branchNumber} - ${row.branchName}`,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="รหัส - ชื่อสาขา" className="text-start" />
        ),
        cell: ({ row }) => <div className="text-start">{`${row.getValue('branch')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'branchCode',
        accessorKey: 'branchCode',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Store Code" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('branchCode')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'targetCommission',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="เป้า Commission (บาท)" className="text-end" />
        ),
        cell: ({ row }) => <div className="text-end">{formatThaiCurrency(row.getValue('targetCommission'))}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
];
