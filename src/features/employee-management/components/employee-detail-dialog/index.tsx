import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFetchEmployeeDetailById } from '../../api/use-fetch-employee-detail-by-id';
import { DD_MM_YYYY, formatDate, YYYY_MM_DD_DASH } from '@/lib/date-utils';
import _ from 'lodash';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { updateEmployeeInputSchema, useUpdateEmployee } from '../../api/use-update-employee';
import { showSuccessToast } from '@/lib/toast-utils';
import { SelectScrollable } from '@/components/select-scrollable';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { useModalContext } from '@/app/contexts/modal-context';
import { getThaiMonthName } from '@/lib/month-utils';
import { useFetchBrand } from '@/features/brand/api/use-fetch-branch';
import { toFilterOption } from '@/lib/filter-option-utils';
import { useMemo } from 'react';
import { useFetchEmployeeFilter } from '../../api/use-fetch-employee-filters';
import { useFetchBranchList } from '@/features/branch/api/use-fetch-branch-list';

interface EmployeeDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    employeeId: number | undefined;
    isEditMode: boolean;
}

const EmployeeDetailDialog = ({ isOpen, onClose, employeeId, isEditMode }: EmployeeDetailDialogProps) => {
    const { openModal, closeModal } = useModalContext();

    const { data: brandList } = useFetchBrand({ queryConfig: { enabled: isEditMode } });
    const { data: employeeGoupOptions } = useFetchEmployeeFilter('employeeGroup');
    const { data: positionDescriptionOptions } = useFetchEmployeeFilter('positionDescription');
    const { data: corporateTitleOptions } = useFetchEmployeeFilter('corporateTitle');
    const { data: branchList } = useFetchBranchList();

    const { data: employee } = useFetchEmployeeDetailById(isOpen ? employeeId : undefined);
    const updateEmployeeMutation = useUpdateEmployee({
        onSuccess: () => {
            showSuccessToast('แก้ไขข้อมูลพนักงานสำเร็จ', 'แก้ไขข้อมูลพนักงานเรียบร้อย');
        },
    });

    const brandOptions = useMemo(() => {
        const brandUniqueNameList = _.uniqBy(brandList, 'brandId');
        return toFilterOption(brandUniqueNameList ?? [], 'brandId', 'brandId');
    }, [brandList]);

    const branchOptions = useMemo(() => {
        const branchUniqueNameList = _.uniqBy(branchList, 'branchCode');
        return branchUniqueNameList.map(branch => ({
            value: branch.branchNumber,
            label: `${branch.branchNumber} - ${branch.name}`,
        }));
    }, [branchList]);

    const buOptions = useMemo(() => {
        const branchUniqueNameList = _.uniqBy(branchList, 'bu');
        return toFilterOption(branchUniqueNameList ?? [], 'bu', 'bu');
    }, [branchList]);

    if (!employee || !employeeId) return null;

    const onSubmitHandler = (values: any) => {
        openModal({
            title: 'ยืนยันการแก้ไขข้อมูลพนักงาน',
            content: 'คุณต้องการแก้ไขข้อมูลพนักงานหรือไม่?',
            showCancelButton: true,
            onConfirm: () => {
                updateEmployeeMutation.mutate({ id: employeeId, data: values });
                closeModal();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent className="max-w-3xl">
                <Form
                    id="update-employee-form"
                    onSubmit={onSubmitHandler}
                    schema={updateEmployeeInputSchema}
                    options={{
                        defaultValues: {
                            employeeId: employee.employeeId ?? '',
                            newCostCenter: employee.newCostCenter ?? '',
                            employeeGroup: employee.employeeGroup ?? '',
                            businessUnit: employee.businessUnit ?? '',
                            positionDescription: employee.positionDescription ?? '',
                            brandId: employee.brandId ?? '',
                            corporateTitle: employee.corporateTitle ?? '',
                            branchNo: employee.branchNo ?? '',
                            scheme: employee.scheme ?? '',
                            costCenter: employee.costCenter ?? '',
                            dayWorking: employee.dayWorking ?? 0,
                            terminatedDate: employee.terminatedDate ?? undefined,
                            hireDate: employee.hireDate ?? '',
                        },
                    }}
                >
                    {({ control }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>รายละเอียดข้อมูลพนักงานห้าง</DialogTitle>
                            </DialogHeader>

                            <div className="mb-4">
                                <p className="text-gray-500">เดือนปีข้อมูล</p>
                                <p className="text-blue-600">
                                    {getThaiMonthName(formatDate(employee.month, 'MM'))}{' '}
                                    {formatDate(employee.year, 'YYYY')}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-2">
                                <div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="employeeId"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        รหัสพนักงาน
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <Input {...field} />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.employeeId, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="newCostCenter"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        New Cost Center{' '}
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <Input {...field} />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.newCostCenter, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="employeeGroup"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        กลุ่มพนักงาน
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={employeeGoupOptions ?? []}
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.employeeGroup, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="businessUnit"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        Business Unit
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={[
                                                                    ...buOptions,
                                                                    { label: field.value, value: field.value },
                                                                ]}
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.businessUnit, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="positionDescription"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        ตำแหน่ง
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={positionDescriptionOptions ?? []}
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.positionDescription, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="scheme"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">Scheme</FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={
                                                                    field.value
                                                                        ? [{ label: field.value, value: field.value }]
                                                                        : []
                                                                }
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.scheme, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="dayWorking"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        จำนวนวันที่ทำงาน(วัน)
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                onChange={e => field.onChange(Number(e.target.value))}
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.dayWorking, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="costCenter"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        Cost Center
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <Input {...field} />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.costCenter, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="brandId"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">Brand ID</FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable {...field} options={brandOptions} />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.brandId, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="corporateTitle"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        ประเภทพนักงาน
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={corporateTitleOptions ?? []}
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.corporateTitle, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="branchNo"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">
                                                        สาขา
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={branchOptions ?? []}
                                                            />
                                                        ) : (
                                                            <p>
                                                                {employee.branchNo} - {employee.branchDescription}
                                                            </p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="hireDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-gray-500">
                                                        วันที่เริ่มงาน
                                                        {isEditMode && <span className="text-red-500">*</span>}
                                                    </FormLabel>
                                                    {isEditMode ? (
                                                        <Popover modal>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outlineBlack"
                                                                        className={cn(
                                                                            'pl-3 text-left font-normal',
                                                                            !field.value && 'text-muted-foreground',
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            formatDate(field.value, DD_MM_YYYY)
                                                                        ) : (
                                                                            <span>ระบุวันที่</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={
                                                                        field.value ? new Date(field.value) : undefined
                                                                    }
                                                                    onSelect={(date: Date | undefined) => {
                                                                        field.onChange(
                                                                            formatDate(date, YYYY_MM_DD_DASH),
                                                                        );
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : (
                                                        <p>{formatDate(employee.hireDate, DD_MM_YYYY)}</p>
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="brandId"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormLabel className="text-gray-500">Brand</FormLabel>
                                                    <FormControl>
                                                        {isEditMode ? (
                                                            <SelectScrollable
                                                                {...field}
                                                                options={
                                                                    field.value
                                                                        ? [{ label: field.value, value: field.value }]
                                                                        : []
                                                                }
                                                            />
                                                        ) : (
                                                            <p>{_.defaultTo(employee.brandId, '-')}</p>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormField
                                            control={control}
                                            name="terminatedDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-gray-500">วันที่ออก</FormLabel>
                                                    {isEditMode ? (
                                                        <Popover modal>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outlineBlack"
                                                                        className={cn(
                                                                            'pl-3 text-left font-normal',
                                                                            !field.value && 'text-muted-foreground',
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            formatDate(field.value, DD_MM_YYYY)
                                                                        ) : (
                                                                            <span>ระบุวันที่</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={
                                                                        field.value ? new Date(field.value) : undefined
                                                                    }
                                                                    onSelect={(date: Date | undefined) => {
                                                                        field.onChange(
                                                                            formatDate(date, YYYY_MM_DD_DASH),
                                                                        );
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : (
                                                        <p>{_.defaultTo(employee.terminatedDate, '-')}</p>
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter
                                className={cn('flex sm:justify-center', isEditMode ? 'sm:justify-between' : '')}
                            >
                                {isEditMode ? (
                                    <Button variant="secondary" onClick={onClose}>
                                        ยกเลิก
                                    </Button>
                                ) : (
                                    <Button variant="outline" onClick={onClose}>
                                        ปิด
                                    </Button>
                                )}

                                {isEditMode && <Button type="submit">บันทึกข้อมูล</Button>}
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDetailDialog;
