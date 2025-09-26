import { Box, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import PFSidebar from '@/design-system/components/pfsidebar/PFSidebar';
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
          pl: "300px",
          transition: 'margin-left 0.9s ease',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
