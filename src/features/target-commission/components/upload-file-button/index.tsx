import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog'
import UploadInput, { FileUploadProgress } from './components/upload-input'
import { Button } from '@/components/ui/button'
import { CloudDownload, Loader2 } from 'lucide-react'
import { useUploadTargetCommissionFile, useValidatedTargetCommissionUploadFile } from '../../hooks/use-upload-target-commission'
import { columns, TargetCommission } from '../data-table/columns'
import { DataTable } from '../data-table'
import { toast } from 'react-toastify'

const UploadFile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
    const [targetCommissionPreviewList, setTargetCommissionPreviewList] = useState<TargetCommission[]>([]);

    const onValidateSuccess = (targetCommissionList: TargetCommission[]) => {
        setTargetCommissionPreviewList(targetCommissionList)
    }
    const onValidateError = () => {
        toast.warn(
            <div className='flex flex-col text-start'>
                <p className='text-sm font-bold text-orange-400'>ไม่สามารถนำเข้าข้อมูลได้</p>
                <p className='mt-2 text-xs'>ไฟล์ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>
            </div>,
            { position: 'bottom-right' }
        )
    }
    const { mutate: validateUploadFile, isPending: validating, isSuccess } = useValidatedTargetCommissionUploadFile({ onValidateSuccess, onValidateError })

    const onUploadSuccess = () => {
        toast.success(
            <div className='flex flex-col text-start'>
                <p className='text-sm font-bold text-green-400'>นำเข้าข้อมูลสำเร็จ</p>
                <p className='mt-2 text-xs'>นำเข้าข้อมูลเป้า commission เรียบร้อย</p>
            </div>,
            { position: 'bottom-right' }
        )
        resetState()
    }
    const onUploadError = () => {
        toast.error(
            <div className='flex flex-col text-start'>
                <p className='text-sm font-bold text-red-400'>ข้อมูลไม่ถูกต้อง</p>
                <p className='mt-2 text-xs'>ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>
            </div>,
            { position: 'bottom-right' }
        )
    }
    const { mutate: uploadFile, isPending: uploading } = useUploadTargetCommissionFile({ onUploadSuccess, onUploadError })

    const onUploadfileForValidateHandler = (file: File) => {
        validateUploadFile(file)
    }

    const onUploadfileHandler = (file: File) => {
        uploadFile(file)
    }

    const resetState = () => {
        setFilesToUpload([])
        setTargetCommissionPreviewList([])
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button className="bg-gradient-to-l from-cyan-500 to-blue-500"><CloudDownload className="mr-2 h-4 w-4" />นำเข้าเป้า commission</Button>
            </DialogTrigger>
            <DialogContent className='max-w-5xl'>
                <DialogHeader>
                    <DialogTitle className="text-start">
                        นำเข้าเป้า commission (เป้าสาขา)
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {targetCommissionPreviewList.length > 0
                        ? <DataTable
                            columns={columns}
                            data={targetCommissionPreviewList.map((target, index) => ({ ...target, id: index + 1 }))}
                            manualPagination={false}
                        />
                        : <UploadInput filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload} />}
                    <div className="flex justify-between mt-8">
                        <Button
                            disabled={uploading}
                            variant="secondary"
                            className="text-black hover:text-black hover:border-black"
                            onClick={() => resetState()}
                        >
                            ยกเลิก
                        </Button>
                        {isSuccess && targetCommissionPreviewList.length !== 0
                            ? <Button
                                disabled={uploading}
                                onClick={() => {
                                    // For single file
                                    onUploadfileHandler(filesToUpload[0]?.File)
                                }}>
                                ยืนยัน {uploading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            </Button>
                            : <Button
                                variant="outline"
                                className="text-primary hover:text-primary"
                                disabled={filesToUpload.length === 0 || validating}
                                onClick={() => {
                                    // For single file
                                    onUploadfileForValidateHandler(filesToUpload[0]?.File)
                                }}>
                                ถัดไป {validating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            </Button>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UploadFile