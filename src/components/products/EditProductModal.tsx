import { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, MenuItem, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useGetProductById } from '@/hooks/useProduct';
import { useGetBrands } from '@/hooks/useBrand';
import type { Product } from '@/types/productTypes';

type ProductPayload = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salePrice' | 'brand'> & {
    brandId: number | null;
};

interface Props {
    open: boolean;
    onClose: () => void;
    productId: number;
    onSubmit: (data: ProductPayload) => void;
    loading?: boolean;
}

export default function EditProductModal({ open, onClose, productId, onSubmit, loading = false }: Props) {
    const { data: productResponse, isLoading: isProductLoading } = useGetProductById(productId);
    const { data: brandsResponse } = useGetBrands({ page: 0, size: 1000 });
    const brands = brandsResponse?.data.content || [];

    const { control, handleSubmit, reset, formState: { errors } } = useForm<ProductPayload>();

    useEffect(() => {
        const product = productResponse?.data;
        if (product) {
            reset({
                name: product.name, description: product.description, costPrice: product.costPrice,
                markup: product.markup, stockQuantity: product.stockQuantity,
                minimumStock: product.minimumStock, category: product.category,
                brandId: product.brand?.id || null, isActive: product.isActive,
            });
        }
    }, [productResponse, reset]);

    const onFormSubmit = (data: ProductPayload) => onSubmit(data);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Produto</DialogTitle>
            <Box component="form" id="edit-product-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
                    {isProductLoading ? <Stack alignItems="center" p={4}><CircularProgress /></Stack> : (
                        <>
                            <Controller name="name" control={control} rules={{ required: "O nome é obrigatório" }} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Nome do Produto" error={!!errors.name} helperText={errors.name?.message} autoFocus />} />
                            <Controller name="description" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth multiline rows={3} label="Descrição" />} />
                            <Controller name="costPrice" control={control} rules={{ required: "Custo é obrigatório", min: 0 }} render={({ field }) => <TextField {...field} type="number" inputProps={{ step: "0.01" }} margin="dense" fullWidth label="Preço de Custo" error={!!errors.costPrice} helperText={errors.costPrice?.message} />} />
                            <Controller name="markup" control={control} rules={{ required: "Markup é obrigatório", min: 0 }} render={({ field }) => <TextField {...field} type="number" margin="dense" fullWidth label="Markup (%)" error={!!errors.markup} helperText={errors.markup?.message} />} />
                            <Controller name="stockQuantity" control={control} rules={{ required: "Estoque é obrigatório", min: 0 }} render={({ field }) => <TextField {...field} type="number" margin="dense" fullWidth label="Estoque Atual" error={!!errors.stockQuantity} helperText={errors.stockQuantity?.message} />} />
                            <Controller name="minimumStock" control={control} rules={{ required: "Estoque mínimo é obrigatório", min: 0 }} render={({ field }) => <TextField {...field} type="number" margin="dense" fullWidth label="Estoque Mínimo" error={!!errors.minimumStock} helperText={errors.minimumStock?.message} />} />
                            <Controller name="category" control={control} rules={{ required: "A categoria é obrigatória" }} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Categoria" error={!!errors.category} helperText={errors.category?.message} />} />
                            <Controller name="brandId" control={control} render={({ field }) => (
                                <TextField {...field} select margin="dense" fullWidth label="Marca">
                                    <MenuItem value=""><em>Nenhuma</em></MenuItem>
                                    {brands.map(brand => <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)}
                                </TextField>
                            )} />
                            <Controller name="isActive" control={control} render={({ field }) => (
                                <TextField {...field} select margin="dense" fullWidth label="Status">
                                    <MenuItem value="true">Ativo</MenuItem>
                                    <MenuItem value="false">Inativo</MenuItem>
                                </TextField>
                            )} />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="edit-product-form" disabled={loading || isProductLoading}>
                        {loading ? <CircularProgress size={24} /> : "Atualizar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}