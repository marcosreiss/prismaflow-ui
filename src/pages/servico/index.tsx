// src/pages/servico/ServiceIndex.tsx

import React from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, IconButton, TextField, Button,
    Stack, CircularProgress, Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { useGetServices } from '@/hooks/useService';
import type { Service } from '@/models/serviceModel';

export default function ServiceIndex() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');

    const { data: serviceResponse, isLoading, error } = useGetServices();
    const services = serviceResponse?.data.content || [];

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Carregando serviços...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Ocorreu um erro ao buscar os serviços: {error.message}</Typography>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Cadastro de Serviços
            </Typography>

            <Paper elevation={2} sx={{ borderRadius: 4, p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        label="Pesquisar por Nome ou Descrição"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                                <TableCell sx={{ fontWeight: 'bold' }}>Preço</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Custo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredServices
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((service: Service) => (
                                    <TableRow key={service.id} hover>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>{service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                                        <TableCell>{service.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={service.isActive ? 'Ativo' : 'Inativo'}
                                                color={service.isActive ? 'success' : 'default'}
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
                    count={filteredServices.length}
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