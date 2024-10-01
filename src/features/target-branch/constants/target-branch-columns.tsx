import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../components/data-table/ColumnHeader';
import { formatThaiCurrency } from '@/lib/number-utils';
import { TargetBranchDetail } from '../api/use-fetch-target-branch-detail-list';
import TargetBranchActionMenus from '../components/action-menus';
import { cn } from '@/lib/utils';
import { getStatusColorClass } from '@/lib/status-color-utils';

export const targetBranchColumns: ColumnDef<TargetBranchDetail>[] = [
    {
        accessorKey: 'no',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />,
        cell: ({ row }) => <div className="text-center">{row.getValue('no')}</div>,
        size: 100,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'monthYear',
        accessorFn: row => `${row.month} - ${row.year}`,
        header: ({ column }) => <DataTableColumnHeader column={column} title="เดือน ปี" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('monthYear')}`}</div>,
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
    {
        accessorKey: 'actualSalesLyTotal',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actual sales LY (บาท)" className="text-end" />
        ),
        cell: ({ row }) => (
            <div className="text-end">{formatThaiCurrency(row.getValue('actualSalesLyTotal') || 0)}</div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'targetID',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="เป้าหมายพนักงานห้าง (บาท)" className="text-end" />
        ),
        cell: ({ row }) => <div className="text-end">{formatThaiCurrency(row.getValue('targetID') || 0)}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'actualLyID',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actual sales ID LY (บาท)" className="text-end" />
        ),
        cell: ({ row }) => <div className="text-end">{formatThaiCurrency(row.getValue('actualLyID') || 0)}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'changeTargetCommissionPercentage',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="% Change เป้า commission" className="text-center" />
        ),
        cell: ({ row }) => (
            <div className="text-center">
                {formatThaiCurrency(row.getValue('changeTargetCommissionPercentage') || 0, '%')}
            </div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'changeTargetIDPercentage',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="% Change เป้า ID" className="text-center" />
        ),
        cell: ({ row }) => (
            <div className="text-center">{formatThaiCurrency(row.getValue('changeTargetIDPercentage') || 0, '%')}</div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="สถานะ" className="text-center" />,
        cell: ({ row }) => (
            <p className={cn('font-bold text-center', getStatusColorClass(row.getValue('status'), 'text'))}>
                {row.getValue('status')}
            </p>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="การกระทำ" className="text-center" />,
        cell: ({ row }) => {
            return <TargetBranchActionMenus targetBranchDetail={row.original} />;
        },
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
];
