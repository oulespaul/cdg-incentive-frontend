import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../components/data-table/ColumnHeader';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

export type TargetCommission = {
    id: number;
    month: string;
    year: string;
    storeBU: string;
    storeNumber: string;
    storeName: string;
    storeCode: string;
    targetCommission: number;
};

export const targetBranchColumns: ColumnDef<TargetCommission>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />,
        cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
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
        cell: ({ row }) => (
            <div className="text-end">
                {new Intl.NumberFormat('th-TH', { currency: 'THB' }).format(row.getValue('targetCommission'))}
            </div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'actualSalesLY',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actual sales LY (บาท)" className="text-end" />
        ),
        cell: ({ row }) => (
            <div className="text-end">
                {new Intl.NumberFormat('th-TH', { currency: 'THB' }).format(row.getValue('targetCommission'))}
            </div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'targetSalesID',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="เป้าหมายพนักงานห้าง (บาท)" className="text-end" />
        ),
        cell: ({ row }) => (
            <div className="text-end">
                {new Intl.NumberFormat('th-TH', { currency: 'THB' }).format(row.getValue('targetCommission'))}
            </div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'actualSalesID',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actual sales ID (บาท)" className="text-end" />
        ),
        cell: ({ row }) => (
            <div className="text-end">
                {new Intl.NumberFormat('th-TH', { currency: 'THB' }).format(row.getValue('targetCommission'))}
            </div>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'percentChangeTargetCommission',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="% Change เป้า commission" className="text-center" />
        ),
        cell: () => <div className="text-center">13%</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'percentChangeTargetID',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="% Change เป้า ID" className="text-center" />
        ),
        cell: () => <div className="text-center">3%</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="สถานะ" className="text-center" />,
        cell: () => <div className="text-amber-500 text-center">Pending</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="การกระทำ" className="text-center" />,
        cell: () => (
            <Button variant="ghost" size="sm">
                <Ellipsis />
            </Button>
        ),
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
];
