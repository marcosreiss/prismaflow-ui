import { Box, CssBaseline, useTheme } from '@mui/material';
import Header from '../components/Header';
import PFSidebar, { SIDEBAR_WIDTH } from '@/design-system/components/pfsidebar/PFSidebar';
import { navData } from '@/routes/nav-config';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme(); // Forçar a aplicação do tema MUI
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', bgcolor: theme.palette.background.default }}>
      <CssBaseline />
      <PFSidebar navData={navData} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          pl: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          transition: 'padding-left 0.3s ease',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 3,
            py: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
