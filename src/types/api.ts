export interface PaginationStateRequest {
    page: string;
    pageSize: string;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Page<T> {
    content: T[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}


// Department
export interface Department {
    id: number;
    departmentCode: string;
    departmentName: string;
}


// TargetCommission
export type TargetCommission = {
    id: number;
    month: string;
    year: string;
    branchId: number;
    branchBU: string;
    branchNumber: string;
    branchName: string;
    branchCode: string;
    targetCommission: number;
};

export interface TargetBranchDetail {
    id: number;
    year: string;
    month: string;
    branchBU: string;
    branchNumber: string;
    branchName: string;
    branchCode: string;
    targetCommission: number;
    actualSalesLyTotal: number;
    targetID: number;
    actualLyID: number;
    changeTargetCommissionPercentage: number;
    changeTargetIDPercentage: number;
    status: string;
}

// Employee
export type Employee = {
    id: number;
    year: string;
    month: string;
    businessUnit: string;
    company: string;
    branch: string;
    branchDescription: string;
    employeeId: string;
    hireDate: string;
    employeeGroup: string;
    positionDescription: string;
    costCenter: string;
    corporateTitle: string;
    terminatedDate: string | null;
    scheme: string;
    newCostCenter: string;
    brandId: string | null;
    branchNo: string;
    dayWorking: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    updatedBy: string | null;
};

// Branch
export interface Branch {
    id: number;
    bu: string;
    brand: string;
    segment: string;
    name: string;
    regionName: string;
    type: string;
    branchNumber: string;
    branchCode: string;
    createdAt: null;
    createdBy: string;
    updatedAt: null;
    updatedBy: string;
}

// IncentiveScheme
export interface IncentiveScheme {
    id: number;
    schemeKey: string;
    schemeName: string;
    targetUsing: string;
    isCanCalculateShrinkgate: boolean;
    isRequireBrandData: boolean;
    incentiveSegments: IncentiveSegment[];
    departments: Department[];
}

interface IncentiveSegment {
    id: number;
    name: string;
    isActive: boolean;
}