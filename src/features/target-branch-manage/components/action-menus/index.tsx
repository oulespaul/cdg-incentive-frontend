import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTargetBranchManage } from '../../hooks/use-target-branch-manage';
import { TargetBranchDetail } from '@/types/api';

interface TargetBranchActionMenusProps {
    targetBranchDetail: TargetBranchDetail;
}

const TargetBranchActionMenus: React.FC<TargetBranchActionMenusProps> = ({ targetBranchDetail }) => {
    const navigate = useNavigate();
    const { deleteTargetBranchHandler } = useTargetBranchManage();

    const onViewHandler = () => {
        navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}/view`);
    };

    const onEditHandler = () => {
        navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}/edit`);
    };

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    <Ellipsis />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={onViewHandler}>ดูรายละเอียด</MenubarItem>
                    <MenubarItem onClick={onEditHandler}>แก้ไข</MenubarItem>
                    <MenubarItem
                        className="text-red-500"
                        onClick={() => deleteTargetBranchHandler(targetBranchDetail.id)}
                    >
                        ลบ
                    </MenubarItem>
                    <MenubarItem>ดาวน์โหลด Store Report</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default TargetBranchActionMenus;
