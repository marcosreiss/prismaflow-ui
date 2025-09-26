import * as LucideIcons from 'lucide-react';

export type LucideIconName = keyof typeof LucideIcons;

export type MockStat = {
  title: string;
  value: string | number;
  icon: LucideIconName;
  color: string; // cor do chip/ícone
};

export const mockStats: MockStat[] = [
  { title: 'Novos Clientes (mês)', value: 12, icon: 'User', color: '#34D399' },
  { title: 'Produtos Cadastrados', value: 128, icon: 'Box', color: '#4BA3F2' },
  { title: 'Estoque Baixo', value: 5, icon: 'AlertTriangle', color: '#EF4444' },

  { title: 'Vendas (mês)', value: 38, icon: 'ShoppingCart', color: '#8B5CF6' },
  { title: 'Faturamento (mês)', value: 'R$ 12.450', icon: 'Banknote', color: '#4BA3F2' },
  { title: 'Ticket Médio', value: 'R$ 327', icon: 'CreditCard', color: '#34D399' },

  { title: 'Descontos', value: 'R$ 1.230', icon: 'Percent', color: '#8B5CF6' },
  { title: 'Saldo Líquido', value: 'R$ 11.220', icon: 'Wallet', color: '#34D399' },
  { title: 'Vendas Pendentes', value: 4, icon: 'Clock', color: '#F59E0B' },
];

export const mockSalesChart: { name: string; value: number }[] = [
  { name: 'Jan', value: 1200 },
  { name: 'Fev', value: 1900 },
  { name: 'Mar', value: 800 },
  { name: 'Abr', value: 2400 },
  { name: 'Mai', value: 3000 },
  { name: 'Jun', value: 2800 },
  { name: 'Jul', value: 3200 },
  { name: 'Ago', value: 2600 },
  { name: 'Set', value: 3400 },
  { name: 'Out', value: 2900 },
  { name: 'Nov', value: 3100 },
  { name: 'Dez', value: 3600 },
];

export const mockRecentSales: { id: number; name: string; value: string }[] = [
  { id: 1, name: 'Venda #123', value: 'R$ 450,00' },
  { id: 2, name: 'Venda #124', value: 'R$ 320,00' },
  { id: 3, name: 'Venda #125', value: 'R$ 780,00' },
  { id: 4, name: 'Venda #126', value: 'R$ 210,00' },
  { id: 5, name: 'Venda #127', value: 'R$ 1.120,00' },
];

export const mockRecentPayments: { id: number; name: string; value: string }[] = [
  { id: 1, name: 'Pagamento #A1', value: 'R$ 200,00' },
  { id: 2, name: 'Pagamento #A2', value: 'R$ 600,00' },
  { id: 3, name: 'Pagamento #A3', value: 'R$ 150,00' },
  { id: 4, name: 'Pagamento #A4', value: 'R$ 420,00' },
  { id: 5, name: 'Pagamento #A5', value: 'R$ 980,00' },
];
