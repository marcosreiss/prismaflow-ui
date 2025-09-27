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
import type { Brand } from '@/types/brandTypes';

interface Props {
    brands: Brand[];
    loading: boolean;
    onMenuOpen: (e: React.MouseEvent<HTMLElement>, brand: Brand) => void;
    isFetching?: boolean; // <-- 1. ADICIONE ESTA LINHA AQUI
}

export default function BrandTable({
    brands,
    loading,
    isFetching, // <-- 2. E RECEBA A PROP AQUI
    onMenuOpen,
}: Props) {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={4} sx={{ height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Nenhuma marca encontrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            brands.map((brand) => (
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
                                        <IconButton onClick={(e) => onMenuOpen(e, brand)}>
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