import { toast } from 'react-toastify';

export const showSuccessToast = (title: string | undefined, description: string | undefined) => {
    toast.success(
        <div className="flex flex-col text-start">
            <p className="text-sm font-bold text-green-400">{title ?? 'ทำรายการสำเร็จ'}</p>
            <p className="mt-2 text-xs">{description}</p>
        </div>,
        { position: 'bottom-right' },
    );
};

export const showErrorToast = (title: string | undefined, description: string | undefined) => {
    toast.error(
        <div className="flex flex-col text-start">
            <p className="text-sm font-bold text-red-400">{title ?? 'ทำรายการไม่สำเร็จ'}</p>
            <p className="mt-2 text-xs">{description}</p>
        </div>,
        { position: 'bottom-right' },
    );
};
