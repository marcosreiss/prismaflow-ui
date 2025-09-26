import { Grid, Box } from "@mui/material";
import PFStatCard from "@/design-system/components/pfstatcard/PFStatCard";
import PFChartCard from "@/design-system/components/pfchartcard/PFChartCard";
import PFRecentList from "@/design-system/components/pfrecentlist/PFRecentList";
import { mockStats } from "@/mock/dashboard";

export default function DashboardPage() {
    return (
        <Box sx={{ p: 3 }}>
            {/* KPIs */}
            <Grid container spacing={2}>
                {mockStats.map((stat) => (
                    <Grid key={stat.title} item xs={12} sm={6} md={3}>
                        <PFStatCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Gráfico */}
            <Box sx={{ mt: 3 }}>
                <PFChartCard title="Vendas por Mês" data={mockSalesChart} />
            </Box>

            {/* Listas recentes */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} md={6}>
                    <PFRecentList title="Vendas Recentes" items={mockRecentSales} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PFRecentList title="Pagamentos Recentes" items={mockRecentPayments} />
                </Grid>
            </Grid>
        </Box>
    );
}
