import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTargetBranchStore } from './use-target-branch-store';
import { useCreateTargetBranch } from '../api/use-create-target-branch';
import { useDeleteTargetBranch } from '../api/use-delete-target-branch';
import { MakeActionTargetBranchRequst, useMakeActionTargetBranch } from '../api/use-make-action-target-branch';
import { useModalContext } from '@/app/contexts/modal-context';
import { TARGET_BRANCH_PATH } from '@/constants/route-path';
import { WorkflowStatus } from '@/constants/workflow-status';
import {
    mapToInhouseRequest,
    mapToTargetDeptRequest,
    mapToTargetDMMRequest,
    mapToTargetSMMDSMRequest,
} from '../lib/target-branch-transformers';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import { useUser } from '@/app/contexts/user-context';
import { useActionMappings } from '../constants/action-mappings';

export const useTargetBranchActions = () => {
    const { user } = useUser();
    const userBranchId = user?.branch?.id;

    const navigate = useNavigate();
    const { openModal, closeModal } = useModalContext();

    const { targetCommission, targetInHouseList, targetDeptList, targetSMMDSMList, targetDMMList, resetState } =
        useTargetBranchStore();

    const createTargetBranch = useCreateTargetBranch({
        onSuccess: () => {
            showSuccessToast('บันทึกข้อมูลเป้าสาขาสำเร็จ', 'บันทึกข้อมูลเป้าสาขาเรียบร้อย');
            resetState();
            navigate(TARGET_BRANCH_PATH);
        },
        onError: () => {
            showErrorToast('บันทึกข้อมูลเป้าสาขาไม่สำเร็จ', 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        },
    });

    const deleteTargetBranch = useDeleteTargetBranch({
        onSuccess: () => {
            showErrorToast('ลบข้อมูลสำเร็จ', 'ลบข้อมูลเป้าสาขาเรียบร้อย');
        },
        onError: () => {
            showErrorToast('ลบข้อมูลไม่สำเร็จ', 'ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        },
    });

    const { makeActionMetaMapping, rejectReasonRef } = useActionMappings();

    const makeActionTargetBranch = useMakeActionTargetBranch({
        onSuccess: (_data: any, variables: MakeActionTargetBranchRequst) => {
            const makeActionMeta = makeActionMetaMapping[variables.action];
            closeModal();
            showSuccessToast(makeActionMeta?.successTitle, makeActionMeta?.successDescription);
            if (makeActionMeta?.redirect) {
                navigate(makeActionMeta.redirect);
            }
        },
        onError: (_error: Error, variables: MakeActionTargetBranchRequst) => {
            const makeActionMeta = makeActionMetaMapping[variables.action];
            showErrorToast(makeActionMeta?.failedTitle, makeActionMeta?.failedDescription);
        },
    });

    const onSaveTargetHandler = useCallback(() => {
        openModal({
            title: 'ยืนยันบันทึกเป้าสาขา ?',
            content: 'บันทึกข้อมูลเป้าสาขา',
            showCancelButton: true,
            onConfirm: () => {
                createTargetBranch.mutate({
                    targetCommissionId: targetCommission?.id,
                    branchId: userBranchId,
                    targetInHouseList: targetInHouseList.map(mapToInhouseRequest),
                    targetDeptList: targetDeptList.map(mapToTargetDeptRequest),
                    targetSMMDSMList: targetSMMDSMList.map(mapToTargetSMMDSMRequest),
                    targetDMMList: targetDMMList.map(mapToTargetDMMRequest),
                });
                closeModal();
            },
        });
    }, [userBranchId, targetCommission?.id, targetInHouseList, targetDeptList, targetSMMDSMList, targetDMMList]);

    const onCancelTargetHandler = useCallback(() => {
        openModal({
            title: 'ต้องการบันทึกข้อมูลหรือไม่ ?',
            content: 'หากยกเลิกการสร้าง Target โดยไม่บันทึกข้อมูล ข้อมูลบางส่วนอาจสูญหาย',
            showCancelButton: true,
            showSecondaryActionButton: true,
            secondaryActionButtonTitle: 'ไม่บันทึก',
            onConfirm: () => {
                createTargetBranch.mutate({
                    targetCommissionId: targetCommission?.id,
                    branchId: userBranchId,
                    targetInHouseList: targetInHouseList.map(mapToInhouseRequest),
                    targetDeptList: targetDeptList.map(mapToTargetDeptRequest),
                    targetSMMDSMList: targetSMMDSMList.map(mapToTargetSMMDSMRequest),
                    targetDMMList: targetDMMList.map(mapToTargetDMMRequest),
                });
                resetState();
                closeModal();
            },
            onSecondaryActionClick: () => {
                resetState();
                closeModal();
                navigate(TARGET_BRANCH_PATH);
            },
        });
    }, [userBranchId, targetCommission?.id, targetInHouseList, targetDeptList, targetSMMDSMList, targetDMMList]);

    const deleteTargetBranchHandler = useCallback((targetbranchId: number) => {
        openModal({
            title: 'ยืนยันลบเป้าสาขา ?',
            content: 'เมื่อลบข้อมูลเป้าหมาย จะไม่สามารถกู้คืนได้',
            confirmTitle: 'ใช่, ลบ',
            confirmClassName: 'bg-red-500',
            showCancelButton: true,
            onConfirm: () => {
                deleteTargetBranch.mutate(targetbranchId);
                closeModal();
                navigate(TARGET_BRANCH_PATH);
            },
        });
    }, []);

    const makeActionTargetBranchHandler = useCallback((targetBranchIdList: number[], action: WorkflowStatus) => {
        openModal({
            title: makeActionMetaMapping[action]?.title ?? '',
            content: makeActionMetaMapping[action]?.content ?? '',
            showCancelButton: true,
            onConfirm: () => {
                makeActionTargetBranch.mutate({ targetBranchIdList, action, rejectReason: rejectReasonRef.current });
            },
        });
    }, []);

    return {
        onSaveTargetHandler,
        onCancelTargetHandler,
        deleteTargetBranchHandler,
        makeActionTargetBranchHandler,
    };
};
