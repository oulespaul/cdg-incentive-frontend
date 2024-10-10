import { WorkflowStatus } from '@/constants/workflow-status';

const statusColorMap: Record<string, string> = {
    new: 'text-blue-600',
    pending: 'text-amber-500',
    rejected: 'text-red-600',
    editing: 'text-purple-600',
    approved: 'text-green-500',
    closed: 'text-gray-600',
    default: 'text-gray-600',
};

export const getStatusTextColorClass = (status: WorkflowStatus): string => {
    return statusColorMap[status.toLowerCase()] || statusColorMap['default'];
};
