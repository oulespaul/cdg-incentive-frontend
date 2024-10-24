import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../components/data-table/ColumnHeader';
import { IncentiveScheme } from '@/types/api';
import IncentiveSchemeActionMenu from '../components/action-menus';

export const incentiveSchemeListColumns: ColumnDef<IncentiveScheme>[] = [
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
        size: 50,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'schemeKey',
        accessorKey: 'schemeKey',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ชื่อ Key" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('schemeKey')}`}</div>,
        size: 100,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'schemeName',
        accessorKey: 'schemeName',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ชื่อ Scheme" className="text-start" />,
        cell: ({ row }) => <div className="text-start">{`${row.getValue('schemeName')}`}</div>,
        size: 200,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'action',
        header: ({ column }) => <DataTableColumnHeader column={column} title="การกระทำ" className="text-center" />,
        cell: () => {
            return <IncentiveSchemeActionMenu />;
        },
        size: 50,
        enableSorting: false,
        enableHiding: false,
    },
];
