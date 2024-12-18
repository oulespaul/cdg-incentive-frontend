import { ROLES } from '@/types/auth';
import {
    TARGET_BRANCH_PATH,
    TARGET_BRANCH_MANAGE_PATH,
    TARGET_BRANCH_REVIEW_APPROVE_PATH,
    TARGET_BRANCH_REVIEW_APPROVE_DETAIL_PATH,
    TARGET_COMMISSION_PATH,
    EMPLOYEE_MANAGEMENT,
    INCENTIVE_SCHEME_MANAGEMENT,
} from './route-path';

interface RoutePermission {
    path: string;
    allowedRoles: ROLES[];
}

export const routePermissions: RoutePermission[] = [
    { path: TARGET_COMMISSION_PATH, allowedRoles: [ROLES.ONE_DATA] },
    { path: TARGET_BRANCH_PATH, allowedRoles: [ROLES.BRANCH] },
    { path: TARGET_BRANCH_MANAGE_PATH, allowedRoles: [ROLES.BRANCH] },
    { path: TARGET_BRANCH_REVIEW_APPROVE_PATH, allowedRoles: [ROLES.ONE_DATA] },
    { path: TARGET_BRANCH_REVIEW_APPROVE_DETAIL_PATH, allowedRoles: [ROLES.ONE_DATA] },
    { path: EMPLOYEE_MANAGEMENT, allowedRoles: [ROLES.INCENTIVE] },
    { path: INCENTIVE_SCHEME_MANAGEMENT, allowedRoles: [ROLES.INCENTIVE] },
];

export const getRoutePermissionByPath = (path: string): RoutePermission | undefined => {
    return routePermissions.find(route => route.path === path);
};
