import { EMPLOYEE_MANAGEMENT, TARGET_BRANCH_PATH, TARGET_COMMISSION_PATH } from '@/constants/route-path';

export interface AppUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    isActive: boolean;
    branch?: UserBranch;
    role: Role;
}

export interface UserBranch {
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
    OneData: TARGET_COMMISSION_PATH,
    Branch: TARGET_BRANCH_PATH,
    Incentive: EMPLOYEE_MANAGEMENT,
};
