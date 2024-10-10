import { Card } from '@/components/ui/card';
import { getStatusTextColorClass } from '@/lib/status-color-utils';
import { cn } from '@/lib/utils';
import { TargetBranchWorkflow } from '../hooks/use-target-branch-store';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineHeader,
    TimelineItem,
    TimelineTitle,
} from '@/components/timeline';
import { formatDate, DD_MM_YYYY_HH_MM } from '@/lib/date-utils';
import _ from 'lodash';
import { Check, Hourglass, X } from 'lucide-react';
import { useUser } from '@/app/contexts/user-context';
import { WorkflowStatus } from '@/constants/workflow-status';

interface TargetBranchWorkflowTimelineProps {
    targetWorkflow: TargetBranchWorkflow;
}

export interface TimelineElement {
    id: number;
    date: Date | undefined;
    actionIcon: JSX.Element;
    actionBy: string | undefined;
    actionDescription: string;
    waitingAction?: {
        title: string;
        iconColor: string;
    };
}

const TargetBranchWorkflowTimeline = ({ targetWorkflow }: TargetBranchWorkflowTimelineProps) => {
    const { user } = useUser();

    if (!targetWorkflow) return null;
    if (!user) return null;

    const timelineData: TimelineElement[] = [
        {
            id: 1,
            date: targetWorkflow.createdAt ?? new Date(),
            actionIcon: (
                <div className="bg-blue-500 rounded-full flex items-center w-6 h-6 p-1">
                    <Check color="white" />
                </div>
            ),
            actionBy: targetWorkflow.createdBy ?? `${user.firstname} ${user.lastname}`,
            actionDescription: 'ผู้สร้าง',
            waitingAction: [WorkflowStatus.NEW, WorkflowStatus.PENDING].includes(targetWorkflow.status)
                ? {
                      title: 'รออนุมัติ',
                      iconColor: targetWorkflow.status === WorkflowStatus.NEW ? 'bg-gray-400' : 'bg-amber-500',
                  }
                : undefined,
        },
        {
            id: 2,
            date: targetWorkflow.approvedAt,
            actionIcon: (
                <div className="bg-green-500 rounded-full flex items-center w-6 h-6 p-1">
                    <Check color="white" />
                </div>
            ),
            actionBy: targetWorkflow.approvedBy,
            actionDescription: 'ผู้อนุมัติ',
            waitingAction: {
                title: 'รอคำนวน',
                iconColor: 'bg-gray-400',
            },
        },
        {
            id: 3,
            date: targetWorkflow.rejectedAt,
            actionIcon: (
                <div className="bg-red-600 rounded-full flex items-center w-6 h-6 p-1">
                    <X color="white" />
                </div>
            ),
            actionBy: targetWorkflow.rejectedBy,
            actionDescription: `ไม่อนุมัติ: ${targetWorkflow.rejectedReason}`,
            waitingAction: {
                title: 'รอแก้ไข',
                iconColor: 'bg-gray-400',
            },
        },
    ];

    return (
        <Card className="p-4">
            <div className="flex text-lg justify-end mb-4 align-middle">
                <h1 className="mr-2">สถานะ:</h1>

                <h1 className={cn('font-bold', getStatusTextColorClass(targetWorkflow.status || 'Default'))}>
                    {targetWorkflow.status}
                </h1>
            </div>

            <Timeline>
                {_.sortBy(timelineData, 'date').map(
                    item =>
                        item.date &&
                        item.actionBy && (
                            <div key={item.id}>
                                <TimelineItem>
                                    <TimelineConnector className="py-4" />
                                    <TimelineHeader>
                                        {item.actionIcon}
                                        <TimelineTitle className="text-gray-400 text-sm">
                                            {formatDate(item.date, DD_MM_YYYY_HH_MM)}
                                        </TimelineTitle>
                                    </TimelineHeader>
                                    <TimelineContent>
                                        <TimelineDescription className="text-md text-black">
                                            {item.actionBy}
                                        </TimelineDescription>
                                        <TimelineDescription>{item.actionDescription}</TimelineDescription>
                                    </TimelineContent>
                                </TimelineItem>
                                {item.waitingAction && (
                                    <TimelineItem key={item.id}>
                                        <TimelineHeader>
                                            <div
                                                className={cn(
                                                    'rounded-full flex items-center w-6 h-6 p-1',
                                                    item.waitingAction?.iconColor,
                                                )}
                                            >
                                                <Hourglass color="white" />
                                            </div>
                                            <TimelineTitle className="text-gray-400 text-sm">
                                                {item.waitingAction.title}
                                            </TimelineTitle>
                                        </TimelineHeader>
                                    </TimelineItem>
                                )}
                            </div>
                        ),
                )}
            </Timeline>
        </Card>
    );
};

export default TargetBranchWorkflowTimeline;
