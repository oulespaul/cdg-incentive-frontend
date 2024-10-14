import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { Employee } from '@/types/api';
import EmployeeDetailDialog from '../employee-detail-dialog';
import { useDisclosure } from '@/hooks/use-disclosure';

interface EmployeeActionMenusProps {
    employee: Employee;
}

const EmployeeActionMenus: React.FC<EmployeeActionMenusProps> = ({ employee }) => {
    const { close, open, isOpen } = useDisclosure();

    // const navigate = useNavigate();

    const onEditHandler = () => {
        // navigate(`/app/target-branch/manage/${targetBranchDetail.year}/${targetBranchDetail.month}/edit`);
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

            <EmployeeDetailDialog employeeId={employee.id} isOpen={isOpen} onClose={close} />
        </>
    );
};

export default EmployeeActionMenus;
