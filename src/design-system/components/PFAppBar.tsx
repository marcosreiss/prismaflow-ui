// src/design-system/components/PFAppBar.tsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PFAppBar() {
    return (
        <AppBar position="static" color="transparent" elevation={0}
            sx={{
                border: '1px solid rgba(31,41,55,0.08)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255,255,255,0.7)'
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <Box sx={{ width: 28, height: 28, border: '2px solid #8B5CF6', borderLeftColor: '#4BA3F2', transform: 'rotate(60deg)', borderRadius: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>PrismaFlow</Typography>
                <Box sx={{ flex: 1 }} />
            </Toolbar>
        </AppBar>
    );
}
