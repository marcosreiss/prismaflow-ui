import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Stack,
    CircularProgress,
    Snackbar,
    Alert,
    Menu,
    MenuItem,
    ListItemIcon,
    TablePagination,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

// Hooks de dados para Marcas
import { useGetBrands, useCreateBrand, useUpdateBrand, useDeleteBrand } from '@/hooks/useBrand';
import type { Brand } from '@/types/brandTypes';

// Componentes de UI que criamos
import BrandTable from '@/components/brand/BrandTable';
import CreateBrandModal from '@/components/brand/CreateBrandModal';
import EditBrandModal from '@/components/brand/EditBrandModal';
import BrandDetailsModal from '@/components/brand/BrandDetailsModal';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';

// Hook de Debounce para evitar muitas chamadas à API enquanto o usuário digita
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function BrandIndex() {
    // --- ESTADOS DE CONTROLE DA UI ---
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    // Controle dos modais e diálogos
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    // Item atualmente em foco para edição, detalhes ou exclusão
    const [focusedBrand, setFocusedBrand] = useState<Brand | null>(null);

    // Controle do menu de ações
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Controle de notificações (snackbar)
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' } | null>(null);

    // --- LÓGICA DE DADOS (QUERIES E MUTATIONS) ---
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: brandResponse, isLoading, isFetching, error } = useGetBrands({
        page,
        size: rowsPerPage,
        search: debouncedSearchTerm,
    });
    const createBrand = useCreateBrand();
    const updateBrand = useUpdateBrand();
    const deleteBrand = useDeleteBrand();

    // Extração dos dados
    const brands = brandResponse?.data.content || [];
    const totalElements = brandResponse?.data.totalElements || 0;

    // --- HANDLERS DE EVENTOS ---
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Volta para a primeira página ao mudar a quantidade de itens
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, brand: Brand) => {
        setAnchorEl(event.currentTarget);
        setFocusedBrand(brand);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDetailsModalClose = () => {
        setDetailsModalOpen(false);
        setFocusedBrand(null);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setFocusedBrand(null);
    };

    const handleDeleteDialogClose = () => {
        setDeleteConfirmOpen(false);
        setFocusedBrand(null);
    };

    // Handlers para CRUD
    const handleCreate = async (data: Omit<Brand, 'id'>) => {
        try {
            await createBrand.mutateAsync(data);
            setSnackbar({ open: true, message: 'Marca criada com sucesso!', severity: 'success' });
            setCreateModalOpen(false);
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao criar marca.', severity: 'error' });
        }
    };

    const handleUpdate = async (data: Partial<Brand>) => {
        if (!focusedBrand) return;
        try {
            await updateBrand.mutateAsync({ id: focusedBrand.id, data });
            setSnackbar({ open: true, message: 'Marca atualizada com sucesso!', severity: 'success' });
            handleEditModalClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao atualizar marca.', severity: 'error' });
        }
    };

    const handleDelete = async () => {
        if (!focusedBrand) return;
        try {
            await deleteBrand.mutateAsync(focusedBrand.id);
            setSnackbar({ open: true, message: 'Marca excluída com sucesso!', severity: 'success' });
            handleDeleteDialogClose();
        } catch (err) {
            setSnackbar({ open: true, message: 'Erro ao excluir marca.', severity: 'error' });
        }
    };

    if (error) {
        return <Typography color="error">Ocorreu um erro ao buscar as marcas: {error.message}</Typography>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Cadastro de Marcas
            </Typography>

            <Paper elevation={2} sx={{ borderRadius: 4, p: 3, position: 'relative' }}>
                {/* {(isFetching) && (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1 }}>
                        <CircularProgress sx={{ height: '4px !important', width: '100%', borderRadius: 0 }} />
                    </Box>
                )} */}

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        label="Pesquisar por Nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" color="success" onClick={() => setCreateModalOpen(true)}>
                        + Incluir
                    </Button>
                </Stack>

                <BrandTable
                    brands={brands}
                    loading={isLoading}
                    isFetching={isFetching}//
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

            {/* --- MENU DE AÇÕES --- */}
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

            {/* --- MODAIS E DIÁLOGOS --- */}
            <CreateBrandModal
                open={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreate}
                loading={createBrand.isPending}
            />
            {focusedBrand && (
                <>
                    <EditBrandModal
                        open={isEditModalOpen}
                        onClose={handleEditModalClose}
                        onSubmit={handleUpdate}
                        brandId={focusedBrand.id}
                        loading={updateBrand.isPending}
                    />
                    <BrandDetailsModal
                        open={isDetailsModalOpen}
                        onClose={handleDetailsModalClose}
                        brandId={focusedBrand.id}
                    />
                    <DeleteConfirmationDialog
                        open={isDeleteConfirmOpen}
                        onClose={handleDeleteDialogClose}
                        onConfirm={handleDelete}
                        title="Confirmar Exclusão"
                        message={`Tem certeza que deseja excluir a marca "${focusedBrand.name}"? Esta ação não pode ser desfeita.`}
                        loading={deleteBrand.isPending}
                    />
                </>
            )}

            {/* --- NOTIFICAÇÕES --- */}
            <Snackbar open={snackbar?.open} autoHideDuration={6000} onClose={() => setSnackbar(null)}>
                <Alert onClose={() => setSnackbar(null)} severity={snackbar?.severity} sx={{ width: '100%' }}>
                    {snackbar?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}