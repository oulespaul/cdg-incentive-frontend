import { DataTable } from '@/components/data-table';
import { useUploadTargetCommissionFile } from '@/features/target-commission/api/use-upload-target-commission';
import { useValidatedTargetCommissionUploadFile } from '@/features/target-commission/api/use-validate-upload-target-commission';
import { targetCommissionColumns } from '@/features/target-commission/constants/target-commission-columns';
import { reOrderList } from '@/lib/list-utils';
import { TargetCommission } from '@/types/api';
import { CloudDownload, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import UploadInput, { FileUploadProgress } from '@/components/upload-input';

const UploadTargetCommissionInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
    const [targetCommissionPreviewList, setTargetCommissionPreviewList] = useState<TargetCommission[]>([]);

    const validateUploadFile = useValidatedTargetCommissionUploadFile({
        onSuccess: response => {
            setTargetCommissionPreviewList(response.data);
        },
        onError: () => {
            toast.warn(
                <div className="flex flex-col text-start">
                    <p className="text-sm font-bold text-orange-400">ไม่สามารถนำเข้าข้อมูลได้</p>
                    <p className="mt-2 text-xs">ไฟล์ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>
                </div>,
                { position: 'bottom-right' },
            );
        },
    });

    const uploadFile = useUploadTargetCommissionFile({
        onSuccess: () => {
            toast.success(
                <div className="flex flex-col text-start">
                    <p className="text-sm font-bold text-green-400">นำเข้าข้อมูลสำเร็จ</p>
                    <p className="mt-2 text-xs">นำเข้าข้อมูลเป้า commission เรียบร้อย</p>
                </div>,
                { position: 'bottom-right' },
            );
            resetState();
        },
        onError: () => {
            toast.error(
                <div className="flex flex-col text-start">
                    <p className="text-sm font-bold text-red-400">ข้อมูลไม่ถูกต้อง</p>
                    <p className="mt-2 text-xs">ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>
                </div>,
                { position: 'bottom-right' },
            );
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
        setTargetCommissionPreviewList([]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button className="bg-gradient-to-l from-cyan-500 to-blue-500">
                    <CloudDownload className="mr-2 h-4 w-4" />
                    นำเข้าเป้า commission
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-start">นำเข้าเป้า commission (เป้าสาขา)</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {targetCommissionPreviewList.length > 0 ? (
                        <DataTable
                            columns={targetCommissionColumns}
                            data={reOrderList(targetCommissionPreviewList, 'id')}
                            manualPagination={false}
                        />
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
                        {validateUploadFile.isSuccess && targetCommissionPreviewList.length !== 0 ? (
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

export default UploadTargetCommissionInput;
