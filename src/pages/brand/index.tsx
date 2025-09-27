import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, IconButton, TextField, Button,
    Stack, CircularProgress, Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { useGetBrands } from '@/hooks/useBrand';

// Hook de Debounce para evitar muitas chamadas à API enquanto o usuário digita
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export default function BrandIndex() {
    // Estados para controle da UI
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    // Aplica o debounce ao termo de busca
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de atraso

    // Chama o hook com os parâmetros do estado
    const { data: brandResponse, isLoading, isFetching, error } = useGetBrands({
        page,
        size: rowsPerPage,
        search: debouncedSearchTerm,
    });

    // Extrai os dados e a contagem total da resposta da API
    const brands = brandResponse?.data.content || [];
    const totalElements = brandResponse?.data.totalElements || 0;

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Volta para a primeira página ao mudar a quantidade de itens
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
                {/* Indicador de carregamento sutil para re-buscas (troca de página, etc) */}
                {(isLoading || isFetching) && (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1 }}>
                        <CircularProgress sx={{ height: '4px !important', width: '100%', borderRadius: 0 }} />
                    </Box>
                )}

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        label="Pesquisar por Nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" color="success">
                        + Incluir
                    </Button>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.map((brand) => (
                                <TableRow key={brand.id} hover>
                                    <TableCell>{brand.name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={brand.isActive ? 'Ativo' : 'Inativo'}
                                            color={brand.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <IconButton color="primary" size="small" aria-label="editar">
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" size="small" aria-label="deletar">
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={totalElements} // Usa o total de elementos do servidor
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage="Resultados por página"
                />
            </Paper>
        </Box>
    );
}