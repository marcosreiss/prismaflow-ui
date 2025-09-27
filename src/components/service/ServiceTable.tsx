import React from 'react';
import {
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Chip,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { Service } from '@/types/serviceTypes';

interface Props {
    services: Service[];
    loading: boolean;
    isFetching?: boolean;
    onMenuOpen: (e: React.MouseEvent<HTMLElement>, service: Service) => void;
}

export default function ServiceTable({
    services,
    loading,
    isFetching,
    onMenuOpen,
}: Props) {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={4} sx={{ height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <Box sx={{ position: 'relative' }}>
            {isFetching && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            <TableContainer component={Paper} sx={{ height: '60vh', backgroundColor: 'white' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Custo</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Nenhum serviço encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map((service) => (
                                <TableRow key={service.id} hover>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{formatCurrency(service.price)}</TableCell>
                                    <TableCell>{formatCurrency(service.cost)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={service.isActive ? 'Ativo' : 'Inativo'}
                                            color={service.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(e) => onMenuOpen(e, service)}>
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}