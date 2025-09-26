import { Card, CardContent, Typography } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export type PFChartCardProps = {
    title: string;
    data: { name: string; value: number }[];
};

export default function PFChartCard({ title, data }: PFChartCardProps) {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <CardContent>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    {title}
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4BA3F2" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
