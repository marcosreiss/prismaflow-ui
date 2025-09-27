import React from 'react';
import {
    CircularProgress, IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Box, Chip
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { Customer } from '@/types/customerTypes';

interface Props {
    customers: Customer[];
    loading: boolean;
    isFetching?: boolean;
    onMenuOpen: (e: React.MouseEvent<HTMLElement>, customer: Customer) => void;
}

export default function CustomerTable({ customers, loading, isFetching, onMenuOpen }: Props) {
    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" p={4} sx={{ height: '60vh' }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ position: 'relative' }}>
            {isFetching && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, }}>
                    <CircularProgress />
                </Box>
            )}
            <TableContainer component={Paper} sx={{ height: '60vh', backgroundColor: 'white' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Telefone Principal</TableCell>
                            <TableCell>Cidade</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length === 0 ? (
                            <TableRow><TableCell colSpan={6} align="center">Nenhum cliente encontrado.</TableCell></TableRow>
                        ) : (
                            customers.map((customer) => (
                                <TableRow key={customer.id} hover>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.cpf || '—'}</TableCell>
                                    <TableCell>{customer.phone01 || '—'}</TableCell>
                                    <TableCell>{customer.city || '—'}</TableCell>
                                    <TableCell>
                                        <Chip label={customer.isActive ? 'Ativo' : 'Inativo'} color={customer.isActive ? 'success' : 'default'} size="small" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(e) => onMenuOpen(e, customer)}><MoreVert /></IconButton>
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