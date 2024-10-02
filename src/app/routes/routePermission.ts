interface RoutePermission {
    path: string;
    allowedRoles: string[];
}

export const routePermissions: RoutePermission[] = [
    { path: '/app/target-commission', allowedRoles: ['OneData'] },
    { path: '/app/target-branch', allowedRoles: ['Branch'] },
    { path: '/app/target-branch/manage', allowedRoles: ['Branch'] },
    { path: '/app/target-branch/review-approve', allowedRoles: ['OneData'] },
    { path: '/app/target-branch/review-approve/detail', allowedRoles: ['OneData'] },
];

export const getRoutePermissionByPath = (path: string): RoutePermission | undefined => {
    return routePermissions.find(route => route.path === path);
};
