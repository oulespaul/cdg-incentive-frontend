import { DataTable } from "@/components/data-table";
import { CreateIncentiveSchemeInput } from "@/features/incentive-scheme-management/api/use-create-incentive-scheme"
import React, { useMemo } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getMajorGroupCalculationColumns } from "./constants/major-group-calculation-columns";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IncentiveManageUnitOptions, IncentiveManageUnitSymbolMapping } from "@/features/incentive-scheme-management/constants/incentive-manage-unit-options";
import { DataTableColumnHeader } from "@/components/data-table/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import CurrencyInput from "@/components/currency-input";

interface CreateIncentiveSchemeMajorStepProps {
}

const CreateIncentiveSchemeMajorStep: React.FC<CreateIncentiveSchemeMajorStepProps> = ({ }) => {
    const { control, watch } = useFormContext<CreateIncentiveSchemeInput>();
    const { append: appendMajorGroupCalculation, remove: removeMajorGroupCalculation } = useFieldArray({
        control,
        name: 'majorGroupCalculationList',
    });
    const { append: appendMajorCalculationRange } = useFieldArray({
        control,
        name: 'majorCalculationRangeList',
    });
    const incentiveMajorGroupCalculationList = watch("majorGroupCalculationList")
    const majorCalculationUnitWatch = watch("majorCalculationUnit")
    const majorCalculationRangeWatch = watch("majorCalculationRangeList")

    const majorGroupCalculationColumns = useMemo(() => {
        return getMajorGroupCalculationColumns(control)
    }, [control])

    const majorRangeCommissionCalculationColumns = useMemo<ColumnDef<any>[]>(() => {
        return majorCalculationRangeWatch.map((_column, colIndex) => ({
            id: `targetRange-${colIndex}`,
            accessorKey: `targetRange-${colIndex}`,
            header: ({ table }) => {
                return (
                    <div className="flex space-x-2">
                        <FormField
                            control={control}
                            name={`majorCalculationRangeList.${colIndex}.minIncentive`}
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
                            name={`majorCalculationRangeList.${colIndex}.maxIncentive`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center'>{IncentiveManageUnitSymbolMapping[table.options.meta?.majorCalculationUnit ?? '']}</div>
                    </div>
                );
            },
            cell: ({ row: { index }, table }) => {
                return (
                    <div className="flex space-x-2">
                        <FormField
                            control={control}
                            name={`majorGroupCalculationList.${index}.majorCalculationList.${colIndex}.incentive`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <CurrencyInput {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center'>{IncentiveManageUnitSymbolMapping[table.options.meta?.majorCalculationUnit ?? '']}</div>
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
            <p className="text-start font-semibold">1. การคำนวณ Incentive จากยอดขาย Major</p>

            <DataTable
                columns={majorGroupCalculationColumns}
                data={incentiveMajorGroupCalculationList}
                showPaginationControl={false}
                meta={{
                    addRowButton: () => {
                        const addRowHandler = () => {
                            appendMajorGroupCalculation({ groupName: '', minTargetPerHead: undefined, maxTargetPerHead: undefined, majorCalculationList: [] })
                        };

                        return (
                            <Button onClick={addRowHandler} variant="outline" className="border-dashed" type="button">
                                <Plus className="mr-2" /> เพิ่ม Group
                            </Button>
                        );
                    },
                    removeRow: removeMajorGroupCalculation
                }}
            />

            <Separator />

            <FormField
                control={control}
                name="majorCalculationUnit"
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
                }, ...majorRangeCommissionCalculationColumns]}
                data={incentiveMajorGroupCalculationList}
                showPaginationControl={false}
                meta={{
                    addColumnButton: () => {
                        const addColumnHandler = () => {
                            appendMajorCalculationRange({
                                minIncentive: undefined,
                                maxIncentive: undefined,
                            })
                        };

                        if (incentiveMajorGroupCalculationList.length === 0) return null

                        return (
                            <Button onClick={addColumnHandler} variant="outline" className="border-dashed" type="button">
                                <Plus className="mr-2" /> เพิ่ม
                            </Button>
                        );
                    },
                    majorCalculationUnit: majorCalculationUnitWatch
                }}
            />
        </div>
    )
}

export default CreateIncentiveSchemeMajorStep;