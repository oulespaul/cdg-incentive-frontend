import { ColumnDef, flexRender, getCoreRowModel, RowData, TableMeta, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

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

        return (
            <CurrencyInput
                id="input-example"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Please enter a number"
                defaultValue={1000}
                value={value as string}
                decimalsLimit={2}
                onValueChange={value => setValue(value)}
                onBlur={onBlur}
            />
        );
    },
};

interface TargetBranchDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta?: TableMeta<any> | undefined;
    isCanAddRow?: boolean;
    className?: string | undefined;
}

export function TargetBranchDataTable<TData, TValue>({
    columns,
    data,
    meta,
    isCanAddRow,
    className,
}: TargetBranchDataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        meta,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className={cn(`rounded-md border max-h-[650px] overflow-auto`, className)}>
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
                            <TableCell colSpan={columns.length} className="text-start">
                                <Button onClick={meta.addRow} variant="success">
                                    <Plus className="mr-2" /> {meta?.addRowTitle}
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
