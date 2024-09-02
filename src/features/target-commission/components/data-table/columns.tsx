import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./ColumnHeader";

export type TargetCommission = {
  id: number
  monthYear: string
  bu: string
  store: string
  storeCode: string
  targetCommission: string
};

export const columns: ColumnDef<TargetCommission>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ลำดับ" className="text-center" />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "monthYear",
    header: "เดือน ปี",
  },
  {
    accessorKey: "bu",
    header: "BU",
  },
  {
    accessorKey: "store",
    header: "รหัส - ชื่อสาขา",
  },
  {
    accessorKey: "storeCode",
    header: "Store Code",
  },
  {
    accessorKey: "targetCommission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="เป้า Commission (บาท)" className="text-end" />
    ),
    cell: ({ row }) => <div className="text-end">{row.getValue("targetCommission")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
]
