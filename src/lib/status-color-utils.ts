export type Status = 'New' | 'Pending' | 'Rejected' | 'Editing' | 'Approved' | 'Closed' | 'Default';

const statusColorMap: Record<string, string> = {
    new: 'blue-500',
    pending: 'amber-500',
    rejected: 'red-600',
    editing: 'purple-600',
    approved: 'green-dark',
    closed: 'gray-600',
    default: 'gray-600',
};

export const getStatusColorClass = (status: Status, type: string): string => {
    const color = statusColorMap[status.toLowerCase()] || statusColorMap['default'];

    return `${type}-${color}`;
};
