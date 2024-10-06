import { TARGET_BRANCH, TARGET_BRANCH_REVIEW_APPROVE, TARGET_COMMISSION } from '@/constants/route-path';
import { getRoutePermissionByPath } from '@/constants/route-permission';
import { Calculator, CheckCircle, LucideIcon, Star } from 'lucide-react';

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
    allowedRoles: string[];
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
                    href: TARGET_COMMISSION,
                    label: 'นำเข้าเป้า commission (เป้าสาขา)',
                    active: pathname.includes(TARGET_COMMISSION),
                    icon: Star,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(TARGET_COMMISSION)?.allowedRoles || [],
                },
                {
                    href: TARGET_BRANCH,
                    label: 'จัดการเป้าสาขา',
                    active: pathname.includes(TARGET_BRANCH) && !pathname.includes(TARGET_BRANCH_REVIEW_APPROVE),
                    icon: Calculator,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(TARGET_BRANCH)?.allowedRoles || [],
                },
                {
                    href: TARGET_BRANCH_REVIEW_APPROVE,
                    label: 'ตรวจสอบและอนุมัติเป้าสาขา',
                    active: pathname.includes(TARGET_BRANCH_REVIEW_APPROVE),
                    icon: CheckCircle,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(TARGET_BRANCH_REVIEW_APPROVE)?.allowedRoles || [],
                },
            ],
        },
    ];
}
