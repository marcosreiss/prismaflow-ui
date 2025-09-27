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
import { useGetServiceById } from '@/hooks/useService';

interface Props {
    open: boolean;
    onClose: () => void;
    serviceId: number;
}

export default function ServiceDetailsModal({ open, onClose, serviceId }: Props) {
    const { data: serviceResponse, isLoading } = useGetServiceById(serviceId);

    const service = serviceResponse?.data;

    const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formatDate = (dateString: string) => new Date(dateString).toLocaleString('pt-BR');

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Detalhes do Serviço</DialogTitle>
            <DialogContent dividers>
                {isLoading && <CircularProgress />}
                {service ? (
                    <Stack spacing={2}>
                        <Stack><Typography variant="subtitle2" color="text.secondary">Nome</Typography><Typography variant="body1">{service.name}</Typography></Stack>
                        <Divider />
                        <Stack><Typography variant="subtitle2" color="text.secondary">Descrição</Typography><Typography variant="body1">{service.description || '—'}</Typography></Stack>
                        <Divider />
                        <Stack><Typography variant="subtitle2" color="text.secondary">Preço</Typography><Typography variant="body1">{formatCurrency(service.price)}</Typography></Stack>
                        <Divider />
                        <Stack><Typography variant="subtitle2" color="text.secondary">Custo</Typography><Typography variant="body1">{formatCurrency(service.cost)}</Typography></Stack>
                        <Divider />
                        <Stack>
                            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                            <Chip
                                label={service.isActive ? 'Ativo' : 'Inativo'}
                                color={service.isActive ? 'success' : 'default'}
                                size="small"
                                sx={{ width: 'fit-content' }}
                            />
                        </Stack>
                        <Divider />
                        <Stack><Typography variant="subtitle2" color="text.secondary">Criado em</Typography><Typography variant="body1">{formatDate(service.createdAt)}</Typography></Stack>
                        <Divider />
                        <Stack><Typography variant="subtitle2" color="text.secondary">Atualizado em</Typography><Typography variant="body1">{formatDate(service.updatedAt)}</Typography></Stack>
                    </Stack>
                ) : !isLoading ? (
                    <Typography>Não foi possível carregar os detalhes do serviço.</Typography>
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}