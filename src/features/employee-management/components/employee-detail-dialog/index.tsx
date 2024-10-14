import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFetchEmployeeDetailById } from '../../api/use-fetch-employee-detail-by-id';
import { DD_MM_YYYY, formatDate } from '@/lib/date-utils';
import _ from 'lodash';

interface EmployeeDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    employeeId: number | undefined;
}

const EmployeeDetailDialog = ({ isOpen, onClose, employeeId }: EmployeeDetailDialogProps) => {
    const { data: employee } = useFetchEmployeeDetailById(isOpen ? employeeId : undefined);

    if (!employee) return null;

    return (
        <Dialog open={isOpen}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>รายละเอียดข้อมูลพนักงานห้าง</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">รหัสพนักงาน</p>
                            <p>{_.defaultTo(employee.employeeId, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">New Cost Center</p>
                            <p>{_.defaultTo(employee.newCostCenter, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">กลุ่มพนักงาน</p>
                            <p>{_.defaultTo(employee.employeeGroup, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">Business Unit</p>
                            <p>{_.defaultTo(employee.businessUnit, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">ตำแหน่ง</p>
                            <p>{_.defaultTo(employee.positionDescription, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">Scheme</p>
                            <p>{_.defaultTo(employee.scheme, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">จำนวนวันที่ทำงาน(วัน)</p>
                            <p>{_.defaultTo(employee.dayWorking, '-')}</p>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">Cost Center</p>
                            <p>{_.defaultTo(employee.costCenter, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">Brand ID</p>
                            <p>{_.defaultTo(employee.brandId, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">ประเภทพนักงาน</p>
                            <p>{_.defaultTo(employee.corporateTitle, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">สาขา</p>
                            <p>
                                {employee.branchNo} - {employee.branchDescription}
                            </p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">วันที่เริ่มงาน</p>
                            <p>{formatDate(employee.hireDate, DD_MM_YYYY)}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">Brand</p>
                            <p>{_.defaultTo(employee.brandId, '-')}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">วันที่ออก</p>
                            <p>{_.defaultTo(employee.terminatedDate, '-')}</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex sm:justify-center">
                    <Button variant="outline" onClick={onClose}>
                        ปิด
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDetailDialog;
