import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';
import { TargetBranchDetail } from '../../api/use-fetch-target-branch-detail-list';
import { useNavigate } from 'react-router-dom';

interface TargetBranchActionMenusProps {
    targetBranchDetail: TargetBranchDetail;
}

const TargetBranchActionMenus: React.FC<TargetBranchActionMenusProps> = ({ targetBranchDetail }) => {
    const navigate = useNavigate();

    const onEditHandler = () => {
        navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}`);
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
                    <MenubarItem className="text-red-500">ลบ</MenubarItem>
                    <MenubarItem>ดาวน์โหลด Store Report</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default TargetBranchActionMenus;
