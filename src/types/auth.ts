import { TARGET_BRANCH, TARGET_COMMISSION } from '@/constants/route-path';

export interface AppUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    isActive: boolean;
    branch?: UserBranch;
    role: Role;
}

interface UserBranch {
    id: number;
    bu: string;
    brand: string;
    segment: string;
    name: string;
    regionName: string;
    type: string;
    branchNumber: string;
    branchCode: string;
}

export enum ROLES {
    ONE_DATA = 'OneData',
    INCENTIVE = 'Incentive',
    BRANCH = 'Branch',
}

interface Role {
    id: number;
    roleName: ROLES;
    description: string;
}

export const roleBasedRoutes: Record<ROLES, string> = {
    OneData: TARGET_COMMISSION,
    Branch: TARGET_BRANCH,
    Incentive: '/',
};
