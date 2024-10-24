import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Ellipsis } from 'lucide-react';

interface IncentiveSchemeActionMenusProps {
}

const IncentiveSchemeActionMenu: React.FC<IncentiveSchemeActionMenusProps> = () => {
    const onViewHandler = () => {

    };

    const onEditHandler = () => {

    };

    const onDuplicateHandler = () => {

    };

    const onDeleteHandler = () => {

    };

    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Ellipsis />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={onViewHandler}>ดูรายละเอียด</MenubarItem>
                        <MenubarItem onClick={onEditHandler}>แก้ไข</MenubarItem>
                        <MenubarItem onClick={onDuplicateHandler}>Duplicate</MenubarItem>
                        <MenubarItem className="text-red-500" onClick={onDeleteHandler}>
                            ลบ
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>
    );
};

export default IncentiveSchemeActionMenu;
