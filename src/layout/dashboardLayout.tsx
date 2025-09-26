import { Box, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import PFSidebar, { SIDEBAR_WIDTH } from '@/design-system/components/pfsidebar/PFSidebar';
import { navData } from '@/routes/nav-config';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
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
            p: 3, // espaçamento interno
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
