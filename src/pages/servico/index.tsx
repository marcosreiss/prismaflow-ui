import React, { useState } from 'react';
import {
    Box, Typography, Paper, TextField, Button, Stack,
    Snackbar, Alert, Menu, MenuItem, ListItemIcon, TablePagination,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

import { useGetServices, useCreateService, useUpdateService, useDeleteService } from '@/hooks/useService';
import type { Service } from '@/types/serviceTypes';

import ServiceTable from '@/components/services/ServiceTable';
import CreateServiceModal from '@/components/services/CreateServiceModal';
import EditServiceModal from '@/components/services/EditServiceModal';
import ServiceDetailsModal from '@/components/services/ServiceDetailsModal';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function ServiceIndex() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [focusedService, setFocusedService] = useState<Service | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' } | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: serviceResponse, isLoading, isFetching, error } = useGetServices({
        page,
        size: rowsPerPage,
        search: debouncedSearchTerm,
    });
    const createService = useCreateService();
    const updateService = useUpdateService();
    const deleteService = useDeleteService();

    const services = serviceResponse?.data.content || [];
    const totalElements = serviceResponse?.data.totalElements || 0;

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, service: Service) => {
        setAnchorEl(event.currentTarget);
        setFocusedService(service);
    };

    const handleMenuClose = () => setAnchorEl(null);
    const handleDetailsModalClose = () => { setDetailsModalOpen(false); setFocusedService(null); };
    const handleEditModalClose = () => { setEditModalOpen(false); setFocusedService(null); };
    const handleDeleteDialogClose = () => { setDeleteConfirmOpen(false); setFocusedService(null); };

    const handleCreate = async (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await createService.mutateAsync(data);
            setSnackbar({ open: true, message: 'Serviço criado com sucesso!', severity: 'success' });
            setCreateModalOpen(false);
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao criar serviço.', severity: 'error' });
        }
    };

    const handleUpdate = async (data: Partial<Service>) => {
        if (!focusedService) return;
        try {
            await updateService.mutateAsync({ id: focusedService.id, data });
            setSnackbar({ open: true, message: 'Serviço atualizado com sucesso!', severity: 'success' });
            handleEditModalClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao atualizar serviço.', severity: 'error' });
        }
    };

    const handleDelete = async () => {
        if (!focusedService) return;
        try {
            await deleteService.mutateAsync(focusedService.id);
            setSnackbar({ open: true, message: 'Serviço excluído com sucesso!', severity: 'success' });
            handleDeleteDialogClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao excluir serviço.', severity: 'error' });
        }
    };

    if (error) {
        return <Typography color="error">Ocorreu um erro ao buscar os serviços: {error.message}</Typography>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Cadastro de Serviços
            </Typography>
            <Paper elevation={2} sx={{ borderRadius: 4, p: 3, position: 'relative' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        label="Pesquisar por Nome ou Descrição"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" color="success" onClick={() => setCreateModalOpen(true)}>
                        + Incluir
                    </Button>
                </Stack>
                <ServiceTable
                    services={services}
                    loading={isLoading}
                    isFetching={isFetching}
                    onMenuOpen={handleMenuOpen}
                />
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage="Resultados por página"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
            </Paper>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { setDetailsModalOpen(true); handleMenuClose(); }}>
                    <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
                    Detalhes
                </MenuItem>
                <MenuItem onClick={() => { setEditModalOpen(true); handleMenuClose(); }}>
                    <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                    Editar
                </MenuItem>
                <MenuItem onClick={() => { setDeleteConfirmOpen(true); handleMenuClose(); }}>
                    <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
                    Excluir
                </MenuItem>
            </Menu>

            <CreateServiceModal open={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreate} loading={createService.isPending} />
            {focusedService && (
                <>
                    <EditServiceModal open={isEditModalOpen} onClose={handleEditModalClose} onSubmit={handleUpdate} serviceId={focusedService.id} loading={updateService.isPending} />
                    <ServiceDetailsModal open={isDetailsModalOpen} onClose={handleDetailsModalClose} serviceId={focusedService.id} />
                    <DeleteConfirmationDialog
                        open={isDeleteConfirmOpen}
                        onClose={handleDeleteDialogClose}
                        onConfirm={handleDelete}
                        title="Confirmar Exclusão"
                        message={`Tem certeza que deseja excluir o serviço "${focusedService.name}"?`}
                        loading={deleteService.isPending}
                    />
                </>
            )}

            <Snackbar open={snackbar?.open} autoHideDuration={6000} onClose={() => setSnackbar(null)}>
                <Alert onClose={() => setSnackbar(null)} severity={snackbar?.severity} sx={{ width: '100%' }}>
                    {snackbar?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}