import { DataTable } from "@/components/data-table";
import { CreateIncentiveSchemeInput } from "@/features/incentive-scheme-management/api/use-create-incentive-scheme"
import React, { useMemo } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IncentiveManageUnitOptions } from "@/features/incentive-scheme-management/constants/incentive-manage-unit-options";
import { IncentiveManageCalculationMethodOptions } from "@/features/incentive-scheme-management/constants/incentive-manage-calculation-method-options";
import { getSepcialRewardCalculationColumns } from "./constants/special-reward-calculation-columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateIncentiveSchemeSpecialRewardStepProps {
}

const CreateIncentiveSchemeSpecialRewardStep: React.FC<CreateIncentiveSchemeSpecialRewardStepProps> = ({ }) => {
    const { control, watch } = useFormContext<CreateIncentiveSchemeInput>();
    const { append: appendSpecialRewardCalculationRangeList, remove: removeSpecialRewardCalculationRangeList } = useFieldArray({
        control,
        name: 'specialRewardCalculationList',
    });
    const specialRewardCalculationList = watch("specialRewardCalculationList")
    const specialRewardCalculationUnitWatch = watch("specialRewardCalculationUnit")

    const sepcialRewardCalculationColumns = useMemo(() => {
        return getSepcialRewardCalculationColumns(control)
    }, [control])

    return (
        <div className="flex flex-col space-y-6">
            <p className="text-start font-semibold">3. การคำนวณ Incentive เงินรางวัลพิเศษ</p>

            <FormField
                control={control}
                name="specialRewardCalculationMethod"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-9">
                        <FormLabel className="col-start-1 col-span-1 flex justify-end items-center font-semibold mr-2">วิธีการคำนวณ :</FormLabel>
                        <FormControl className="col-span-3">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex !mt-0"
                            >
                                {IncentiveManageCalculationMethodOptions.map((item, index) => (
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

            <FormField
                control={control}
                name="specialRewardCalculationUnit"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-9">
                        <FormLabel className="col-start-1 col-span-1 flex justify-end items-center font-semibold mr-2">หน่วยของค่าแรงจูงใจ :</FormLabel>
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
                columns={sepcialRewardCalculationColumns}
                data={specialRewardCalculationList}
                showPaginationControl={false}
                meta={{
                    addRowButton: () => {
                        const addRowHandler = () => {
                            appendSpecialRewardCalculationRangeList({ minSale: undefined, maxSale: undefined, totalReward: undefined })
                        };

                        return (
                            <Button onClick={addRowHandler} variant="outline" className="border-dashed" type="button">
                                <Plus className="mr-2" /> เพิ่มช่วง
                            </Button>
                        );
                    },
                    specialRewardCalculationUnit: specialRewardCalculationUnitWatch,
                    removeRow: removeSpecialRewardCalculationRangeList
                }}
            />
        </div>
    )
}

export default CreateIncentiveSchemeSpecialRewardStep;