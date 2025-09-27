import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, Stack, CircularProgress, Chip
} from '@mui/material';
import { useGetCustomerById } from '@/hooks/useCustomer';

interface Props {
    open: boolean;
    onClose: () => void;
    customerId: number;
}

const DetailStack = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <Stack>
        <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>{value || '—'}</Typography>
    </Stack>
);

export default function CustomerDetailsModal({ open, onClose, customerId }: Props) {
    const { data: customerResponse, isLoading } = useGetCustomerById(customerId);
    const customer = customerResponse?.data;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogContent dividers>
                {isLoading && <Stack alignItems="center" p={3}><CircularProgress /></Stack>}
                {customer ? (
                    <Stack spacing={2}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>Dados Pessoais</Typography>
                        <DetailStack label="Nome Completo" value={customer.name} />
                        <DetailStack label="Apelido" value={customer.nickname} />
                        <DetailStack label="CPF" value={customer.cpf} />
                        <DetailStack label="RG" value={customer.rg} />
                        <DetailStack label="Data de Nascimento" value={customer.bornDate ? new Date(customer.bornDate).toLocaleDateString('pt-BR') : '—'} />
                        <DetailStack label="Gênero" value={customer.gender} />
                        <DetailStack label="Nome do Pai" value={customer.fatherName} />
                        <DetailStack label="Nome da Mãe" value={customer.motherName} />
                        <DetailStack label="Cônjuge" value={customer.spouse} />

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>Contato e Trabalho</Typography>
                        <DetailStack label="Email" value={customer.email} />
                        <DetailStack label="Telefone 1" value={customer.phone01} />
                        <DetailStack label="Telefone 2" value={customer.phone02} />
                        <DetailStack label="Telefone 3" value={customer.phone03} />
                        <DetailStack label="Empresa" value={customer.company} />
                        <DetailStack label="Profissão" value={customer.occupation} />

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>Endereço</Typography>
                        <DetailStack label="CEP" value={customer.cep} />
                        <DetailStack label="Rua" value={customer.street} />
                        <DetailStack label="Número" value={customer.number} />
                        <DetailStack label="Bairro" value={customer.neighborhood} />
                        <DetailStack label="Complemento" value={customer.complement} />
                        <DetailStack label="Cidade" value={customer.city} />
                        <DetailStack label="UF" value={customer.uf} />

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>Outras Informações</Typography>
                        <DetailStack label="Observações" value={customer.obs} />
                        <DetailStack label="Referência 1" value={customer.reference01} />
                        <DetailStack label="Referência 2" value={customer.reference02} />
                        <DetailStack label="Referência 3" value={customer.reference03} />
                        <DetailStack label="Status" value={<Chip label={customer.isActive ? 'Ativo' : 'Inativo'} color={customer.isActive ? 'success' : 'default'} size="small" />} />
                        <DetailStack label="Na Lista Negra?" value={<Chip label={customer.isBlacklisted ? 'Sim' : 'Não'} color={customer.isBlacklisted ? 'error' : 'default'} size="small" />} />
                    </Stack>
                ) : !isLoading ? (<Typography>Não foi possível carregar os detalhes.</Typography>) : null}
            </DialogContent>
            <DialogActions><Button onClick={onClose}>Fechar</Button></DialogActions>
        </Dialog>
    );
}