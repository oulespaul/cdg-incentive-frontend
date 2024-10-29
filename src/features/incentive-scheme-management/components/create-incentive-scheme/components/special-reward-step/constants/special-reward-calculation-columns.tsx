import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/ColumnHeader';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Control } from 'react-hook-form';
import { CreateIncentiveSchemeInput } from '@/features/incentive-scheme-management/api/use-create-incentive-scheme';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import CurrencyInput from '@/components/currency-input';
import { IncentiveManageUnitSymbolMapping } from '@/features/incentive-scheme-management/constants/incentive-manage-unit-options';

export const getSepcialRewardCalculationColumns = (control: Control<CreateIncentiveSchemeInput>): ColumnDef<{ minSale?: number | undefined, maxSale?: number | undefined, totalReward?: number | undefined }>[] => {
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
            id: 'targetRange',
            accessorKey: 'targetRange',
            cell: ({ row: { index } }) => {
                return (
                    <div className="flex space-x-2">
                        <FormField
                            control={control}
                            name={`specialRewardCalculationList.${index}.minSale`}
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
                            name={`specialRewardCalculationList.${index}.maxSale`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center'>%</div>
                    </div>
                );
            },
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="ช่วงยอดขาย"
                />
            ),
            size: 600,
            enableSorting: false,
            enableHiding: false,
            meta: { inputType: 'currency' },
        },
        {
            accessorKey: 'groupName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="เงินรางวัล" className="text-center" />,
            cell: ({ row: { index }, table }) => {
                return (
                    <FormField
                        control={control}
                        name={`specialRewardCalculationList.${index}.totalReward`}
                        render={({ field }) => (
                            <div className="flex space-x-2">
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                                <div className='flex items-center'>{IncentiveManageUnitSymbolMapping[table.options.meta?.specialRewardCalculationUnit ?? '']}</div>
                            </div>
                        )}
                    />
                );
            },
            size: 100,
            enableSorting: false,
            enableHiding: false,
        },
    ];
}
