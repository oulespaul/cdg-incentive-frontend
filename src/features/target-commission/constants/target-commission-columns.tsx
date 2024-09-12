import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../../components/data-table/ColumnHeader";

export type TargetCommission = {
  id: number,
  month: string,
  year: string,
  storeBU: string,
  storeNumber: string,
  storeName: string,
  storeCode: string,
  targetCommission: number
};

export const targetCommissionColumns: ColumnDef<TargetCommission>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    size: 100,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "monthYear",
    accessorFn: (row => `${row.month} - ${row.year}`),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เดือน ปี" className="text-start" />
    ),
    cell: ({ row }) => <div className="text-start">{`${row.getValue("monthYear")}`}</div>,
    size: 200,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "storeBU",
    accessorKey: "storeBU",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BU" className="text-start" />
    ),
    cell: ({ row }) => <div className="text-start">{`${row.getValue("storeBU")}`}</div>,
    size: 200,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "store",
    accessorFn: (row => `${row.storeNumber} - ${row.storeName}`),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="รหัส - ชื่อสาขา" className="text-start" />
    ),
    cell: ({ row }) => <div className="text-start">{`${row.getValue("store")}`}</div>,
    size: 200,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "storeCode",
    accessorKey: "storeCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store Code" className="text-start" />
    ),
    cell: ({ row }) => <div className="text-start">{`${row.getValue("storeCode")}`}</div>,
    size: 200,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "targetCommission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เป้า Commission (บาท)" className="text-end" />
    ),
    cell: ({ row }) => <div className="text-end">{new Intl.NumberFormat('th-TH', { currency: 'THB' }).format(row.getValue("targetCommission"))}</div>,
    size: 200,
    enableSorting: false,
    enableHiding: false,
  },
]
