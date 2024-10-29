import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { CreateIncentiveSchemeInput } from '@/features/incentive-scheme-management/api/use-create-incentive-scheme';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import CurrencyInput from '@/components/currency-input';

export const getMajorGroupCalculationColumns = (control: Control<CreateIncentiveSchemeInput>): ColumnDef<{ groupName: string, minTargetPerHead?: number | undefined, maxTargetPerHead?: number | undefined }>[] => {
    return [
        {
            accessorKey: 'action',
            header: ({ column }) => <DataTableColumnHeader column={column} title="" className="text-center" />,
            cell: ({ row: { index }, table }) => (
                <Button variant="ghost" size="sm" type='button' onClick={() => {
                    if (table.options.meta?.removeRow) {
                        table.options.meta?.removeRow(index)
                    }
                }}>
                    <X color="red" />
                </Button>
            ),
            size: 50,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'groupName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Group" className="text-center" />,
            cell: ({ row: { index } }) => {
                return (
                    <FormField
                        control={control}
                        name={`majorGroupCalculationList.${index}.groupName`}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="col-start-2 col-span-3 text-start" />
                            </FormItem>
                        )}
                    />
                );
            },
            size: 100,
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: 'targetRange',
            accessorKey: 'targetRange',
            cell: ({ row: { index } }) => {
                return (
                    <div className="flex space-x-2">
                        <FormField
                            control={control}
                            name={`majorGroupCalculationList.${index}.minTargetPerHead`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center'>-</div>
                        <FormField
                            control={control}
                            name={`majorGroupCalculationList.${index}.maxTargetPerHead`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />
                    </div>
                );
            },
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="ช่วงเป้ารายหัว (บาท)"
                />
            ),
            size: 600,
            enableSorting: false,
            enableHiding: false,
            meta: { inputType: 'currency' },
        },
    ];
}
