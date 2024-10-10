import { Separator } from '@/components/ui/separator';
import _ from 'lodash';
import { useUser } from '@/app/contexts/user-context';
import { TargetBranchTabs } from '@/features/target-branch-manage/components/target-branch-tabs';
import TargetBranchWorkflowTimeline from '@/features/target-branch-manage/components/target-branch-workflow-timeline';
import TargetBranchManageHeader from '@/features/target-branch-manage/components/target-branch-manage-header';
import { useTargetBranchManage } from '@/features/target-branch-manage/hooks/use-target-branch-manage';
import { useTargetBranchStore } from '@/features/target-branch-manage/hooks/use-target-branch-store';

export const TargetBranchManagePage = () => {
    const { isViewMode } = useTargetBranchManage();
    const { user } = useUser();

    const { targetCommission, targetWorkflow, isTargetBranchLoading } = useTargetBranchStore();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">จัดการเป้าสาขา</h1>
                {user?.branch && (
                    <h2 className="text-xl font-medium">
                        สาขา: {user?.branch?.branchNumber} - {user?.branch?.name}
                    </h2>
                )}
            </div>

            {!isTargetBranchLoading && (
                <div className="flex mt-2">
                    <TargetBranchManageHeader
                        targetCommissionDetail={targetCommission}
                        targetWorkflow={targetWorkflow}
                    />
                </div>
            )}

            <Separator className="my-4" />

            <div className="flex gap-2">
                <div className="w-4/5">
                    <div className="flex flex-col">
                        <TargetBranchTabs isViewMode={isViewMode} />
                    </div>
                </div>
                <div className="w-1/5">
                    {!_.isEmpty(targetCommission) && !isTargetBranchLoading && (
                        <TargetBranchWorkflowTimeline targetWorkflow={targetWorkflow} />
                    )}
                </div>
            </div>
        </div>
    );
};
