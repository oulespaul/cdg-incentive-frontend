import { ModalOptions, ModalState, useModal } from '@/hooks/use-modal';
import { createContext, ReactNode, useContext } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextType {
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
    modalState: ModalState;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const { modalState, openModal, closeModal } = useModal();

    return <ModalContext.Provider value={{ modalState, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
