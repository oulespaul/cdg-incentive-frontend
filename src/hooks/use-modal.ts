import { useCallback, useState } from 'react';

export interface ModalOptions {
    title: string | JSX.Element;
    content?: string | JSX.Element;
    confirmTitle?: string;
    confirmClassName?: string;
    showSecondaryActionButton?: boolean;
    secondaryActionButtonTitle?: string;
    showCancelButton?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    onSecondaryActionClick?: () => void;
}

export interface ModalState {
    isOpen: boolean;
    options?: ModalOptions;
}

export const useModal = () => {
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
    });

    const openModal = useCallback((options: ModalOptions) => {
        setModalState({ isOpen: true, options });
    }, []);

    const closeModal = useCallback(() => {
        setModalState({ isOpen: false });
    }, []);

    return {
        modalState,
        openModal,
        closeModal,
    };
};
