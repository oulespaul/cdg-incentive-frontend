import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    TableMeta,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { formatThaiCurrency } from '@/lib/number-utils';

const defaultColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id, columnDef }, table }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);

        const onBlur = () => {
            if (table.options.meta?.updateData) {
                table.options.meta?.updateData(index, id, value);
            }
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        //@ts-ignore
        const { inputType = 'text' } = columnDef.meta || {};

        return inputType === 'currency' ? (
            table.options.meta?.isViewMode ? (
                <p>{formatThaiCurrency(value as number, ' ')}</p>
            ) : (
                <CurrencyInput
                    id={`currency-input-${index}-${id}`}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={value as string}
                    decimalsLimit={2}
                    onValueChange={(_value, _name, values) => {
                        setValue(values?.float);
                    }}
                    onBlur={onBlur}
                />
            )
        ) : table.options.meta?.isViewMode ? (
            <p>{value as string}</p>
        ) : (
            <Input
                id={`input-${index}-${id}`}
                value={value as string}
                onChange={e => setValue(e.target.value)}
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
    isLoading: boolean;
    columnVisibility?: VisibilityState | undefined;
    initialSoringState?: SortingState | undefined;
}

export function TargetBranchDataTable<TData, TValue>({
    columns,
    data,
    meta,
    isCanAddRow,
    className,
    isLoading,
    columnVisibility,
    initialSoringState,
}: TargetBranchDataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        meta,
        state: {
            columnVisibility,
        },
        initialState: {
            sorting: initialSoringState,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
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
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                <div className="flex justify-center">
                                    <Spinner className="text-primaryLight" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
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
                            {isCanAddRow && meta?.addRowButton ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-start">
                                        {meta.addRowButton()}
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </>
                    )}
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
