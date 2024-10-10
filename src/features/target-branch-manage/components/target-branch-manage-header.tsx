import FilterSelect from '@/components/select';
import { Button } from '@/components/ui/button';
import { TARGET_BRANCH_PATH } from '@/constants/route-path';
import { WorkflowStatus } from '@/constants/workflow-status';
import { useFetchTargetCommissionFilter } from '@/features/target-commission/api/use-fetch-target-commission-filters';
import { formatThaiCurrency } from '@/lib/number-utils';
import { TargetCommission } from '@/types/api';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { TargetBranchWorkflow } from '../hooks/use-target-branch-store';
import { useTargetBranchManage } from '../hooks/use-target-branch-manage';
import { useTargetBranchActions } from '../hooks/use-target-branch-actions';
import { useUser } from '@/app/contexts/user-context';

interface TargetBranchManageHeaderProps {
    targetCommissionDetail: TargetCommission | undefined;
    targetWorkflow: TargetBranchWorkflow;
}

const TargetBranchManageHeader = ({ targetCommissionDetail, targetWorkflow }: TargetBranchManageHeaderProps) => {
    const { user } = useUser();
    const userBranchId = user?.branch?.id;

    const { isEditMode, isViewMode, filterParams, onFilterSelectHandler } = useTargetBranchManage();

    const { onSaveTargetHandler, onCancelTargetHandler, deleteTargetBranchHandler, makeActionTargetBranchHandler } =
        useTargetBranchActions();

    const { data: yearFilterOptions } = useFetchTargetCommissionFilter('year', { branchId: userBranchId });
    const { data: monthFilterOptions } = useFetchTargetCommissionFilter('month', { branchId: userBranchId });

    const navigate = useNavigate();

    return (
        <>
            {isViewMode ? (
                <div className="flex items-center gap-2 w-1/3">
                    <Button
                        variant="outline"
                        className="text-black"
                        onClick={() => {
                            navigate(TARGET_BRANCH_PATH);
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
                    {!_.isEmpty(targetCommissionDetail) && (
                        <span className="text-primaryLight">
                            {formatThaiCurrency(targetCommissionDetail.targetCommission, ' บาท')}
                        </span>
                    )}
                </p>
            </div>

            <>
                {isViewMode || [WorkflowStatus.APPROVED, WorkflowStatus.REJECTED].includes(targetWorkflow.status) ? (
                    <div className="flex w-1/3 gap-3 justify-end">
                        {targetWorkflow?.status !== WorkflowStatus.APPROVED && (
                            <Button
                                className="bg-amber-500 hover:bg-amber-500/80"
                                disabled={_.isEmpty(targetCommissionDetail)}
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
                            disabled={_.isEmpty(targetCommissionDetail)}
                            onClick={onSaveTargetHandler}
                        >
                            บันทึก
                        </Button>
                        <Button
                            variant="success"
                            disabled={_.isEmpty(targetCommissionDetail)}
                            onClick={() => {
                                if (targetWorkflow?.id) {
                                    makeActionTargetBranchHandler([targetWorkflow.id], WorkflowStatus.PENDING);
                                }
                            }}
                        >
                            ส่งคำขออนุมัติ
                        </Button>
                    </div>
                )}
            </>
        </>
    );
};

export default TargetBranchManageHeader;
