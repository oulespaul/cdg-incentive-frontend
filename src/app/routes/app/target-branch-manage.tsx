import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import FilterSelect from '@/components/select';
import { TargetBranchTabs } from '@/features/target-branch/components/TargetBranchTabs';
import { formatThaiCurrency } from '@/lib/number-utils';
import _ from 'lodash';
import { TimelineLayout } from '@/components/timeline/timeline-layout';
import { useTargetBranchStore } from '@/features/target-branch/api/use-target-branch-store';
import { getStatusTextColorClass } from '@/lib/status-color-utils';
import { cn } from '@/lib/utils';
import { useTargetBranchManage } from '@/features/target-branch/hooks/use-target-branch-manage';
import { useNavigate } from 'react-router-dom';
import { useAppUserDetail } from '@/features/app-user/hooks/use-app-user-detail';

export const TargetBranchManagePage = () => {
    const {
        filterParams,
        yearFilterOptions,
        monthFilterOptions,
        onFilterSelectHandler,
        targetCommission,
        onSaveTargetHandler,
        onCancelTargetHandler,
        isEditMode,
        isViewMode,
        deleteTargetBranchHandler,
        makeActionTargetBranchHandler,
    } = useTargetBranchManage();
    const { targetWorkflow, isTargetBranchLoading } = useTargetBranchStore();
    const { appUserDetail } = useAppUserDetail();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">จัดการเป้าสาขา</h1>
                {appUserDetail?.branch && (
                    <h2 className="text-xl font-medium">
                        สาขา: {appUserDetail?.branch?.branchNumber} - {appUserDetail?.branch?.name}
                    </h2>
                )}
            </div>

            <div className="flex mt-2">
                {isViewMode ? (
                    <div className="flex items-center gap-2 w-1/3">
                        <Button
                            variant="outline"
                            className="text-black"
                            onClick={() => {
                                navigate('/app/target-branch');
                            }}
                        >
                            ย้อนกลับ
                        </Button>
                        <p className="text-lg font-semibold">เดือนข้อมูล:</p>
                        <span className="text-primaryLight">
                            {filterParams.month} {filterParams.year}
                        </span>
                    </div>
                ) : (
                    <div className="flex gap-2 w-1/3">
                        <FilterSelect
                            value={filterParams.year}
                            options={yearFilterOptions}
                            placeholder="ปี"
                            onChange={value => onFilterSelectHandler('year', value)}
                            disabled={isEditMode}
                        />
                        <FilterSelect
                            value={filterParams.month}
                            options={monthFilterOptions}
                            placeholder="เดือน"
                            onChange={value => onFilterSelectHandler('month', value)}
                            disabled={isEditMode}
                        />
                    </div>
                )}
                <div className="flex w-1/3">
                    <p className="text-lg font-medium text-end self-center ml-2">
                        เป้า commission (เป้าสาขา):{' '}
                        {!_.isEmpty(targetCommission) && (
                            <span className="text-primaryLight">
                                {formatThaiCurrency(targetCommission.targetCommission, ' บาท')}
                            </span>
                        )}
                    </p>
                </div>

                {!isTargetBranchLoading && (
                    <>
                        {isViewMode || ['Approved', 'Rejected'].includes(targetWorkflow?.status || '') ? (
                            <div className="flex w-1/3 gap-3 justify-end">
                                {targetWorkflow?.status !== 'Approved' && (
                                    <Button
                                        className="bg-amber-500 hover:bg-amber-500/80"
                                        disabled={_.isEmpty(targetCommission)}
                                        onClick={() => {
                                            navigate(
                                                `/app/target-branch/manage/${filterParams.year}/${filterParams.month}/edit`,
                                            );
                                        }}
                                    >
                                        แก้ไข
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (targetWorkflow?.id) {
                                            deleteTargetBranchHandler(targetWorkflow.id);
                                        }
                                    }}
                                >
                                    ลบ
                                </Button>
                            </div>
                        ) : (
                            <div className="flex w-1/3 gap-3 justify-end">
                                <Button variant="outline" onClick={onCancelTargetHandler}>
                                    ยกเลิก
                                </Button>
                                <Button
                                    variant="primary"
                                    disabled={_.isEmpty(targetCommission)}
                                    onClick={onSaveTargetHandler}
                                >
                                    บันทึก
                                </Button>
                                <Button
                                    variant="success"
                                    disabled={_.isEmpty(targetCommission)}
                                    onClick={() => {
                                        if (targetWorkflow?.id) {
                                            makeActionTargetBranchHandler([targetWorkflow.id], 'Pending');
                                        }
                                    }}
                                >
                                    ส่งคำขออนุมัติ
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Separator className="my-4" />

            <div className="flex gap-2">
                <div className="w-4/5">
                    <div className="flex flex-col">
                        <TargetBranchTabs isViewMode={isViewMode} />
                    </div>
                </div>
                <div className="w-1/5">
                    {!_.isEmpty(targetCommission) && targetWorkflow && !isTargetBranchLoading && (
                        <Card className="p-4">
                            <div className="flex text-lg justify-end mb-4 align-middle">
                                <h1 className="mr-2">สถานะ:</h1>

                                <h1
                                    className={cn(
                                        'font-bold',
                                        getStatusTextColorClass(targetWorkflow.status || 'Default'),
                                    )}
                                >
                                    {targetWorkflow.status}
                                </h1>
                            </div>

                            <TimelineLayout targetWorkflow={targetWorkflow} />
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
