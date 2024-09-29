import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';
import { TargetBranchDetail, useFetchTargetBranchDetailList } from '../../api/use-fetch-target-branch-detail-list';
import { useNavigate } from 'react-router-dom';
import { useDeleteTargetBranch } from '../../api/use-delete-target-branch';
import { toast } from 'react-toastify';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useModalContext } from '@/app/providers/modal-provider';

interface TargetBranchActionMenusProps {
    targetBranchDetail: TargetBranchDetail;
}

const TargetBranchActionMenus: React.FC<TargetBranchActionMenusProps> = ({ targetBranchDetail }) => {
    const navigate = useNavigate();
    const { refetch: refetchTargetBranch } = useFetchTargetBranchDetailList();

    const onDeleteTargetBranchSuccess = () => {
        toast.success(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-green-400">ลบข้อมูลสำเร็จ</p>
                <p className="mt-2 text-xs">ลบข้อมูลเป้าสาขาเรียบร้อย</p>
            </div>,
            { position: 'bottom-right' },
        );
        refetchTargetBranch();
    };

    const onDeleteTargetBranchError = () => {
        toast.error(
            <div className="flex flex-col text-start">
                <p className="text-sm font-bold text-ref-400">ลบข้อมูลไม่สำเร็จ</p>
                <p className="mt-2 text-xs">ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
            </div>,
            { position: 'bottom-right' },
        );
    };

    const { mutate: deleteTargetBranch } = useDeleteTargetBranch({
        onSuccess: onDeleteTargetBranchSuccess,
        onError: onDeleteTargetBranchError,
    });
    const { openModal, closeModal } = useModalContext();

    const onEditHandler = () => {
        navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}`);
    };

    const onDeleteHandler = () => {
        console.log('🚀 ~ onDeleteHandler ~ targetBranchDetail:', targetBranchDetail);

        openModal({
            title: (
                <div className="flex items-center gap-2">
                    <InfoCircledIcon className="w-6 h-6" color="orange" /> <span>ยืนยันลบเป้าสาขา ?</span>
                </div>
            ),
            content: 'เมื่อลบข้อมูลเป้าหมายของเดือน มกราคม 2024 จะไม่สามารถกู้คืนได้',
            confirmTitle: 'ใช่, ลบ',
            confirmClassName: 'bg-red-500',
            showCancelButton: true,
            onConfirm: () => {
                deleteTargetBranch(targetBranchDetail.id);
                closeModal();
            },
        });
    };

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    <Ellipsis />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>ดูรายละเอียด</MenubarItem>
                    <MenubarItem onClick={onEditHandler}>แก้ไข</MenubarItem>
                    <MenubarItem className="text-red-500" onClick={onDeleteHandler}>
                        ลบ
                    </MenubarItem>
                    <MenubarItem>ดาวน์โหลด Store Report</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default TargetBranchActionMenus;
