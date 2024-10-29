import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useModalContext } from "@/app/contexts/modal-context"
import { CreateIncentiveSchemeInput, createIncentiveSchemeInputSchema, useCreateIncentiveScheme } from "../../api/use-create-incentive-scheme"
import _ from "lodash"
import { showSuccessToast } from "@/lib/toast-utils"
import CreateIncentiveSchemeMainStep from "./components/main-step"
import CreateIncentiveSchemeMajorStep from "./components/major-step"
import { useState } from "react"
import CreateIncentiveSchemeMinorStep from "./components/minor-step"
import CreateIncentiveSchemeSpecialRewardStep from "./components/special-reward-step"

const CreateIncentiveScheme = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const { openModal, closeModal } = useModalContext();
    const navigate = useNavigate();

    const createIncentiveScheme = useCreateIncentiveScheme({
        onSuccess: () => {
            showSuccessToast('สร้าง Scheme สำเร็จ', 'บันทึกข้อมูล Scheme เรียบร้อย');
            navigate('/app/incentive-scheme-management')
        }
    })

    const onCancelHandler = () => {
        // Need confirmation modal
        navigate('/app/incentive-scheme-management')
    }

    const onSubmitHandler = (values: CreateIncentiveSchemeInput) => {
        openModal({
            title: 'ยืนยันการสร้าง Scheme',
            content: 'คุณต้องการบันทึกข้อมูล Scheme หรือไม่?',
            showCancelButton: true,
            onConfirm: () => {
                createIncentiveScheme.mutate({ data: values });
                closeModal();
            },
        });
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
                    majorCalculationUnit: '',
                    minorCalculationUnit: '',
                    specialRewardCalculationUnit: '',
                    specialRewardCalculationMethod: '',
                    majorGroupCalculationList: [],
                    majorCalculationRangeList: [],
                    // specialRewardCalculationList: [],
                },
            }}
        >
            {({ control, watch }) => {
                const stepCalculationListWatch = watch("stepCalculationList") as string[]
                return (
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
                                {step === 1 && <CreateIncentiveSchemeMainStep control={control} />}

                                {step === 2 && stepCalculationListWatch.includes("MAJOR") && <CreateIncentiveSchemeMajorStep />}

                                {step === 3 && stepCalculationListWatch.includes("MAJOR") && stepCalculationListWatch.includes("MINOR") && (
                                    <CreateIncentiveSchemeMinorStep />
                                )}

                                {step === 4 && stepCalculationListWatch.includes("SPECIAL_REWARD") && stepCalculationListWatch.includes("MINOR") && (
                                    <CreateIncentiveSchemeSpecialRewardStep />
                                )}

                                <div className="flex justify-between mt-4">
                                    {[2, 3, 4].includes(step) ? (
                                        <Button type="button" variant="secondary" onClick={prevStep}>
                                            ย้อนกลับ
                                        </Button>
                                    ) : (
                                        <Button type="button" variant="secondary" onClick={onCancelHandler}>
                                            ยกเลิก
                                        </Button>
                                    )}

                                    {step === 5 ? (
                                        <Button type="submit">ยืนยันบันทึก</Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={nextStep}
                                            disabled={step === 1 && stepCalculationListWatch.length === 0}
                                        >
                                            ถัดไป
                                        </Button>
                                    )}
                                </div>
                            </Card>

                        </div>
                    </>
                )
            }}
        </Form >
    )
}

export default CreateIncentiveScheme