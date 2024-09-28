import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    OnChangeFn,
    PaginationState,
    RowData,
    TableMeta,
    useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationControl } from './PaginationControl';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta?: TableMeta<any> | undefined;
    manualPagination?: boolean;
    onPaginationChange?: OnChangeFn<PaginationState> | undefined;
    pageCount?: number | undefined;
    pagination?: PaginationState | undefined;
}

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void;
        addRowTitle: string;
        addRow: () => void;
        removeRow: (rowIndex: number) => void;
        selectedBrand?: (rowIndex: number) => void;
        selectedSubDepartmentPool?: (rowIndex: number) => void;
        selectedDepartment?: (rowIndex: number) => void;
        selectedSubDepartment?: (rowIndex: number) => void;
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
}: DataTableProps<TData, TValue>) {
    const [paginationLocal, setPaginationLocal] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        meta,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination,
        getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
        onPaginationChange: manualPagination ? onPaginationChange : setPaginationLocal,
        state: { pagination: manualPagination ? pagination : paginationLocal },
        rowCount: pageCount,
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-[#E2E8F0] sticky top-0">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id} className="text-bold">
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
