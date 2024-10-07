import React from 'react';
import { Spinner } from '@/components/spinner';
import { msalConfig } from '@/configs/authConfig';
import { AuthenticationResult, EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
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

    msalInstance.initialize();

    const activeAccount = msalInstance.getActiveAccount();

    if (!activeAccount) {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
        }
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const authenticationResult = event.payload as AuthenticationResult;
            const account = authenticationResult.account;
            msalInstance.setActiveAccount(account);
        }
    });

    msalInstance.enableAccountStorageEvents();

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
