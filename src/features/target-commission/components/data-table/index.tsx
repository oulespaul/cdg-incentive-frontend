import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PaginationControl } from "./PaginationControl"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onPaginationChange?: OnChangeFn<PaginationState> | undefined
    pageCount?: number | undefined
    pagination?: PaginationState | undefined
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onPaginationChange,
    pageCount,
    pagination,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        onPaginationChange,
        state: { pagination },
        rowCount: pageCount,
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-[#E2E8F0]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="text-bold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={`${index % 2 === 0 ? "bg-[#f3f8fc]" : ""}`}
                            >
                                {row.getVisibleCells().map((cell) => (
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
    )
}
