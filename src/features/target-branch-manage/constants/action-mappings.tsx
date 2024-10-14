import { useState, useRef } from 'react';
import { WorkflowStatus } from '@/constants/workflow-status';
import { TARGET_BRANCH_MANAGE_PATH, TARGET_BRANCH_REVIEW_APPROVE_PATH } from '@/constants/route-path';
import { Input } from '@/components/ui/input';
import { useParams } from 'react-router-dom';

interface MakeActionText {
    title: string;
    content: string | JSX.Element | undefined;
    redirect: string | undefined;
    successTitle: string;
    successDescription: string;
    failedTitle: string;
    failedDescription: string;
}

export const useActionMappings = () => {
    const [rejectReason, setRejectReason] = useState<string>('');
    const rejectReasonRef = useRef(rejectReason);
    const { year, month } = useParams();

    const makeActionMetaMapping: Record<WorkflowStatus, MakeActionText | undefined> = {
        [WorkflowStatus.PENDING]: {
            title: 'ยืนยันส่งคำขออนุมัติเป้าสาขา',
            content: 'บันทึกข้อมูลและส่งคำขออนุมัติเป้าสาขา',
            successTitle: 'ส่งคำขออนุมติสำเร็จ',
            successDescription: 'ส่งคำขออนุมัติเป้าสาขาเรียบร้อย',
            failedTitle: 'ส่งคำขออนุมติสำเร็จ',
            failedDescription: 'ไม่สามารถส่งคำขออนุมัติข้อมูลได้ กรุณาลองใหม่ในภายหลัง',
            redirect: TARGET_BRANCH_MANAGE_PATH + `/${year}/${month}/view`,
        },
        [WorkflowStatus.APPROVED]: {
            title: 'ยืนยันการอนุมัติข้อมูล',
            content: 'อนุมัติเป้าสาขา',
            successTitle: 'อนุมัติข้อมูลสำเร็จ',
            successDescription: 'อนุมัติข้อมูลเป้าสาขาเรียบร้อย',
            failedTitle: 'อนุมัติข้อมูลไม่สำเร็จ',
            failedDescription: 'ไม่สามารถอนุมัติข้อมูลได้ กรุณาลองใหม่ในภายหลัง',
            redirect: undefined,
        },
        [WorkflowStatus.REJECTED]: {
            title: 'ยืนยันการไม่อนุมัติข้อมูล',
            content: (
                <div>
                    <p>เหตุผล*</p>
                    <Input
                        placeholder="ระบุเหตุผลที่ไม่อนุมัติ"
                        onChange={e => {
                            setRejectReason(e.target.value);
                            rejectReasonRef.current = e.target.value;
                        }}
                    />
                </div>
            ),
            successTitle: 'ไม่อนุมัติข้อมูลสำเร็จ',
            successDescription: 'ไม่อนุมัติข้อมูลเป้าสาขาเรียบร้อย',
            failedTitle: 'ไม่อนุมัติข้อมูลไม่สำเร็จ',
            failedDescription: 'ไม่สามารถไม่อนุมัติข้อมูลได้ กรุณาลองใหม่ในภายหลัง',
            redirect: TARGET_BRANCH_REVIEW_APPROVE_PATH,
        },
        [WorkflowStatus.NEW]: undefined,
        [WorkflowStatus.EDITTING]: undefined,
        [WorkflowStatus.CLOSED]: undefined,
    };

    return { makeActionMetaMapping, rejectReason, rejectReasonRef };
};
