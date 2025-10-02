import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Badge,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  AccountTree as AccountTreeIcon,
  Business as BusinessIcon,
  Verified as VerifiedIcon,
  Analytics as AnalyticsIcon,
  Extension as ExtensionIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import { navigationItems } from '../../utils/navigation';

interface SidebarProps {
  open: boolean;
  onDrawerToggle: () => void;
  drawerWidth: number;
}

const iconMap: { [key: string]: React.ReactElement } = {
  dashboard: <DashboardIcon />,
  inventory: <InventoryIcon />,
  account_tree: <AccountTreeIcon />,
  business: <BusinessIcon />,
  verified: <VerifiedIcon />,
  analytics: <AnalyticsIcon />,
  extension: <ExtensionIcon />,
};

const Sidebar: React.FC<SidebarProps> = ({ open, onDrawerToggle, drawerWidth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <>
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          p: open ? 2 : 1,
          minHeight: 64,
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                N
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1 }}>
                NetworkVision
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ERP Platform
              </Typography>
            </Box>
          </Box>
        )}
        
        <IconButton
          onClick={onDrawerToggle}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            color: 'text.secondary',
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ px: 1, py: 1 }}>
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          const icon = iconMap[item.icon] || <DashboardIcon />;

          return (
            <ListItem key={item.id} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              <Tooltip title={!open ? item.title : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  role="menuitem"
                  aria-label={`Navigate to ${item.title}`}
                  aria-current={active ? 'page' : undefined}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavigation(item.path);
                    }
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                    backgroundColor: active ? 'primary.main' : 'transparent',
                    color: active ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      backgroundColor: active
                        ? 'primary.dark'
                        : 'action.hover',
                    },
                    '&:focus': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'inherit',
                    }}
                  >
                    {item.badge ? (
                      <Badge
                        badgeContent={item.badge.count}
                        color={item.badge.color}
                        sx={{
                          '& .MuiBadge-badge': {
                            fontSize: '0.75rem',
                            height: 16,
                            minWidth: 16,
                          },
                        }}
                      >
                        {icon}
                      </Badge>
                    ) : (
                      icon
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiListItemText-primary': {
                        fontSize: '0.875rem',
                        fontWeight: active ? 600 : 500,
                      },
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mt: 'auto' }} />

      {/* Footer Section */}
      {open && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" fontWeight={500} gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="caption">
              Contact our support team for assistance
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: open ? drawerWidth : 64 }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: open ? drawerWidth : 64,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: 'hidden',
          },
        }}
        open={open}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

