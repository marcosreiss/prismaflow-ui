import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as LucideIcons from 'lucide-react';

export type PFStatCardProps = {
    title: string;
    value: string | number;
    icon: keyof typeof LucideIcons;
    color?: string;
};

export default function PFStatCard({ title, value, icon, color }: PFStatCardProps) {
    const theme = useTheme();
    const Icon = LucideIcons[icon] as React.ElementType;

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                bgcolor: theme.palette.background.paper,
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: color || theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}
                    >
                        <Icon size={20} />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {title}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                            {value}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
