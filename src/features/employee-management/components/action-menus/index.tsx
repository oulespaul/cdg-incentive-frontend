import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';
import { Employee } from '@/types/api';
import EmployeeDetailDialog from '../employee-detail-dialog';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useDeleteEmployeeById } from '../../api/use-delete-employee';
import { showErrorToast, showSuccessToast } from '@/lib/toast-utils';
import { useModalContext } from '@/app/contexts/modal-context';
import { useDuplicateEmployeeId } from '../../api/use-duplicate-employee';

interface EmployeeActionMenusProps {
    employee: Employee;
}

const EmployeeActionMenus: React.FC<EmployeeActionMenusProps> = ({ employee }) => {
    const { close, open, isOpen } = useDisclosure();
    const { openModal, closeModal } = useModalContext();

    const deleteEmployeeById = useDeleteEmployeeById({
        onSuccess: () => {
            showSuccessToast('ลบข้อมูลสำเร็จ', 'ลบข้อมูลพนักงานเรียบร้อย');
        },
        onError: () => {
            showErrorToast('ลบข้อมูลไม่สำเร็จ', 'ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        },
    });

    const duplicateEmployee = useDuplicateEmployeeId({
        onSuccess: () => {
            showSuccessToast('คัดลอกข้อมูลพนักงานสำเร็จ', 'คัดลอกข้อมูลพนักงานเรียบร้อย');
        },
        onError: () => {
            showErrorToast('คัดลอกข้อมูลพนักงานไม่สำเร็จ', 'ไม่สามารถคัดลอกข้อมูลพนักงานได้ กรุณาลองใหม่อีกครั้ง');
        },
    });

    const onEditHandler = () => {
        // navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}/edit`);
    };

    const onDuplicateHandler = () => {
        openModal({
            title: 'ต้องการคัดลอกข้อมูลพนักงาน ?',
            content: 'การคัดลอกข้อมูลพนักงานใหม่จะทำให้มีข้อมูลพนักงานเดิมซ้ำกัน',
            confirmTitle: 'ใช่, คัดลอก',
            showCancelButton: true,
            onConfirm: () => {
                duplicateEmployee.mutate(employee.id);
                closeModal();
            },
        });
    };

    const onDeleteHandler = () => {
        openModal({
            title: 'ยืนยันลบพนักงาน ?',
            content: 'เมื่อลบข้อมูลพนักงาน จะไม่สามารถกู้คืนได้',
            confirmTitle: 'ใช่, ลบ',
            confirmClassName: 'bg-red-500',
            showCancelButton: true,
            onConfirm: () => {
                deleteEmployeeById.mutate(employee.id);
                closeModal();
            },
        });
    };

    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Ellipsis />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={open}>ดูรายละเอียด</MenubarItem>
                        <MenubarItem onClick={onEditHandler}>แก้ไข</MenubarItem>
                        <MenubarItem onClick={onDuplicateHandler}>Duplicate</MenubarItem>
                        <MenubarItem className="text-red-500" onClick={onDeleteHandler}>
                            ลบ
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <EmployeeDetailDialog employeeId={employee.id} isOpen={isOpen} onClose={close} />
        </>
    );
};

export default EmployeeActionMenus;
