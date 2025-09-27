import { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, MenuItem, Stack, Typography, Divider } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useGetCustomerById } from '@/hooks/useCustomer';
import type { Customer } from '@/types/customerTypes';

type CustomerPayload = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

interface Props {
    open: boolean;
    onClose: () => void;
    customerId: number;
    onSubmit: (data: CustomerPayload) => void;
    loading?: boolean;
}

export default function EditCustomerModal({ open, onClose, customerId, onSubmit, loading = false }: Props) {
    const { data: customerResponse, isLoading: isCustomerLoading } = useGetCustomerById(customerId);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<CustomerPayload>();

    useEffect(() => {
        const customer = customerResponse?.data;
        if (customer) {
            reset({
                name: customer.name || "", nickname: customer.nickname || "", cpf: customer.cpf || "", rg: customer.rg || "",
                bornDate: customer.bornDate ? customer.bornDate.split('T')[0] : "", // Formatar para YYYY-MM-DD
                gender: customer.gender || "", fatherName: customer.fatherName || "", motherName: customer.motherName || "", spouse: customer.spouse || "",
                email: customer.email || "", company: customer.company || "", occupation: customer.occupation || "", street: customer.street || "",
                number: customer.number || "", neighborhood: customer.neighborhood || "", city: customer.city || "", uf: customer.uf || "",
                cep: customer.cep || "", complement: customer.complement || "", isBlacklisted: customer.isBlacklisted || false,
                obs: customer.obs || "", phone01: customer.phone01 || "", phone02: customer.phone02 || "", phone03: customer.phone03 || "",
                reference01: customer.reference01 || "", reference02: customer.reference02 || "", reference03: customer.reference03 || "",
                isActive: customer.isActive,
            });
        }
    }, [customerResponse, reset]);

    const onFormSubmit = (data: CustomerPayload) => onSubmit(data);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Editar Cliente</DialogTitle>
            <Box component="form" id="edit-customer-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
                    {isCustomerLoading ? <Stack alignItems="center" p={4}><CircularProgress /></Stack> : (
                        <>
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
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="edit-customer-form" disabled={loading || isCustomerLoading}>
                        {loading ? <CircularProgress size={24} /> : "Atualizar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}