import React from 'react';
import {
    CircularProgress, IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Box, Chip, Typography
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { Product } from '@/types/productTypes';

interface Props {
    products: Product[];
    loading: boolean;
    isFetching?: boolean;
    onMenuOpen: (e: React.MouseEvent<HTMLElement>, product: Product) => void;
}

export default function ProductTable({ products, loading, isFetching, onMenuOpen }: Props) {
    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" p={4} sx={{ height: '60vh' }}><CircularProgress /></Box>;
    }

    // --- CORREÇÃO APLICADA AQUI ---
    // A função agora verifica se o valor recebido é um número antes de formatar.
    const formatCurrency = (value: number | null | undefined) => {
        if (typeof value !== 'number') {
            return '—'; // Retorna um traço se o valor for nulo ou indefinido
        }
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

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
                            <TableCell>Marca</TableCell>
                            <TableCell>Preço de Venda</TableCell>
                            <TableCell>Estoque</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow><TableCell colSpan={6} align="center">Nenhum produto encontrado.</TableCell></TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id} hover>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand?.name || '—'}</TableCell>
                                    {/* Agora esta chamada é segura */}
                                    <TableCell>{formatCurrency(product.salePrice)}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color={product.stockQuantity <= product.minimumStock ? 'error' : 'text.primary'}>
                                            {product.stockQuantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={product.isActive ? 'Ativo' : 'Inativo'} color={product.isActive ? 'success' : 'default'} size="small" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(e) => onMenuOpen(e, product)}><MoreVert /></IconButton>
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