import React from 'react';
import { Spinner } from '@/components/spinner';
import { msalConfig } from '@/configs/authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './contexts/modal-context';
import Modal from '@/components/modal';
import { UserProvider } from './contexts/user-context';

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(() => new QueryClient());
    const [msalInstance] = React.useState(() => new PublicClientApplication(msalConfig));

    return (
        <React.Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }
        >
            <UserProvider>
                <MsalProvider instance={msalInstance}>
                    <QueryClientProvider client={queryClient}>
                        <ModalProvider>
                            {children}
                            <Modal />
                        </ModalProvider>
                    </QueryClientProvider>
                </MsalProvider>
            </UserProvider>
        </React.Suspense>
    );
};
