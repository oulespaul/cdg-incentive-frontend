import { Calculator, LucideIcon, Star } from 'lucide-react';

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: '/app/target-commission',
                    label: 'นำเข้าเป้า commission (เป้าสาขา)',
                    active: pathname.includes('/app/target-commission'),
                    icon: Star,
                    submenus: [],
                },
                {
                    href: '/app/target-branch',
                    label: 'จัดการเป้าสาขา',
                    active: pathname.includes('/app/target-branch'),
                    icon: Calculator,
                    submenus: [],
                },
            ],
        },
    ];
}
