import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import FilterSelect from '@/components/select';
import { TargetBranchTabs } from '@/features/target-branch/components/TargetBranchTabs';
import { formatThaiCurrency } from '@/lib/number-utils';
import _ from 'lodash';
import { useTargetBranchManage } from '@/features/target-branch/api/use-target-branch-manage';
// import { timelineData, TimelineLayout } from '@/components/timeline/timeline-layout';

export const TargetBranchManagePage = () => {
    const {
        filterParams,
        yearFilterOptions,
        monthFilterOptions,
        onFilterSelectHandler,
        targetCommission,
        onSaveTargetHandler,
        onCancelTargetHandler,
    } = useTargetBranchManage();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">จัดการเป้าสาขา</h1>
                <h2 className="text-xl font-medium">สาขา: 10102 - Chidlom</h2>
            </div>

            <div className="flex mt-2">
                <div className="flex gap-2 w-1/3">
                    <FilterSelect
                        value={filterParams.year}
                        options={yearFilterOptions}
                        placeholder="ปี"
                        onChange={value => onFilterSelectHandler('year', value)}
                    />
                    <FilterSelect
                        value={filterParams.month}
                        options={monthFilterOptions}
                        placeholder="เดือน"
                        onChange={value => onFilterSelectHandler('month', value)}
                    />
                </div>
                <div className="flex w-1/3">
                    <p className="text-lg font-medium text-end self-center ml-2">
                        เป้า commission (เป้าสาขา):{' '}
                        {!_.isEmpty(targetCommission) && (
                            <span className="text-blue-500">
                                {formatThaiCurrency(targetCommission.targetCommission, ' บาท')}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex w-1/3 gap-3 justify-end">
                    <Button variant="outline" onClick={onCancelTargetHandler}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" disabled={_.isEmpty(targetCommission)} onClick={onSaveTargetHandler}>
                        บันทึก
                    </Button>
                    <Button variant="success" disabled={_.isEmpty(targetCommission)}>
                        ส่งคำขออนุมัติ
                    </Button>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex gap-2">
                <div className="w-4/5">
                    <div className="flex flex-col">
                        <TargetBranchTabs />
                    </div>
                </div>
                <div className="w-1/5">
                    <Card className="p-4 text-start">
                        <h1 className="text-lg font-medium mb-4 text-end">
                            สถานะ: {!_.isEmpty(targetCommission) && <span className="text-blue-500">New</span>}
                        </h1>
                        {/* <TimelineLayout items={timelineData} /> */}
                    </Card>
                </div>
            </div>
        </div>
    );
};
