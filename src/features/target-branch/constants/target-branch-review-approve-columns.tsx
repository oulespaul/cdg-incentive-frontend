import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../components/data-table/ColumnHeader';
import { formatThaiCurrency, handleFalsyOrInfinite } from '@/lib/number-utils';
import { cn } from '@/lib/utils';
import { getStatusColorClass } from '@/lib/status-color-utils';
import { TargetBranchDetail } from '../api/use-fetch-target-branch-detail-list';
import { Checkbox } from '@/components/ui/checkbox';

export const targetBranchReviewApproveColumns: ColumnDef<TargetBranchDetail>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
        cell: ({ row }) => {
            const changeTargetCommissionPercentage = (row.getValue('changeTargetCommissionPercentage') || 0) as number;
            return (
                <p className={cn('text-end', `${changeTargetCommissionPercentage < 0 ? 'text-red-500' : ''}`)}>
                    {formatThaiCurrency(handleFalsyOrInfinite(changeTargetCommissionPercentage, 0), ' %')}
                </p>
            );
        },
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'changeTargetIDPercentage',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="% Change เป้า ID" className="text-center" />
        ),
        cell: ({ row }) => {
            const changeTargetIDPercentage = (row.getValue('changeTargetIDPercentage') || 0) as number;
            return (
                <p className={cn('text-end', `${changeTargetIDPercentage < 0 ? 'text-red-500' : ''}`)}>
                    {formatThaiCurrency(handleFalsyOrInfinite(changeTargetIDPercentage, 0), ' %')}
                </p>
            );
        },
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="สถานะ" className="text-center" />,
        cell: ({ row }) => (
            <div className={cn('font-bold text-center', getStatusColorClass(row.getValue('status'), 'text'))}>
                {row.getValue('status')}
            </div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="การกระทำ" className="text-center" />,
        cell: ({ row, table }) => {
            return (
                <a
                    className="text-xs text-blue-500 underline cursor-pointer"
                    onClick={() => {
                        if (table.options.meta?.onAction) {
                            table.options.meta?.onAction(row.original.id);
                        }
                    }}
                >
                    ดูรายละเอียด
                </a>
            );
        },
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
];
