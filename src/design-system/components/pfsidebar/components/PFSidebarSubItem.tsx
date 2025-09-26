import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import * as LucideIcons from 'lucide-react';
import type { NavChild } from '../types';

export type PFSidebarSubItemProps = {
    child: NavChild;
    active: string | null;
    setActive: (val: string) => void;
    onNavigate: (path: string) => void;
};

export default function PFSidebarSubItem({ child, active, setActive, onNavigate }: PFSidebarSubItemProps) {
    const theme = useTheme();
    const ChildIcon = LucideIcons[child.icon] as React.ElementType;
    const isChildActive = active === child.title;

    return (
        <ListItemButton
            onClick={() => {
                setActive(child.title);
                onNavigate(child.path);
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
}
