import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../components/data-table/ColumnHeader';
import { getThaiMonthName } from '@/lib/month-utils';
import { Employee } from '@/types/api';
import EmployeeActionMenus from '../components/action-menus';
import { formatDate } from '@/lib/date-utils';

export const employeeManagementList: ColumnDef<Employee>[] = [
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
        accessorFn: row =>
            `${getThaiMonthName(formatDate(row.createdAt, 'MM'))} - ${formatDate(row.createdAt, 'YYYY')}`,
        header: ({ column }) => <DataTableColumnHeader column={column} title="เดือน ปี" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('monthYear')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'bu',
        accessorFn: row => `${row.businessUnit} - ${row.branch}`,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="BU - Store Code" className="text-start" />
        ),
        cell: ({ row }) => <div className="text-start">{`${row.getValue('bu')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'employeeId',
        accessorKey: 'employeeId',
        header: ({ column }) => <DataTableColumnHeader column={column} title="รหัสพนักงาน" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('employeeId')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'hireDate',
        accessorKey: 'hireDate',
        header: ({ column }) => <DataTableColumnHeader column={column} title="วันที่เริ่มงาน" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('hireDate')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'newCostCenter',
        accessorKey: 'newCostCenter',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="New Cost Center" className="text-start" />
        ),
        cell: ({ row }) => <div className="text-start">{`${row.getValue('newCostCenter')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'brandId',
        accessorKey: 'brandId',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{row.getValue('brandId')}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'scheme',
        accessorKey: 'scheme',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Scheme" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('scheme')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'dayWorking',
        accessorKey: 'dayWorking',
        header: ({ column }) => <DataTableColumnHeader column={column} title="จำนวนวันทำงาน" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('dayWorking')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="การกระทำ" className="text-center" />,
        cell: ({ row }) => {
            return <EmployeeActionMenus employee={row.original} />;
        },
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
];
