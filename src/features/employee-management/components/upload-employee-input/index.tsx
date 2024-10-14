import { DataTable } from '@/components/data-table';
import { Employee } from '@/types/api';
import { CloudDownload, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import UploadInput, { FileUploadProgress } from '@/components/upload-input';
import { showErrorToast, showSuccessToast, showWarningToast } from '@/lib/toast-utils';
import { useValidatedEmployeeUploadFile } from '../../api/use-validate-upload-employee';
import { employeeManagementList } from '../../constants/employee-list-columns';
import { useUploadEmployeeFile } from '../../api/use-upload-employee';

const UploadEmployeeInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
    const [employeePreviewList, setEmployeePreviewList] = useState<Employee[]>([]);

    const validateUploadFile = useValidatedEmployeeUploadFile({
        onSuccess: response => {
            setEmployeePreviewList(response.data);
        },
        onError: () => {
            showWarningToast('ไม่สามารถนำเข้าข้อมูลได้', 'ไฟล์ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
        },
    });

    const uploadFile = useUploadEmployeeFile({
        onSuccess: () => {
            showSuccessToast('นำเข้าข้อมูลสำเร็จ', 'นำเข้าข้อมูล พนักงานห้าง เรียบร้อย');
            resetState();
        },
        onError: () => {
            showErrorToast('ข้อมูลไม่ถูกต้อง', 'ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
        },
    });

    const onUploadfileForValidateHandler = (file: File) => {
        validateUploadFile.mutate(file);
    };

    const onUploadfileHandler = (file: File) => {
        uploadFile.mutate(file);
    };

    const resetState = () => {
        setFilesToUpload([]);
        setEmployeePreviewList([]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button className="bg-gradient-to-l from-cyan-500 to-blue-500">
                    <CloudDownload className="mr-2 h-4 w-4" />
                    นำเข้าข้อมูลพนักงาน
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-start">นำเข้าข้อมูลพนักงานห้าง</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {employeePreviewList.length > 0 ? (
                        <div className="h-[600px] overflow-y-auto">
                            <DataTable
                                columns={employeeManagementList}
                                data={employeePreviewList}
                                manualPagination={false}
                                columnVisibility={{ action: false }}
                            />
                        </div>
                    ) : (
                        <UploadInput filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload} />
                    )}
                    <div className="flex justify-between mt-8">
                        <Button
                            disabled={uploadFile.isPending}
                            variant="secondary"
                            className="text-black hover:text-black hover:border-black"
                            onClick={() => resetState()}
                        >
                            ยกเลิก
                        </Button>
                        {validateUploadFile.isSuccess && employeePreviewList.length !== 0 ? (
                            <Button
                                disabled={uploadFile.isPending}
                                onClick={() => {
                                    onUploadfileHandler(filesToUpload[0]?.File);
                                }}
                            >
                                ยืนยัน {uploadFile.isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                className="text-primary hover:text-primary"
                                disabled={filesToUpload.length === 0 || validateUploadFile.isPending}
                                onClick={() => {
                                    onUploadfileForValidateHandler(filesToUpload[0]?.File);
                                }}
                            >
                                ถัดไป{' '}
                                {validateUploadFile.isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UploadEmployeeInput;
