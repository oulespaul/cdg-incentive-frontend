import { ROLES } from '@/types/auth';
import {
    TARGET_BRANCH,
    TARGET_BRANCH_MANAGE,
    TARGET_BRANCH_REVIEW_APPROVE,
    TARGET_BRANCH_REVIEW_APPROVE_DETAIL,
    TARGET_COMMISSION,
} from './route-path';

interface RoutePermission {
    path: string;
    allowedRoles: ROLES[];
}

export const routePermissions: RoutePermission[] = [
    { path: TARGET_COMMISSION, allowedRoles: [ROLES.ONE_DATA] },
    { path: TARGET_BRANCH, allowedRoles: [ROLES.BRANCH] },
    { path: TARGET_BRANCH_MANAGE, allowedRoles: [ROLES.BRANCH] },
    { path: TARGET_BRANCH_REVIEW_APPROVE, allowedRoles: [ROLES.ONE_DATA] },
    { path: TARGET_BRANCH_REVIEW_APPROVE_DETAIL, allowedRoles: [ROLES.ONE_DATA] },
];

export const getRoutePermissionByPath = (path: string): RoutePermission | undefined => {
    return routePermissions.find(route => route.path === path);
};
