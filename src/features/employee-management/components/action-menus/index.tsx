import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { Employee } from '@/types/api';

interface EmployeeActionMenusProps {
    employee: Employee;
}

const EmployeeActionMenus: React.FC<EmployeeActionMenusProps> = ({ employee }) => {
    // const navigate = useNavigate();

    const onViewHandler = () => {
        console.log('🚀 ~ employee:', employee);
        // navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}/view`);
    };

    const onEditHandler = () => {
        // navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}/edit`);
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
                    <MenubarItem>Duplicate</MenubarItem>
                    <MenubarItem
                        className="text-red-500"
                        // onClick={() => deleteTargetBranchHandler(targetBranchDetail.id)}
                    >
                        ลบ
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default EmployeeActionMenus;
