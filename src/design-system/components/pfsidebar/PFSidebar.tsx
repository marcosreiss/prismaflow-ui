import * as React from 'react';
import { Box, Drawer, List, Toolbar, useTheme } from '@mui/material';
import { useRouter } from '@/routes/hooks';
import PFSidebarLogo from './components/PFSidebarLogo';
import PFSidebarItem from './components/PFSidebarItem';
import type { NavItem } from './types';

export type PFSidebarProps = {
    navData: NavItem[];
    openMobile?: boolean;
    onCloseMobile?: () => void;
};

const drawerWidth = 240;

export default function PFSidebar({ navData, openMobile, onCloseMobile }: PFSidebarProps) {
    const theme = useTheme();
    const router = useRouter();
    const [active, setActive] = React.useState<string | null>(null);

    const content = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ py: 2, justifyContent: 'center' }}>
                <PFSidebarLogo />
            </Toolbar>

            <Box sx={{ flexGrow: 1, px: 1 }}>
                <List disablePadding>
                    {navData.map((item) => (
                        <PFSidebarItem
                            key={item.title}
                            item={item}
                            active={active}
                            setActive={setActive}
                            onNavigate={(path) => router.push(path)}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Mobile */}
            <Drawer
                open={openMobile}
                onClose={onCloseMobile}
                variant="temporary"
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {content}
            </Drawer>

            {/* Desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: `1px solid ${theme.palette.divider}`,
                    },
                }}
                open
            >
                {content}
            </Drawer>
        </>
    );
}
