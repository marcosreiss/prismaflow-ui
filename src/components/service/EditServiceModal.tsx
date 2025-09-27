import { useEffect } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, CircularProgress, MenuItem, Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useGetServiceById } from '@/hooks/useService';
import type { Service } from '@/types/serviceTypes';

type ServicePayload = Omit<Service, 'id' | 'createdAt' | 'updatedAt'>;

interface Props {
    open: boolean;
    onClose: () => void;
    serviceId: number;
    onSubmit: (data: ServicePayload) => void;
    loading?: boolean;
}

export default function EditServiceModal({ open, onClose, serviceId, onSubmit, loading = false }: Props) {
    const { data: serviceResponse, isLoading: isServiceLoading } = useGetServiceById(serviceId);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<ServicePayload>();

    useEffect(() => {
        const service = serviceResponse?.data;
        if (service) {
            reset({
                name: service.name,
                description: service.description,
                price: service.price,
                cost: service.cost,
                isActive: service.isActive,
            });
        }
    }, [serviceResponse, reset]);

    const onFormSubmit = (data: ServicePayload) => onSubmit(data);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Serviço</DialogTitle>
            <Box component="form" id="edit-service-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
                    {isServiceLoading ? (
                        <Stack alignItems="center" p={4}><CircularProgress /></Stack>
                    ) : (
                        <>
                            <Controller name="name" control={control} rules={{ required: "O nome é obrigatório" }}
                                render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Nome do Serviço" error={!!errors.name} helperText={errors.name?.message} autoFocus />}
                            />
                            <Controller name="description" control={control}
                                render={({ field }) => <TextField {...field} margin="dense" fullWidth multiline rows={3} label="Descrição" />}
                            />
                            <Controller name="price" control={control} rules={{ required: "O preço é obrigatório", min: { value: 0.01, message: "O preço deve ser positivo" } }}
                                render={({ field }) => <TextField {...field} type="number" inputProps={{ step: "0.01" }} margin="dense" fullWidth label="Preço" error={!!errors.price} helperText={errors.price?.message} />}
                            />
                            <Controller name="cost" control={control} rules={{ required: "O custo é obrigatório", min: { value: 0, message: "O custo não pode ser negativo" } }}
                                render={({ field }) => <TextField {...field} type="number" inputProps={{ step: "0.01" }} margin="dense" fullWidth label="Custo" error={!!errors.cost} helperText={errors.cost?.message} />}
                            />
                            <Controller name="isActive" control={control}
                                render={({ field }) => (
                                    <TextField {...field} select margin="dense" fullWidth label="Status">
                                        <MenuItem value="true">Ativo</MenuItem>
                                        <MenuItem value="false">Inativo</MenuItem>
                                    </TextField>
                                )}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="edit-service-form" disabled={loading || isServiceLoading}>
                        {loading ? <CircularProgress size={24} /> : "Atualizar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}