import { DataTable } from "@/components/data-table";
import { CreateIncentiveSchemeInput } from "@/features/incentive-scheme-management/api/use-create-incentive-scheme"
import React, { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IncentiveManageUnitOptions, IncentiveManageUnitSymbolMapping } from "@/features/incentive-scheme-management/constants/incentive-manage-unit-options";
import { DataTableColumnHeader } from "@/components/data-table/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import CurrencyInput from "@/components/currency-input";

interface CreateIncentiveSchemeMinorStepProps {
}

const CreateIncentiveSchemeMinorStep: React.FC<CreateIncentiveSchemeMinorStepProps> = ({ }) => {
    const { control, watch, getValues } = useFormContext<CreateIncentiveSchemeInput>();
    const incentiveMajorGroupCalculationList = watch("majorGroupCalculationList")
    const majorCalculationUnitWatch = watch("majorCalculationUnit")
    const minorCalculationUnitWatch = watch("minorCalculationUnit")
    const majorCalculationRangeWatch = watch("majorCalculationRangeList")

    const minorRangeCommissionCalculationColumns = useMemo<ColumnDef<any>[]>(() => {
        return majorCalculationRangeWatch.map((_column, colIndex) => ({
            id: `minor-calculation-${colIndex}`,
            accessorKey: `minor-calculation-${colIndex}`,
            header: ({ table }) => {
                return (
                    <div className="flex justify-center space-x-2">
                        <div className='flex items-center'>{getValues(`majorCalculationRangeList.${colIndex}.minIncentive`)}</div>
                        <div className='flex items-center'>-</div>
                        <div className='flex items-center'>{getValues(`majorCalculationRangeList.${colIndex}.maxIncentive`)}</div>
                        <div className='flex items-center'>{IncentiveManageUnitSymbolMapping[table.options.meta?.majorCalculationUnit ?? '']}</div>
                    </div>
                );
            },
            cell: ({ row: { index }, table }) => {
                return (
                    <div className="flex space-x-2">
                        <FormField
                            control={control}
                            name={`majorGroupCalculationList.${index}.minorCalculationList.${colIndex}.incentive`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center'>{IncentiveManageUnitSymbolMapping[table.options.meta?.minorCalculationUnit ?? '']}</div>
                    </div>
                );
            },
            size: 600,
            enableSorting: false,
            enableHiding: false,
        }))
    }, [majorCalculationRangeWatch])

    return (
        <div className="flex flex-col space-y-6">
            <p className="text-start font-semibold">2. การคำนวณ Incentive จากยอดขาย Minor</p>

            <FormField
                control={control}
                name="minorCalculationUnit"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-9">
                        <FormLabel className="col-start-1 col-span-1 flex justify-start items-center font-semibold mr-2">หน่วยของค่าแรงจูงใจ :</FormLabel>
                        <FormControl className="col-span-2">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex !mt-0"
                            >
                                {IncentiveManageUnitOptions.map((item, index) => (
                                    <FormItem key={`${item.value}-${index}`} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={item.value} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item.label}
                                        </FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage className="col-start-2 col-span-3 text-start" />
                    </FormItem>
                )}
            />

            <DataTable
                columns={[{
                    id: 'groupName',
                    accessorKey: 'groupName',
                    header: ({ column }) => <DataTableColumnHeader column={column} title="Group" className="text-center" />,
                    cell: ({ row: { index } }) => {
                        return <div className="text-center">{incentiveMajorGroupCalculationList[index]?.groupName}</div>
                    },
                    enableSorting: false,
                    enableHiding: false,
                }, ...minorRangeCommissionCalculationColumns]}
                data={incentiveMajorGroupCalculationList}
                showPaginationControl={false}
                meta={{
                    majorCalculationUnit: majorCalculationUnitWatch,
                    minorCalculationUnit: minorCalculationUnitWatch
                }}
            />
        </div>
    )
}

export default CreateIncentiveSchemeMinorStep;