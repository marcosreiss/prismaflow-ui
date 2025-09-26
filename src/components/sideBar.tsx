import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  Tooltip,
  useTheme,
} from '@mui/material';
import { ExpandLess, ExpandMore, Menu as MenuIcon, PinDrop } from '@mui/icons-material';
import { navData } from '@/routes/nav-config';
import { useRouter } from '@/routes/hooks';

const drawerWidthOpen = 240;
const drawerWidthClosed = 64;

type SidebarProps = {
  open: boolean;
  toggleDrawer: () => void;
};

const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme = useTheme() as any;
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        position: 'fixed',
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: 'width 0.4s ease',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          justifyContent: open ? 'space-between' : 'center',
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={toggleDrawer} size="small">
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      {/* Items */}
      <List>
        {navData.map((item) => {
          const Icon = item.icon ;
          const hasChildren = !!item.children;

          return (
            <Box key={item.title}>
              <ListItemButton
                onClick={() => {
                  if (hasChildren) toggleMenu(item.title);
                  else if (item.path) handleNavigate(item.path);
                }}
                sx={{
                  borderLeft: openMenus[item.title]
                    ? `4px solid ${theme.palette.primary.main}`
                    : '4px solid transparent',
                  '&:hover': {
                    background: theme.palette.action.hover,
                  },
                  gap: 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon
                    sx={{
                      color: openMenus[item.title]
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    }}
                  />
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  />
                )}

                {open && hasChildren && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {hasChildren && (
                <Collapse in={openMenus[item.title] && open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {item.children?.map((child) => (
                      <ListItemButton
                        key={child.title}
                        onClick={() => handleNavigate(child.path)}
                        sx={{
                          pl: 2,
                          borderLeft: '4px solid transparent',
                          '&:hover': { background: theme.palette.action.hover },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <PinDrop fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                        </ListItemIcon>
                        {open && (
                          <ListItemText
                            primary={child.title}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
