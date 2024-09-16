import { ProtectedRoute } from '@/lib/auth';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoot } from './routes/app/root';

export const createAppRouter = () =>
    createBrowserRouter([
        {
            path: '/',
            lazy: async () => {
                const { LoginPage } = await import('./routes/auth/login');
                return { Component: LoginPage };
            },
        },
        {
            path: '/app',
            element: (
                <ProtectedRoute>
                    <AppRoot />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: 'target-commission',
                    index: true,
                    lazy: async () => {
                        const { TargetCommissionPage } = await import('./routes/app/target-commission');
                        return { Component: TargetCommissionPage };
                    },
                },
                {
                    path: 'target-branch',
                    lazy: async () => {
                        const { TargetBranchPage } = await import('./routes/app/target-branch');
                        return { Component: TargetBranchPage };
                    },
                },
                {
                    path: 'target-branch/create',
                    lazy: async () => {
                        const { TargetBranchManagePage } = await import('./routes/app/target-branch-manage');
                        return { Component: TargetBranchManagePage };
                    },
                },
            ],
        },
    ]);

export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);

    return <RouterProvider router={router} />;
};
