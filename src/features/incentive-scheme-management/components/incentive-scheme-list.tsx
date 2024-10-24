import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { usePagination } from '@/hooks/use-pagination';
import { incentiveSchemeListColumns } from '../constants/incentive-scheme-list-columns';
import { IncentiveSchemeFilterParams, incentiveSchemeInitialFilterParams, useFetchIncentiveSchemeList } from '../api/use-fetch-incentive-scheme-list';

export const IncentiveSchemeList = () => {
    const [filterParams, setFilterParams] = useState<IncentiveSchemeFilterParams>(incentiveSchemeInitialFilterParams);
    const { onPaginationChange, resetPaginationState, pagination } = usePagination();
    const { data: incentiveSchemeListData, refetch: refetchIncentiveSchemeList } = useFetchIncentiveSchemeList({
        ...filterParams,
        ...pagination,
    });

    const onFilterValueChangeHandler = (key: keyof IncentiveSchemeFilterParams, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFilterParams((prevFilters: IncentiveSchemeFilterParams) => ({
            ...prevFilters,
            [key]: event.target.value,
        }));
    };

    const onClearFilterHandler = useCallback(() => {
        resetPaginationState();
        setFilterParams(incentiveSchemeInitialFilterParams);
    }, [resetPaginationState]);

    return (
        <div className="flex flex-col mt-2">
            <div className="flex">
                <div className="flex w-1/2 gap-3">
                    <Input
                        type="text"
                        placeholder="ชื่อ Key"
                        value={filterParams.schemeKey}
                        onChange={event => onFilterValueChangeHandler('schemeKey', event)}
                    />
                    <Input
                        type="text"
                        placeholder="ชื่อ Scheme"
                        value={filterParams.schemeName}
                        onChange={event => onFilterValueChangeHandler('schemeName', event)}
                    />
                </div>

                <div className="flex w-1/2 justify-end">
                    <Button className="bg-gradient-to-l from-cyan-500 to-blue-500">
                        <Plus className="mr-2 h-4 w-4" />
                        เพิ่ม Scheme
                    </Button>
                </div>
            </div>

            <div className="flex mt-2 gap-2">
                <Button
                    variant="outline"
                    className="text-primary hover:text-primary"
                    onClick={() => refetchIncentiveSchemeList()}
                >
                    <Search className="mr-2 h-4 w-4" />
                    ค้นหา
                </Button>
                <Button variant="ghost" className="text-primary hover:text-primary" onClick={onClearFilterHandler}>
                    ล้างตัวกรอง
                </Button>
            </div>

            <Separator className="my-4" />

            <Card className="p-4 text-start">
                <h1 className="text-lg font-medium mb-4">รายการข้อมูล Incentive Scheme</h1>

                <DataTable
                    columns={incentiveSchemeListColumns}
                    data={incentiveSchemeListData?.content || []}
                    onPaginationChange={onPaginationChange}
                    pageCount={incentiveSchemeListData?.totalElements ?? 0}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};
