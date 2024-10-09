import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import _ from 'lodash';
import { TimelineLayout } from '@/components/timeline/timeline-layout';
import { getStatusTextColorClass } from '@/lib/status-color-utils';
import { cn } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { TARGET_BRANCH_REVIEW_APPROVE_PATH } from '@/constants/route-path';
import { Spinner } from '@/components/spinner';
import { useFetchTargetBranchDetailByBranchId } from '@/features/target-branch-manage/api/use-fetch-target-branch-detail-by-id';
import { useTargetBranchStore } from '@/features/target-branch-manage/api/use-target-branch-store';
import TargetBranchSummaryTabContent from '@/features/target-branch-manage/components/target-branch-summary';
import { useTargetBranchManage } from '@/features/target-branch-manage/hooks/use-target-branch-manage';
import { useEffect } from 'react';

export const TargetBranchReviewDetail = () => {
    const {
        targetCommission,
        setTargetCommission,
        setTargetInHouseList,
        setTargetDeptList,
        setTargetSMMDSMList,
        setTargetDMMList,
        setTargetWorkflow,
        targetWorkflow,
    } = useTargetBranchStore();
    const { makeActionTargetBranchHandler } = useTargetBranchManage();

    const { id } = useParams();
    const { data: targetBranchDetail, isFetching: isTargetBranchLoading } = useFetchTargetBranchDetailByBranchId(
        id || '',
    );

    useEffect(() => {
        if (targetBranchDetail) {
            setTargetCommission(targetBranchDetail.targetCommission);
            setTargetInHouseList(() => targetBranchDetail.targetInHouseList);
            setTargetDeptList(() => targetBranchDetail.targetDeptList);
            setTargetSMMDSMList(() => {
                if (targetBranchDetail.targetSMMDSMList.length === 0) {
                    return [
                        {
                            id: undefined,
                            smmId: '',
                            targetDSMList: [],
                        },
                    ];
                }

                return targetBranchDetail.targetSMMDSMList;
            });
            setTargetDMMList(() => targetBranchDetail.targetDMMList);
            setTargetWorkflow({
                id: targetBranchDetail.id,
                status: targetBranchDetail.status,
                requestedAt: targetBranchDetail.requestedAt,
                requestedBy: targetBranchDetail.requestedBy,
                approvedAt: targetBranchDetail.approvedAt,
                approvedBy: targetBranchDetail.approvedBy,
                rejectedAt: targetBranchDetail.rejectedAt,
                rejectedBy: targetBranchDetail.rejectedBy,
                rejectedReason: targetBranchDetail.rejectedReason,
                calculatedAt: targetBranchDetail.calculatedAt,
                calculatedBy: targetBranchDetail.calculatedBy,
                createdAt: targetBranchDetail.createdAt,
                createdBy: targetBranchDetail.createdBy,
            });
        }
    }, [JSON.stringify(targetBranchDetail)]);

    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">ตรวจสอบและอนุมัติเป้าสาขา</h1>
            </div>

            <div className="flex mt-2  justify-between">
                <div className="flex items-center gap-2 w-1/3">
                    <Button
                        variant="outline"
                        className="text-black"
                        onClick={() => {
                            navigate(TARGET_BRANCH_REVIEW_APPROVE_PATH);
                        }}
                    >
                        ย้อนกลับ
                    </Button>
                    <p className="text-lg font-semibold">เดือนข้อมูล:</p>
                    <span className="text-primaryLight">
                        {targetCommission?.month} {targetCommission?.year}
                    </span>
                </div>

                {targetWorkflow && !isTargetBranchLoading && targetBranchDetail?.status === 'Pending' && (
                    <div className="flex w-1/3 gap-3 justify-end">
                        <Button
                            variant="destructive"
                            onClick={() => makeActionTargetBranchHandler([targetBranchDetail.id], 'Rejected')}
                        >
                            <X />
                            ไม่อนุมัติ
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => makeActionTargetBranchHandler([targetBranchDetail.id], 'Approved')}
                        >
                            <Check />
                            อนุมัติ
                        </Button>
                    </div>
                )}
            </div>

            <Separator className="my-4" />

            {isTargetBranchLoading ? (
                <div className="flex justify-center mt-32">
                    <Spinner className="text-primaryLight" />
                </div>
            ) : (
                <div className="flex gap-2">
                    <div className="w-4/5">
                        <TargetBranchSummaryTabContent />
                    </div>
                    <div className="w-1/5">
                        {targetWorkflow && !isTargetBranchLoading && (
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
            )}
        </div>
    );
};
