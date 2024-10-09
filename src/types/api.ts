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