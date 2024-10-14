import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    OnChangeFn,
    PaginationState,
    Row,
    RowData,
    RowSelectionState,
    TableMeta,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationControl } from './PaginationControl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta?: TableMeta<any> | undefined;
    manualPagination?: boolean;
    onPaginationChange?: OnChangeFn<PaginationState> | undefined;
    pageCount?: number | undefined;
    pagination?: PaginationState | undefined;
    tableClassName?: string;
    onRowSelectedChange?: (rows: Row<any>[]) => void;
    rowSelectionExternal?: RowSelectionState | undefined;
    setRowSelectionExternal?: OnChangeFn<RowSelectionState> | undefined;
    columnVisibility?: VisibilityState | undefined;
}

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void;
        addRowButton: () => JSX.Element;
        removeRow: (rowIndex: number) => void;
        selectedBrand?: (rowIndex: number) => void;
        selectedSubDepartmentPool?: (rowIndex: number) => void;
        selectedDepartment?: (rowIndex: number) => void;
        selectedSubDepartment?: (rowIndex: number) => void;
        isViewMode?: boolean;
        onAction?: (id: number) => void;
    }
}

export function DataTable<TData, TValue>({
    columns,
    data,
    meta,
    manualPagination = true,
    onPaginationChange,
    pageCount,
    pagination,
    tableClassName,
    onRowSelectedChange,
    rowSelectionExternal,
    setRowSelectionExternal,
    columnVisibility,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({});
    const [paginationLocal, setPaginationLocal] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        meta,
        columns,
        state: {
            pagination: manualPagination ? pagination : paginationLocal,
            rowSelection: rowSelectionExternal ? rowSelectionExternal : rowSelection,
            columnVisibility,
        },
        getCoreRowModel: getCoreRowModel(),
        manualPagination,
        getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
        onPaginationChange: manualPagination ? onPaginationChange : setPaginationLocal,
        onRowSelectionChange: setRowSelectionExternal ? setRowSelectionExternal : setRowSelection,
        rowCount: pageCount,
        enableRowSelection: true,
    });

    useEffect(() => {
        if (onRowSelectedChange) {
            onRowSelectedChange(table.getSelectedRowModel().rows);
        }
    }, [onRowSelectedChange, table.getSelectedRowModel().rows.length]);

    return (
        <div className="rounded-md border">
            <Table className={tableClassName}>
                <TableHeader className="bg-[#E2E8F0] sticky top-0">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id} className={cn('text-bold')}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className={`${index % 2 === 0 ? 'bg-[#f3f8fc]' : ''}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                ไม่พบข้อมูล
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <PaginationControl table={table} />
        </div>
    );
}
