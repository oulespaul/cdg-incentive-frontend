import { useModalContext } from '@/app/providers/modal-provider';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Modal = () => {
    const { modalState, closeModal } = useModalContext();

    return (
        <AlertDialog open={modalState.isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{modalState.options?.title}</AlertDialogTitle>
                    {modalState.options?.content && (
                        <AlertDialogDescription>{modalState.options.content}</AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter className="flex sm:justify-between">
                    {modalState.options?.showCancelButton && (
                        <AlertDialogCancel onClick={modalState.options.onCancel || closeModal}>
                            ยกเลิก
                        </AlertDialogCancel>
                    )}
                    <div>
                        {modalState.options?.showSecondaryActionButton && (
                            <AlertDialogAction
                                className="bg-black mr-2"
                                onClick={modalState.options?.onSecondaryActionClick}
                            >
                                {modalState.options.secondaryActionButtonTitle}
                            </AlertDialogAction>
                        )}
                        <AlertDialogAction onClick={modalState.options?.onConfirm}>ยืนยัน</AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Modal;
