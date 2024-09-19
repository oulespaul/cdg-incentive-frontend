import { ColumnDef, flexRender, getCoreRowModel, RowData, TableMeta, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void;
        addRow: () => void;
        removeRow: (rowIndex: number) => void;
        selectedBrand?: (rowIndex: number) => void;
    }
}

const defaultColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);

        const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        return <Input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
    },
};

interface TargetBranchDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta?: TableMeta<any> | undefined;
    isCanAddRow?: boolean;
}

export function TargetBranchDataTable<TData, TValue>({
    columns,
    data,
    meta,
    isCanAddRow,
}: TargetBranchDataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        meta,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border h-[650px]">
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
                    {isCanAddRow && meta?.addRow ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-end">
                                <Button onClick={meta.addRow} variant="success">
                                    <Plus className="mr-2" /> เพิ่ม Group
                                </Button>
                            </TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
                <TableFooter>
                    {table.getFooterGroups().map(footerGroup => (
                        <TableRow key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <TableCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableFooter>
            </Table>
        </div>
    );
}
