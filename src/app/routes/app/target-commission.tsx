import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { useFetchTargetCommission } from "@/features/target-commission/hooks/use-fetch-target-commission";
import { useFetchTargetCommissionMonthFilter, useFetchTargetCommissionStoreFilter, useFetchTargetCommissionYearFilter } from "@/features/target-commission/hooks/use-fetch-target-commission-filters";
import UploadFile from "@/features/target-commission/components/upload-file-button";
import { FilterParams } from "@/features/target-commission/models/target-commission-filter-params";
import FilterSelect from "@/components/select";

const initialFilterParams = {
    year: undefined,
    month: undefined,
    storeNumber: undefined,
    storeCode: "",
    storeBU: ""
};

export const TargetCommissionPage = () => {
    const [filterParams, setFilterParams] = useState<FilterParams>(initialFilterParams)

    const { onPaginationChange, resetPaginationState, pagination } = usePagination();
    const { data: targetCommissionData, refetch: refetchTargetCommission } = useFetchTargetCommission({ ...filterParams, ...pagination })

    const { data: yearFilterOptions } = useFetchTargetCommissionYearFilter()
    const { data: monthFilterOptions } = useFetchTargetCommissionMonthFilter()
    const { data: storeFilterOptions } = useFetchTargetCommissionStoreFilter()

    useEffect(() => {
        refetchTargetCommission()
    }, [pagination.pageIndex, pagination.pageSize, refetchTargetCommission])

    const onFilterSelectHandler = (key: string, value: string) => {
        setFilterParams(prevFilters => ({
            ...prevFilters,
            [key]: value
        }))
    }

    const onFilterValueChangeHandler = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFilterParams(prevFilters => ({
            ...prevFilters,
            [key]: event.target.value
        }))
    }

    const onClearFilterHandler = useCallback(() => {
        resetPaginationState()
        setFilterParams(initialFilterParams)
    }, [resetPaginationState])


    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">นำเข้าเป้า commission (เป้าสาขา)</h1>
            </div>

            <div className="flex flex-col mt-4">
                <div className="flex">
                    <div className="flex w-1/2 gap-3">
                        <FilterSelect
                            value={filterParams.year}
                            options={yearFilterOptions}
                            placeholder="ปี"
                            onChange={value => onFilterSelectHandler("year", value)}
                        />
                        <FilterSelect
                            value={filterParams.month}
                            options={monthFilterOptions}
                            placeholder="เดือน"
                            onChange={value => onFilterSelectHandler("month", value)}
                        />
                        <FilterSelect
                            value={filterParams.storeNumber}
                            options={storeFilterOptions}
                            placeholder="สาขา"
                            onChange={value => onFilterSelectHandler("storeNumber", value)}
                        />
                    </div>

                    <div className="flex w-1/2 justify-end">
                        <UploadFile />
                    </div>
                </div>

                <div className="flex w-1/2 gap-2 mt-2">
                    <Input
                        type="text"
                        placeholder="Business Unit"
                        value={filterParams.storeBU}
                        onChange={(event) => onFilterValueChangeHandler("storeBU", event)}
                    />

                    <Input
                        type="text"
                        placeholder="Store Code"
                        value={filterParams.storeCode}
                        onChange={(event) => onFilterValueChangeHandler("storeCode", event)}
                    />
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button variant="outline" 
                className="text-primary hover:text-primary" onClick={() => refetchTargetCommission()}><Search className="mr-2 h-4 w-4" />ค้นหา</Button>
                <Button variant="ghost" className="text-primary hover:text-primary" onClick={() => onClearFilterHandler()}>ล้างตัวกรอง</Button>
            </div>

            <Separator className="my-4" />

            <Card className="p-4 text-start">
                <h1 className="text-lg font-medium mb-4">รายการข้อมูลเป้า commission (เป้าสาขา)</h1>
                <DataTable
                    columns={columns}
                    data={targetCommissionData?.content?.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                    onPaginationChange={onPaginationChange}
                    pageCount={targetCommissionData?.totalElements ?? 0}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};
