import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, Snackbar, Alert, Menu, MenuItem, ListItemIcon, TablePagination } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProduct';
import type { Product } from '@/types/productTypes';
import ProductTable from '@/components/products/ProductTable';
import CreateProductModal from '@/components/products/CreateProductModal';
import EditProductModal from '@/components/products/EditProductModal';
import ProductDetailsModal from '@/components/products/ProductDetailsModal';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function ProductIndex() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [focusedProduct, setFocusedProduct] = useState<Product | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' } | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: productResponse, isLoading, isFetching, error } = useGetProducts({ page, size: rowsPerPage, search: debouncedSearchTerm });
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const products = productResponse?.data.content || [];
    const totalElements = productResponse?.data.totalElements || 0;

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, product: Product) => { setAnchorEl(event.currentTarget); setFocusedProduct(product); };
    const handleMenuClose = () => setAnchorEl(null);
    const handleDetailsModalClose = () => { setDetailsModalOpen(false); setFocusedProduct(null); };
    const handleEditModalClose = () => { setEditModalOpen(false); setFocusedProduct(null); };
    const handleDeleteDialogClose = () => { setDeleteConfirmOpen(false); setFocusedProduct(null); };

    const handleCreate = async (data: any) => {
        try {
            await createProduct.mutateAsync(data);
            setSnackbar({ open: true, message: 'Produto criado com sucesso!', severity: 'success' });
            setCreateModalOpen(false);
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao criar produto.', severity: 'error' });
        }
    };
    const handleUpdate = async (data: any) => {
        if (!focusedProduct) return;
        try {
            await updateProduct.mutateAsync({ id: focusedProduct.id, data });
            setSnackbar({ open: true, message: 'Produto atualizado com sucesso!', severity: 'success' });
            handleEditModalClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao atualizar produto.', severity: 'error' });
        }
    };
    const handleDelete = async () => {
        if (!focusedProduct) return;
        try {
            await deleteProduct.mutateAsync(focusedProduct.id);
            setSnackbar({ open: true, message: 'Produto excluído com sucesso!', severity: 'success' });
            handleDeleteDialogClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao excluir produto.', severity: 'error' });
        }
    };

    if (error) { return <Typography color="error">Ocorreu um erro ao buscar os produtos: {error.message}</Typography>; }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Cadastro de Produtos</Typography>
            <Paper elevation={2} sx={{ borderRadius: 4, p: 3, position: 'relative' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <TextField size="small" label="Pesquisar por Nome ou Descrição" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flexGrow: 1 }} />
                    <Button variant="contained" color="success" onClick={() => setCreateModalOpen(true)}>+ Incluir</Button>
                </Stack>
                <ProductTable products={products} loading={isLoading} isFetching={isFetching} onMenuOpen={handleMenuOpen} />
                <TablePagination component="div" count={totalElements} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 25]} labelRowsPerPage="Resultados por página" labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`} />
            </Paper>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { setDetailsModalOpen(true); handleMenuClose(); }}><ListItemIcon><Visibility fontSize="small" /></ListItemIcon>Detalhes</MenuItem>
                <MenuItem onClick={() => { setEditModalOpen(true); handleMenuClose(); }}><ListItemIcon><Edit fontSize="small" /></ListItemIcon>Editar</MenuItem>
                <MenuItem onClick={() => { setDeleteConfirmOpen(true); handleMenuClose(); }}><ListItemIcon><Delete fontSize="small" /></ListItemIcon>Excluir</MenuItem>
            </Menu>

            <CreateProductModal open={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreate} loading={createProduct.isPending} />
            {focusedProduct && (
                <>
                    <EditProductModal open={isEditModalOpen} onClose={handleEditModalClose} onSubmit={handleUpdate} productId={focusedProduct.id} loading={updateProduct.isPending} />
                    <ProductDetailsModal open={isDetailsModalOpen} onClose={handleDetailsModalClose} productId={focusedProduct.id} />
                    <DeleteConfirmationDialog open={isDeleteConfirmOpen} onClose={handleDeleteDialogClose} onConfirm={handleDelete} title="Confirmar Exclusão" message={`Tem certeza que deseja excluir o produto "${focusedProduct.name}"?`} loading={deleteProduct.isPending} />
                </>
            )}

            <Snackbar open={snackbar?.open} autoHideDuration={6000} onClose={() => setSnackbar(null)}>
                <Alert onClose={() => setSnackbar(null)} severity={snackbar?.severity} sx={{ width: '100%' }}>{snackbar?.message}</Alert>
            </Snackbar>
        </Box>
    );
}