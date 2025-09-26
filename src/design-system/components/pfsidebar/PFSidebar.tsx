// src/design-system/components/PFSidebar.tsx

"use client";

import * as React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useRouter } from '@/routes/hooks';
import * as LucideIcons from "lucide-react";

// Tipagem dos itens de menu
export type NavItem = {
    title: string;
    path?: string;
    icon: keyof typeof LucideIcons;
    children?: {
        title: string;
        path: string;
        icon: keyof typeof LucideIcons;
    }[];
};

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

    const renderItem = (item: NavItem) => {
        const Icon = LucideIcons[item.icon] as React.ElementType;
        const isActive = active === item.title;

        return (
            <React.Fragment key={item.title}>
                <ListItemButton
                    onClick={() => {
                        if (item.path) {
                            setActive(item.title);
                            router.push(item.path);
                        }
                    }}
                    sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                        bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                        '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                        <Icon
                            size={18}
                            color={isActive ? theme.palette.primary.main : theme.palette.text.secondary}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: isActive ? 600 : 400 }}
                    />
                </ListItemButton>

                {item.children && (
                    <Box sx={{ pl: 4 }}>
                        {item.children.map((child) => {
                            const ChildIcon = LucideIcons[child.icon] as React.ElementType;
                            const isChildActive = active === child.title;
                            return (
                                <ListItemButton
                                    key={child.title}
                                    onClick={() => {
                                        setActive(child.title);
                                        router.push(child.path);
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 0.5,
                                        color: isChildActive ? theme.palette.primary.main : theme.palette.text.secondary,
                                        bgcolor: isChildActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <ChildIcon
                                            size={16}
                                            color={isChildActive ? theme.palette.primary.main : theme.palette.text.secondary}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={child.title}
                                        primaryTypographyProps={{ variant: 'body2', fontWeight: isChildActive ? 600 : 400 }}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </Box>
                )}
            </React.Fragment>
        );
    };

    const content = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo */}
            <Toolbar sx={{ py: 2, justifyContent: 'center' }}>
                <img
                    src="/images/logo_prismaflow.webp"
                    alt="PrismaFlow"
                    style={{ width: 160, height: 40, objectFit: 'contain' }}
                />
            </Toolbar>


            {/* Menu */}
            <Box sx={{ flexGrow: 1, px: 1 }}>
                <List disablePadding>{navData.map((item) => renderItem(item))}</List>
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
