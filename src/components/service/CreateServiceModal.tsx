import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, CircularProgress, MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { Service } from '@/types/serviceTypes';

type ServicePayload = Omit<Service, 'id' | 'createdAt' | 'updatedAt'>;

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ServicePayload) => void;
    loading?: boolean;
}

export default function CreateServiceModal({ open, onClose, onSubmit, loading = false }: Props) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ServicePayload>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            cost: 0,
            isActive: true,
        },
    });

    const onFormSubmit = (data: ServicePayload) => onSubmit(data);
    const handleClose = () => { reset(); onClose(); };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Novo Serviço</DialogTitle>
            <Box component="form" id="create-service-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="create-service-form" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Salvar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}