import {
    EMPLOYEE_MANAGEMENT,
    TARGET_BRANCH_PATH,
    TARGET_BRANCH_REVIEW_APPROVE_PATH,
    TARGET_COMMISSION_PATH,
} from '@/constants/route-path';
import { getRoutePermissionByPath } from '@/constants/route-permission';
import { Briefcase, Calculator, CheckCircle, LucideIcon, Star } from 'lucide-react';

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
                    href: TARGET_COMMISSION_PATH,
                    label: 'นำเข้าเป้า commission (เป้าสาขา)',
                    active: pathname.includes(TARGET_COMMISSION_PATH),
                    icon: Star,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(TARGET_COMMISSION_PATH)?.allowedRoles || [],
                },
                {
                    href: TARGET_BRANCH_PATH,
                    label: 'จัดการเป้าสาขา',
                    active:
                        pathname.includes(TARGET_BRANCH_PATH) && !pathname.includes(TARGET_BRANCH_REVIEW_APPROVE_PATH),
                    icon: Calculator,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(TARGET_BRANCH_PATH)?.allowedRoles || [],
                },
                {
                    href: TARGET_BRANCH_REVIEW_APPROVE_PATH,
                    label: 'ตรวจสอบและอนุมัติเป้าสาขา',
                    active: pathname.includes(TARGET_BRANCH_REVIEW_APPROVE_PATH),
                    icon: CheckCircle,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(TARGET_BRANCH_REVIEW_APPROVE_PATH)?.allowedRoles || [],
                },
                {
                    href: EMPLOYEE_MANAGEMENT,
                    label: 'จัดการข้อมูลพนักงานห้าง',
                    active: pathname.includes(EMPLOYEE_MANAGEMENT),
                    icon: Briefcase,
                    submenus: [],
                    allowedRoles: getRoutePermissionByPath(EMPLOYEE_MANAGEMENT)?.allowedRoles || [],
                },
            ],
        },
    ];
}
