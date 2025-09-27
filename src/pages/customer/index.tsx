import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, Snackbar, Alert, Menu, MenuItem, ListItemIcon, TablePagination } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useGetCustomers, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '@/hooks/useCustomer';
import type { Customer } from '@/types/customerTypes';
import CustomerTable from '@/components/customer/CustomerTable';
import CreateCustomerModal from '@/components/customer/CreateCustomerModal';
import EditCustomerModal from '@/components/customer/EditCustomerModal';
import CustomerDetailsModal from '@/components/customer/CustomerDetailsModal';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function CustomerIndex() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [focusedCustomer, setFocusedCustomer] = useState<Customer | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' } | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: customerResponse, isLoading, isFetching, error } = useGetCustomers({ page, size: rowsPerPage, search: debouncedSearchTerm });
    const createCustomer = useCreateCustomer();
    const updateCustomer = useUpdateCustomer();
    const deleteCustomer = useDeleteCustomer();

    const customers = customerResponse?.data.content || [];
    const totalElements = customerResponse?.data.totalElements || 0;

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, customer: Customer) => { setAnchorEl(event.currentTarget); setFocusedCustomer(customer); };
    const handleMenuClose = () => setAnchorEl(null);
    const handleDetailsModalClose = () => { setDetailsModalOpen(false); setFocusedCustomer(null); };
    const handleEditModalClose = () => { setEditModalOpen(false); setFocusedCustomer(null); };
    const handleDeleteDialogClose = () => { setDeleteConfirmOpen(false); setFocusedCustomer(null); };

    const handleCreate = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await createCustomer.mutateAsync(data);
            setSnackbar({ open: true, message: 'Cliente criado com sucesso!', severity: 'success' });
            setCreateModalOpen(false);
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao criar cliente.', severity: 'error' });
        }
    };
    const handleUpdate = async (data: Partial<Customer>) => {
        if (!focusedCustomer) return;
        try {
            await updateCustomer.mutateAsync({ id: focusedCustomer.id, data });
            setSnackbar({ open: true, message: 'Cliente atualizado com sucesso!', severity: 'success' });
            handleEditModalClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao atualizar cliente.', severity: 'error' });
        }
    };
    const handleDelete = async () => {
        if (!focusedCustomer) return;
        try {
            await deleteCustomer.mutateAsync(focusedCustomer.id);
            setSnackbar({ open: true, message: 'Cliente excluído com sucesso!', severity: 'success' });
            handleDeleteDialogClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao excluir cliente.', severity: 'error' });
        }
    };

    if (error) { return <Typography color="error">Ocorreu um erro ao buscar os clientes: {error.message}</Typography>; }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Cadastro de Clientes</Typography>
            <Paper elevation={2} sx={{ borderRadius: 4, p: 3, position: 'relative' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <TextField size="small" label="Pesquisar por Nome ou CPF" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flexGrow: 1 }} />
                    <Button variant="contained" color="success" onClick={() => setCreateModalOpen(true)}>+ Incluir</Button>
                </Stack>
                <CustomerTable customers={customers} loading={isLoading} isFetching={isFetching} onMenuOpen={handleMenuOpen} />
                <TablePagination component="div" count={totalElements} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 25]} labelRowsPerPage="Resultados por página" labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`} />
            </Paper>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { setDetailsModalOpen(true); handleMenuClose(); }}><ListItemIcon><Visibility fontSize="small" /></ListItemIcon>Detalhes</MenuItem>
                <MenuItem onClick={() => { setEditModalOpen(true); handleMenuClose(); }}><ListItemIcon><Edit fontSize="small" /></ListItemIcon>Editar</MenuItem>
                <MenuItem onClick={() => { setDeleteConfirmOpen(true); handleMenuClose(); }}><ListItemIcon><Delete fontSize="small" /></ListItemIcon>Excluir</MenuItem>
            </Menu>

            <CreateCustomerModal open={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreate} loading={createCustomer.isPending} />
            {focusedCustomer && (
                <>
                    <EditCustomerModal open={isEditModalOpen} onClose={handleEditModalClose} onSubmit={handleUpdate} customerId={focusedCustomer.id} loading={updateCustomer.isPending} />
                    <CustomerDetailsModal open={isDetailsModalOpen} onClose={handleDetailsModalClose} customerId={focusedCustomer.id} />
                    <DeleteConfirmationDialog open={isDeleteConfirmOpen} onClose={handleDeleteDialogClose} onConfirm={handleDelete} title="Confirmar Exclusão" message={`Tem certeza que deseja excluir o cliente "${focusedCustomer.name}"?`} loading={deleteCustomer.isPending} />
                </>
            )}

            <Snackbar open={snackbar?.open} autoHideDuration={6000} onClose={() => setSnackbar(null)}>
                <Alert onClose={() => setSnackbar(null)} severity={snackbar?.severity} sx={{ width: '100%' }}>{snackbar?.message}</Alert>
            </Snackbar>
        </Box>
    );
}