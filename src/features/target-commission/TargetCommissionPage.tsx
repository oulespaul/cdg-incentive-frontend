import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudDownload, Search } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, TargetCommission } from "./components/data-table/columns";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { TargetCommissionFilterOption } from "./models/target-commission-filter-option";

interface FilterParams {
    month?: string;
    year?: string;
    storeNumber?: string,
    storeCode?: string,
    storeBU?: string;
}

const initialFilterParams = {
    year: undefined,
    month: undefined,
    storeNumber: undefined,
    storeCode: "",
    storeBU: ""
};

const TargetCommissionPage = () => {
    const [targetCommissionList, setTargetCommissionList] = useState<TargetCommission[]>([])
    const [totalTargetCommission, setTotalTargetCommission] = useState(0)

    const [yearFilterOptions, setYearFilterOptions] = useState<TargetCommissionFilterOption[]>([])
    const [monthFilterOptions, setMonthFilterOptions] = useState<TargetCommissionFilterOption[]>([])
    const [storeFilterOptions, setStoreFilterOptions] = useState<TargetCommissionFilterOption[]>([])

    const [filterParams, setFilterParams] = useState<FilterParams>(initialFilterParams)

    const { onPaginationChange, resetPaginationState, pagination } = usePagination();

    const fetchTargetCommissionList = async () => {
        try {
            const params = new URLSearchParams({
                page: pagination.pageIndex.toString(),
                pageSize: pagination.pageSize.toString(),
                ...(filterParams.month && { month: filterParams.month }),
                ...(filterParams.year && { year: filterParams.year }),
                ...(filterParams.storeNumber && { storeNumber: filterParams.storeNumber }),
                ...(filterParams.storeBU && { storeBU: filterParams.storeBU }),
                ...(filterParams.storeCode && { storeCode: filterParams.storeCode }),
            });

            const requestOptions: RequestInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(`http://localhost:8080/api/target-commission?${params}`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setTotalTargetCommission(json.totalElements);
            setTargetCommissionList(json.content.map((target: TargetCommission, index: number) => ({ ...target, id: index + 1 })));
        } catch (error) {
            console.error('Error fetching target commissions:', error);
        }
    }

    const fetchYearFilterOptions = () => {
        fetch(`http://localhost:8080/api/target-commission/filter/year`)
            .then(response => response.json())
            .then(json => setYearFilterOptions(json));
    }

    const fetchMonthFilterOptions = () => {
        fetch(`http://localhost:8080/api/target-commission/filter/month`)
            .then(response => response.json())
            .then(json => setMonthFilterOptions(json));
    }

    const fetchStoreFilterOptions = () => {
        fetch(`http://localhost:8080/api/target-commission/filter/store`)
            .then(response => response.json())
            .then(json => setStoreFilterOptions(json));
    }

    useEffect(() => {
        fetchYearFilterOptions()
        fetchMonthFilterOptions()
        fetchStoreFilterOptions()
    }, [])

    useEffect(() => {
        fetchTargetCommissionList()
    }, [pagination.pageIndex, pagination.pageSize])

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
                        <Select value={filterParams.year ?? ''} onValueChange={(value) => onFilterSelectHandler("year", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="ปี" />
                            </SelectTrigger>
                            <SelectContent>
                                {yearFilterOptions.map((option, index) => (
                                    <SelectItem key={`${index}-${option.value}`} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filterParams.month ?? ''} onValueChange={(value) => onFilterSelectHandler("month", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="เดือน" />
                            </SelectTrigger>
                            <SelectContent>
                                {monthFilterOptions.map((option, index) => (
                                    <SelectItem key={`${index}-${option.value}`} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filterParams.storeNumber ?? ''} onValueChange={(value) => onFilterSelectHandler("storeNumber", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="สาขา" />
                            </SelectTrigger>
                            <SelectContent>
                                {storeFilterOptions.map((option, index) => (
                                    <SelectItem key={`${index}-${option.value}`} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex w-1/2 justify-end">
                        <Button className="bg-gradient-to-l from-cyan-500 to-blue-500"><CloudDownload className="mr-2 h-4 w-4" />นำเข้าเป้า commission</Button>
                    </div>
                </div>

                <div className="flex w-1/2 gap-2 mt-2">
                    <Input type="text" placeholder="Business Unit" value={filterParams.storeBU} onChange={(event) => onFilterValueChangeHandler("storeBU", event)} />

                    <Input type="text" placeholder="Store Code" value={filterParams.storeCode} onChange={(event) => onFilterValueChangeHandler("storeCode", event)} />
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button variant="outline" className="text-primary hover:text-primary" onClick={() => fetchTargetCommissionList()}><Search className="mr-2 h-4 w-4" />ค้นหา</Button>
                <Button variant="ghost" className="text-primary hover:text-primary" onClick={() => onClearFilterHandler()}>ล้างตัวกรอง</Button>
            </div>

            <Separator className="my-4" />

            <Card className="p-4 text-start">
                <h1 className="text-lg font-medium mb-4">รายการข้อมูลเป้า commission (เป้าสาขา)</h1>
                <DataTable
                    columns={columns}
                    data={targetCommissionList}
                    onPaginationChange={onPaginationChange}
                    pageCount={totalTargetCommission}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};

export default TargetCommissionPage;
