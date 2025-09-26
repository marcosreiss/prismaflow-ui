import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import BlankLayout from '../layout/blanckLayout';
import DashboardLayout from '../layout/dashboardLayout';

const SignInPage = lazy(() => import('@/pages/login'));
const CustomersPage = lazy(() => import('@/pages/cliente/clienteIndex'));
const ServicePage = lazy(() => import('@/pages/servico/index')); // Adicionado


const renderFallback = (
    <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
        <LinearProgress
            sx={{
                width: 1,
                maxWidth: 320,
                bgcolor: (theme) => theme.palette.grey[200],
                [`& .${linearProgressClasses.bar}`]: { bgcolor: 'primary.main' },
            }}
        />
    </Box>
);

// Rotas privadas com DashboardLayout
export function PrivateRouter() {
    return useRoutes([
        {
            path: '/',
            element: (
                <DashboardLayout>
                    <Suspense fallback={renderFallback}>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                { index: true, element: <Navigate to="customers" replace /> },
                { index: true, element: <Navigate to="services" replace /> }, // Redireciona para services
                { path: 'customers', element: <CustomersPage /> },
                { path: 'services', element: <ServicePage /> }, // Rota para a página de serviços
            ],
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);
}

// Rotas públicas com BlankLayout
export function PublicRouter() {
    return useRoutes([
        {
            path: '/',
            element: (
                <BlankLayout>
                    <Suspense fallback={renderFallback}>
                        <SignInPage />
                    </Suspense>
                </BlankLayout>
            ),
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);
}
