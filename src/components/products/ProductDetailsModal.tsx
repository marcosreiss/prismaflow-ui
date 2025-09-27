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
import { useGetProductById } from '@/hooks/useProduct';

interface Props {
    open: boolean;
    onClose: () => void;
    productId: number;
}

export default function ProductDetailsModal({ open, onClose, productId }: Props) {
    const { data: productResponse, isLoading } = useGetProductById(productId);
    const product = productResponse?.data;

    // A função formatDate foi removida pois não é mais necessária
    const formatCurrency = (value: number | null | undefined) => {
        if (typeof value !== 'number') return '—';
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Detalhes do Produto</DialogTitle>
            <DialogContent dividers>
                {isLoading && <CircularProgress />}
                {product ? (
                    <Stack spacing={2} sx={{ '& .MuiTypography-subtitle2': { fontWeight: 'bold' } }}>
                        <Stack><Typography variant="subtitle2">Nome:</Typography><Typography variant="body1">{product.name}</Typography></Stack>
                        <Divider />
                        <Stack><Typography variant="subtitle2">Descrição:</Typography><Typography variant="body1">{product.description || '—'}</Typography></Stack>
                        <Divider />
                        <Stack direction="row" spacing={4}>
                            <Stack><Typography variant="subtitle2">Preço de Custo:</Typography><Typography variant="body1">{formatCurrency(product.costPrice)}</Typography></Stack>
                            <Stack><Typography variant="subtitle2">Markup:</Typography><Typography variant="body1">{product.markup}%</Typography></Stack>
                            <Stack><Typography variant="subtitle2">Preço de Venda:</Typography><Typography variant="body1">{formatCurrency(product.salePrice)}</Typography></Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={4}>
                            <Stack><Typography variant="subtitle2">Estoque Atual:</Typography><Typography variant="body1">{product.stockQuantity}</Typography></Stack>
                            <Stack><Typography variant="subtitle2">Estoque Mínimo:</Typography><Typography variant="body1">{product.minimumStock}</Typography></Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={4}>
                            <Stack><Typography variant="subtitle2">Categoria:</Typography><Typography variant="body1">{product.category}</Typography></Stack>
                            <Stack><Typography variant="subtitle2">Marca:</Typography><Typography variant="body1">{product.brand?.name || 'Sem marca'}</Typography></Stack>
                        </Stack>
                        <Divider />
                        <Stack>
                            <Typography variant="subtitle2">Status:</Typography>
                            <Chip
                                label={product.isActive ? 'Ativo' : 'Inativo'}
                                color={product.isActive ? 'success' : 'default'}
                                size="small"
                                sx={{ width: 'fit-content' }}
                            />
                        </Stack>
                        {/* As seções "Criado em" e "Atualizado em" foram removidas daqui */}
                    </Stack>
                ) : !isLoading ? (<Typography>Não foi possível carregar os detalhes.</Typography>) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}