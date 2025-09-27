import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

// Supondo que não exista um payload específico, usamos Omit do tipo principal
type BrandPayload = Omit<import('@/types/brandTypes').Brand, 'id'>;

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: BrandPayload) => void;
    loading?: boolean;
}

export default function CreateBrandModal({
    open,
    onClose,
    onSubmit,
    loading = false,
}: Props) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BrandPayload>({
        defaultValues: {
            name: "",
            isActive: true, // Padrão como ativo
        },
    });

    const onFormSubmit = (data: BrandPayload) => {
        onSubmit(data);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Nova Marca</DialogTitle>
            <Box component="form" id="create-brand-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "O nome da marca é obrigatório" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Nome da Marca"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                autoFocus
                            />
                        )}
                    />

                    <Controller
                        name="isActive"
                        control={control}
                        rules={{ required: "O status é obrigatório" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                margin="normal"
                                fullWidth
                                label="Status"
                                error={!!errors.isActive}
                                helperText={errors.isActive?.message}
                            >
                                <MenuItem value="true">Ativo</MenuItem>
                                <MenuItem value="false">Inativo</MenuItem>
                            </TextField>
                        )}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="create-brand-form" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Salvar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}