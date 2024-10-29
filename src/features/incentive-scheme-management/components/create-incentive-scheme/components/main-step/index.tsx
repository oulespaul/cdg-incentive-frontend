import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFetchDepartment } from "@/features/department/api/use-fetch-department"
import { CreateIncentiveSchemeInput } from "@/features/incentive-scheme-management/api/use-create-incentive-scheme"
import { useFetchIncentiveSegmentActive } from "@/features/incentive-scheme-management/api/use-fetch-incentive-segment-list"
import { IncentiveManageCalculationStepOptions } from "@/features/incentive-scheme-management/constants/incentive-manage-calculation-step-options"
import { IncentiveManageIsRequireBrandDataOptions } from "@/features/incentive-scheme-management/constants/incentive-manage-is-require-brand-data-options"
import { IncentiveManageShrinkgateCalculateOptions } from "@/features/incentive-scheme-management/constants/incentive-manage-shrinkgate-calculate-options"
import { IncentiveManageTargetUsingOptions } from "@/features/incentive-scheme-management/constants/incentive-manage-target-using-options"
import React from "react"
import { Control } from "react-hook-form"

interface CreateIncentiveSchemeMainStepProps {
    control: Control<CreateIncentiveSchemeInput>;
}

const CreateIncentiveSchemeMainStep: React.FC<CreateIncentiveSchemeMainStepProps> = ({ control }) => {
    const { data: incentiveSegmentList } = useFetchIncentiveSegmentActive()
    const { data: departmentList } = useFetchDepartment();

    return (
        <div className="flex flex-col space-y-6">
            <FormField
                control={control}
                name="schemeKey"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end items-center font-semibold mr-2">
                            ชื่อ key :
                        </FormLabel>
                        <FormControl>
                            <Input className="col-span-3" {...field} />
                        </FormControl>
                        <FormMessage className="col-start-2 col-span-3 text-start" />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="targetUsing"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end items-center font-semibold mr-2">Target ที่ใช้ :</FormLabel>
                        <FormControl className="col-span-3">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex !mt-0"
                            >
                                {IncentiveManageTargetUsingOptions.map((item, index) => (
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
                name="segmentIdList"
                render={() => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end font-semibold mr-2">Segment ของสาขาที่ใช้คำนวณ :</FormLabel>
                        <div className="flex items-center col-span-3 space-x-3 !mt-0">
                            {incentiveSegmentList?.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={control}
                                    name="segmentIdList"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-2 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id as never)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.name}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage className="col-start-2 col-span-3 text-start" />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="departmentIdList"
                render={() => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end font-semibold mr-2">Department ที่ใช้คำนวณ :</FormLabel>
                        <div className="col-span-3 space-y-2 !mt-0">
                            {departmentList?.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={control}
                                    name="departmentIdList"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id as never)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.departmentCode} - {item.departmentName}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage className="col-start-2 col-span-3 text-start" />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="stepCalculationList"
                render={() => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end font-semibold mr-2">Step การคำนวณ :</FormLabel>
                        <div className="col-span-3 space-y-2 !mt-0">
                            {IncentiveManageCalculationStepOptions?.map((item) => (
                                <FormField
                                    key={item.value}
                                    control={control}
                                    name="stepCalculationList"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.value as never)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.value])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.value
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage className="col-start-2 col-span-3 text-start" />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="isCalculateShrinkgate"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end items-center font-semibold mr-2">คำนวณค่าสินค้าสูญหายหรือไม่ :</FormLabel>
                        <FormControl className="col-span-3">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex !mt-0"
                            >
                                {IncentiveManageShrinkgateCalculateOptions.map((item, index) => (
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
                name="isRequireBrandData"
                render={({ field }) => (
                    <FormItem className="grid grid-cols-4">
                        <FormLabel className="col-span-1 flex justify-end items-center font-semibold mr-2">ต้องการข้อมูล Brand ในการคำนวณหรือไม่ </FormLabel>
                        <FormControl className="col-span-3">
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex !mt-0"
                            >
                                {IncentiveManageIsRequireBrandDataOptions.map((item, index) => (
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
        </div>
    )
}

export default CreateIncentiveSchemeMainStep;