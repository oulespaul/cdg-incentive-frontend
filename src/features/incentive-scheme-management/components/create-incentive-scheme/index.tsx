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

const CreateIncentiveScheme = () => {
    const navigate = useNavigate();

    const { data: departmentList } = useFetchDepartment();

    const onCancelHandler = () => {
        // Need confirmation modal
        navigate('/app/incentive-scheme-management')
    }

    return (
        <div className="flex flex-col">
            <div className="flex w-full items-center justify-start my-4">
                <label className="w-1/12 text-start font-semibold">ชื่อ Scheme: </label>
                <Input />
            </div>
            <Card className="container py-6">
                <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-4">
                        <p className="col-span-1 flex justify-end items-center font-semibold mr-2">ชื่อ key :</p>
                        <Input className="col-span-3" value="dept" />
                    </div>

                    <div className="grid grid-cols-4">
                        <p className="col-span-1 flex justify-end items-center font-semibold mr-2">Target ที่ใช้ :</p>
                        <div className="col-span-3">
                            <RadioGroup defaultValue={IncentiveManageTargetUsingOptions[0].value} className="flex">
                                {IncentiveManageTargetUsingOptions.map((item, index) => (
                                    <div className="flex items-center space-x-2" key={`${item.value}-${index}`}>
                                        <RadioGroupItem value={item.value} id="r1" />
                                        <Label>{item.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid grid-cols-4">
                        <p className="col-span-1 flex justify-end font-semibold mr-2">Segment ของสาขาที่ใช้คำนวณ :</p>
                        <div className="col-span-3">
                            {departmentList?.map((item) => (
                                <div className="flex items-center" key={item.id}>
                                    <Checkbox
                                        checked={false}
                                        onCheckedChange={() => { }}
                                    />
                                    <p className="ml-2">
                                        {item.departmentCode} - {item.departmentName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-4">
                        <p className="col-span-1 flex justify-end font-semibold mr-2">Step การคำนวณ :</p>
                        <div className="col-span-3">
                            {IncentiveManageCalculationStepOptions?.map((item, index) => (
                                <div className="flex items-center" key={`${item.value}-${index}`}>
                                    <Checkbox
                                        checked={false}
                                        onCheckedChange={() => { }}
                                    />
                                    <p className="ml-2">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-4">
                        <p className="col-span-1 flex justify-end items-center font-semibold mr-2">คำนวณค่าสินค้าสูญหายหรือไม่ :</p>
                        <div className="col-span-3">
                            <RadioGroup defaultValue="comfortable" className="flex">
                                {IncentiveManageShrinkgateCalculateOptions?.map((item, index) => (
                                    <div className="flex items-center space-x-2" key={`${item.value}-${index}`}>
                                        <RadioGroupItem value={item.value} />
                                        <Label>{item.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid grid-cols-4">
                        <p className="col-span-1 flex justify-end items-center font-semibold mr-2">ต้องการข้อมูล Brand ในการคำนวณหรือไม่ :</p>
                        <div className="col-span-3">
                            <RadioGroup defaultValue="comfortable" className="flex">
                                {IncentiveManageIsRequireBrandDataOptions?.map((item, index) => (
                                    <div className="flex items-center space-x-2" key={`${item.value}-${index}`}>
                                        <RadioGroupItem value={item.value} />
                                        <Label>{item.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <Button variant="secondary" onClick={onCancelHandler}>ยกเลิก</Button>
                    <Button variant="outline">ถัดไป</Button>
                </div>
            </Card>
        </div>
    )
}

export default CreateIncentiveScheme