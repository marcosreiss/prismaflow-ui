
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, MenuItem, Typography, Divider } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { Customer } from '@/types/customerTypes';

type CustomerPayload = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CustomerPayload) => void;
    loading?: boolean;
}

export default function CreateCustomerModal({ open, onClose, onSubmit, loading = false }: Props) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<CustomerPayload>({
        defaultValues: {
            name: "", nickname: "", cpf: "", rg: "", bornDate: "", gender: "", fatherName: "", motherName: "", spouse: "",
            email: "", company: "", occupation: "", street: "", number: "", neighborhood: "", city: "", uf: "", cep: "",
            complement: "", isBlacklisted: false, obs: "", phone01: "", phone02: "", phone03: "",
            reference01: "", reference02: "", reference03: "", isActive: true,
        },
    });

    const onFormSubmit = (data: CustomerPayload) => onSubmit(data);
    const handleClose = () => { reset(); onClose(); };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Novo Cliente</DialogTitle>
            <Box component="form" id="create-customer-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
                    <Typography variant="subtitle1" gutterBottom>Dados Pessoais</Typography>
                    <Controller name="name" control={control} rules={{ required: "O nome é obrigatório" }} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Nome Completo" error={!!errors.name} helperText={errors.name?.message} autoFocus />} />
                    <Controller name="cpf" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="CPF" />} />
                    <Controller name="bornDate" control={control} render={({ field }) => <TextField {...field} type="date" InputLabelProps={{ shrink: true }} margin="dense" fullWidth label="Data de Nascimento" />} />

                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>Contato</Typography>
                    <Controller name="phone01" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Telefone Principal" />} />
                    <Controller name="email" control={control} render={({ field }) => <TextField {...field} type="email" margin="dense" fullWidth label="Email" />} />

                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>Endereço</Typography>
                    <Controller name="cep" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="CEP" />} />
                    <Controller name="street" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Rua" />} />
                    <Controller name="number" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Número" />} />
                    <Controller name="city" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="Cidade" />} />
                    <Controller name="uf" control={control} render={({ field }) => <TextField {...field} margin="dense" fullWidth label="UF" />} />

                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>Configurações</Typography>
                    <Controller name="isActive" control={control} render={({ field }) => (
                        <TextField {...field} select margin="dense" fullWidth label="Status">
                            <MenuItem value="true">Ativo</MenuItem>
                            <MenuItem value="false">Inativo</MenuItem>
                        </TextField>
                    )} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="create-customer-form" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Salvar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}