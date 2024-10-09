import { Check, Hourglass, X } from 'lucide-react';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineHeader,
    TimelineItem,
    TimelineTitle,
} from '.';
import { DD_MM_YYYY_HH_MM, formatDate } from '@/lib/date-utils';
import _ from 'lodash';
import { cn } from '@/lib/utils';
import { TargetBranchWorkflow } from '@/features/target-branch-manage/api/use-target-branch-store';

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

interface TimelineLayoutProps {
    targetWorkflow: TargetBranchWorkflow;
}

export const TimelineLayout = ({ targetWorkflow }: TimelineLayoutProps) => {
    const timelineData: TimelineElement[] = [
        {
            id: 1,
            date: targetWorkflow.createdAt,
            actionIcon: (
                <div className="bg-blue-500 rounded-full flex items-center w-6 h-6 p-1">
                    <Check color="white" />
                </div>
            ),
            actionBy: targetWorkflow.createdBy,
            actionDescription: 'ผู้สร้าง',
            waitingAction: ['New', 'Pending'].includes(targetWorkflow.status ?? '')
                ? {
                      title: 'รออนุมัติ',
                      iconColor: targetWorkflow.status === 'New' ? 'bg-gray-400' : 'bg-amber-500',
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
    );
};
