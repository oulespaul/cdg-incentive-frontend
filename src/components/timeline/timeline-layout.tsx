import { Check, Hourglass } from 'lucide-react';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineHeader,
    TimelineItem,
    TimelineTitle,
} from '.';
import { TargetBranchWorkflow } from '@/features/target-branch/api/use-target-branch-store';
import { DD_MM_YYYY_HH_MM, formatDate } from '@/lib/date-utils';
import _ from 'lodash';
import { cn } from '@/lib/utils';

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
                <div className="bg-blue-600 rounded-full flex items-center w-6 h-6 p-1">
                    <Check color="white" />
                </div>
            ),
            actionBy: targetWorkflow.createdBy,
            actionDescription: 'ผู้สร้าง',
            waitingAction: ['New', 'Pending'].includes(targetWorkflow.status ?? '')
                ? {
                      title: 'รออนุมัติ',
                      iconColor: targetWorkflow.status === 'New' ? 'bg-gray-500' : 'bg-amber-500',
                  }
                : undefined,
        },
        {
            id: 2,
            date: targetWorkflow.approvedAt,
            actionIcon: (
                <div className="bg-green-600 rounded-full flex items-center w-6 h-6 p-1">
                    <Check color="white" />
                </div>
            ),
            actionBy: targetWorkflow.approvedBy,
            actionDescription: 'ผู้อนุมัติ',
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
