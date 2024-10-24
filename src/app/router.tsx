import { ProtectedRoute } from '@/lib/auth';
import { useMemo } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppRoot } from './routes/app/root';
import { useIsAuthenticated } from '@azure/msal-react';

export const createAppRouter = (isAuthenticated: boolean) =>
    createBrowserRouter([
        {
            path: '/',
            lazy: async () => {
                const { LoginPage } = await import('./routes/auth/login');
                return { Component: isAuthenticated ? () => <Navigate to="/app" /> : LoginPage };
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
                    path: '',
                    lazy: async () => {
                        const { LandingPage } = await import('./routes/app/landing');
                        return { Component: LandingPage };
                    },
                },
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
                    path: 'target-branch/manage/:year?/:month?/:mode?',
                    lazy: async () => {
                        const { TargetBranchManagePage } = await import('./routes/app/target-branch-manage');
                        return { Component: TargetBranchManagePage };
                    },
                },
                {
                    path: 'target-branch/review-approve',
                    lazy: async () => {
                        const { TargetBranchReviewApprove } = await import('./routes/app/target-branch-review-approve');
                        return { Component: TargetBranchReviewApprove };
                    },
                },
                {
                    path: 'target-branch/review-approve/detail/:id',
                    lazy: async () => {
                        const { TargetBranchReviewDetail } = await import('./routes/app/target-branch-review-detail');
                        return { Component: TargetBranchReviewDetail };
                    },
                },
                {
                    path: 'employee-management',
                    lazy: async () => {
                        const { EmployeeManagementPage } = await import('./routes/app/employee-management');
                        return { Component: EmployeeManagementPage };
                    },
                },
                {
                    path: 'incentive-scheme-management',
                    lazy: async () => {
                        const { IncentiveSchemeManagementPage } = await import('./routes/app/incentive-scheme-management');
                        return { Component: IncentiveSchemeManagementPage };
                    },
                },
            ],
        },
        {
            path: 'unauthorized',
            lazy: async () => {
                const { UnauthorizedPage } = await import('./routes/app/unauthorized');
                return { Component: UnauthorizedPage };
            },
        },
        {
            path: '*',
            lazy: async () => {
                const { NotFound } = await import('./routes/app/not-found');
                return { Component: NotFound };
            },
        },
    ]);

export const AppRouter = () => {
    const isAuthenticated = useIsAuthenticated();
    const router = useMemo(() => createAppRouter(isAuthenticated), [isAuthenticated]);

    return <RouterProvider router={router} />;
};
