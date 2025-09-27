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
    Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGetBrandById } from "@/hooks/useBrand";

type BrandPayload = Omit<import('@/types/brandTypes').Brand, 'id'>;

interface Props {
    open: boolean;
    onClose: () => void;
    brandId: number;
    onSubmit: (data: BrandPayload) => void;
    loading?: boolean;
}

export default function EditBrandModal({
    open,
    onClose,
    brandId,
    onSubmit,
    loading = false,
}: Props) {
    const { data: brandResponse, isLoading: isBrandLoading } = useGetBrandById(brandId);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BrandPayload>({
        defaultValues: {
            name: "",
            isActive: true,
        },
    });

    useEffect(() => {
        const brand = brandResponse?.data;
        if (brand) {
            reset({
                name: brand.name,
                isActive: brand.isActive,
            });
        }
    }, [brandResponse, reset]);

    const onFormSubmit = (data: BrandPayload) => {
        onSubmit(data);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Marca</DialogTitle>
            <Box component="form" id="edit-brand-form" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent dividers>
                    {isBrandLoading ? (
                        <Stack alignItems="center" p={4}>
                            <CircularProgress />
                        </Stack>
                    ) : (
                        <>
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
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" type="submit" form="edit-brand-form" disabled={loading || isBrandLoading}>
                        {loading ? <CircularProgress size={24} /> : "Atualizar"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
} 6