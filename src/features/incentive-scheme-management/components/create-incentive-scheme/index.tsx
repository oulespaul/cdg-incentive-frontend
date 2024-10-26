import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFetchDepartment } from "@/features/department/api/use-fetch-department"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IncentiveManageTargetUsingOptions } from "../../constants/incentive-manage-target-using-options"
import { IncentiveManageCalculationStepOptions } from "../../constants/incentive-manage-calculation-step-options"
import { IncentiveManageShrinkgateCalculateOptions } from "../../constants/incentive-manage-shrinkgate-calculate-options"
import { IncentiveManageIsRequireBrandDataOptions } from "../../constants/incentive-manage-is-require-brand-data-options"
import { useNavigate } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useModalContext } from "@/app/contexts/modal-context"
import { createIncentiveSchemeInputSchema } from "../../api/use-create-incentive-scheme"
import _ from "lodash"
import { useFetchIncentiveSegmentActive } from "../../api/use-fetch-incentive-segment-list"

const CreateIncentiveScheme = () => {
    // const { openModal, closeModal } = useModalContext();
    const navigate = useNavigate();

    const { data: incentiveSegmentList } = useFetchIncentiveSegmentActive()
    const { data: departmentList } = useFetchDepartment();

    const onCancelHandler = () => {
        // Need confirmation modal
        navigate('/app/incentive-scheme-management')
    }

    const onSubmitHandler = (values: any) => {
        console.log("🚀 ~ onSubmitHandler ~ values:", values)
        // openModal({
        //     title: 'ยืนยันการแก้ไขข้อมูลพนักงาน',
        //     content: 'คุณต้องการแก้ไขข้อมูลพนักงานหรือไม่?',
        //     showCancelButton: true,
        //     onConfirm: () => {
        //         // updateEmployeeMutation.mutate({ id: employeeId, data: values });
        //         closeModal();
        //         // onClose();
        //     },
        // });
    };

    return (
        <Form
            id="create-incentive-scheme"
            onSubmit={onSubmitHandler}
            schema={createIncentiveSchemeInputSchema}
            options={{
                defaultValues: {
                    schemeName: '',
                    schemeKey: '',
                    targetUsing: '',
                    segmentIdList: [],
                    departmentIdList: [],
                    stepCalculationList: [],
                    isCalculateShrinkgate: '',
                    isRequireBrandData: '',
                },
            }}
        >
            {({ control }) => (
                <>
                    <div className="flex flex-col">
                        <FormField
                            control={control}
                            name="schemeName"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-12 my-4">
                                    <FormLabel className="text-md col-span-1 flex justify-center items-center font-semibold mr-2">
                                        ชื่อ Scheme:
                                    </FormLabel>
                                    <FormControl>
                                        <Input className="col-span-11" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-span-3 text-start" />
                                </FormItem>
                            )}
                        />

                        <Card className="container py-6">
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

                            <div className="flex justify-between mt-4">
                                <Button variant="secondary" onClick={onCancelHandler}>ยกเลิก</Button>
                                <Button type="submit" variant="outline">ถัดไป</Button>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </Form>
    )
}

export default CreateIncentiveScheme