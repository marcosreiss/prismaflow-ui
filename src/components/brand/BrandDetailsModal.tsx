import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Stack,
    CircularProgress,
    Chip,
} from '@mui/material';
import { useGetBrandById } from '@/hooks/useBrand';

interface Props {
    open: boolean;
    onClose: () => void;
    brandId: number;
}

export default function BrandDetailsModal({ open, onClose, brandId }: Props) {
    const { data: brandResponse, isLoading } = useGetBrandById(brandId);

    if (isLoading) {
        return (
            <Dialog open={open} fullWidth maxWidth="sm">
                <Stack alignItems="center" p={4}>
                    <CircularProgress />
                </Stack>
            </Dialog>
        );
    }

    // Supondo que a apiResponse tenha a propriedade 'data'
    const brand = brandResponse?.data;

    const format = (value?: string | number | null) => {
        if (value === null || value === undefined || value === '') return '—';
        return value;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Detalhes da Marca</DialogTitle>
            <DialogContent dividers>
                {brand ? (
                    <Stack spacing={2}>
                        <Stack>
                            <Typography variant="subtitle2" color="text.secondary">Nome</Typography>
                            <Typography variant="body1">{format(brand.name)}</Typography>
                        </Stack>
                        <Divider />
                        <Stack>
                            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                            <Chip
                                label={brand.isActive ? 'Ativo' : 'Inativo'}
                                color={brand.isActive ? 'success' : 'default'}
                                size="small"
                                sx={{ width: 'fit-content' }}
                            />
                        </Stack>
                    </Stack>
                ) : (
                    <Typography>Não foi possível carregar os detalhes da marca.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}