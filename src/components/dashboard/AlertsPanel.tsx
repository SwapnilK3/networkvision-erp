import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Chip,
  Divider,
  Button,
  alpha,
  useTheme,
  Badge,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  NotificationsActive as NotificationsActiveIcon,
} from '@mui/icons-material';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'error',
    title: 'Low Stock Alert',
    message: '5 items are critically low on stock',
    timestamp: '2 hours ago',
    actionUrl: '/inventory?filter=low-stock',
    priority: 'high',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Compliance Due',
    message: 'GST filing due in 2 days',
    timestamp: '4 hours ago',
    actionUrl: '/compliance',
    priority: 'high',
  },
  {
    id: '3',
    type: 'info',
    title: 'New Supplier Registered',
    message: 'ABC Corp has been successfully registered',
    timestamp: '1 day ago',
    actionUrl: '/suppliers',
    priority: 'medium',
  },
  {
    id: '4',
    type: 'success',
    title: 'BOM Approved',
    message: 'Product XYZ BOM v2.1 has been approved',
    timestamp: '2 days ago',
    actionUrl: '/bom',
    priority: 'low',
  },
  {
    id: '5',
    type: 'warning',
    title: 'Supplier Performance',
    message: 'DEF Ltd delivery performance dropped to 75%',
    timestamp: '3 days ago',
    actionUrl: '/suppliers',
    priority: 'medium',
  },
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'error':
      return <ErrorIcon color="error" />;
    case 'warning':
      return <WarningIcon color="warning" />;
    case 'info':
      return <InfoIcon color="info" />;
    case 'success':
      return <CheckCircleIcon color="success" />;
    default:
      return <InfoIcon />;
  }
};

const getAlertColor = (type: Alert['type']): 'error' | 'warning' | 'info' | 'success' => {
  switch (type) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    case 'success':
      return 'success';
    default:
      return 'info';
  }
};

const getPriorityColor = (priority: Alert['priority']): 'error' | 'warning' | 'success' => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'success';
  }
};

const AlertsPanel: React.FC = () => {
  const theme = useTheme();
  
  const handleAlertClick = (actionUrl?: string) => {
    if (actionUrl) {
      window.location.href = actionUrl;
    }
  };

  const highPriorityAlerts = mockAlerts.filter(alert => alert.priority === 'high');
  const otherAlerts = mockAlerts.filter(alert => alert.priority !== 'high');

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 600,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        backdropFilter: 'blur(20px)',
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsActiveIcon
              sx={{
                color: theme.palette.primary.main,
                animation: 'ring 2s ease-in-out infinite',
                '@keyframes ring': {
                  '0%, 100%': { transform: 'rotate(0deg)' },
                  '10%, 30%': { transform: 'rotate(-10deg)' },
                  '20%, 40%': { transform: 'rotate(10deg)' },
                  '50%': { transform: 'rotate(0deg)' },
                },
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Alerts & Notifications
            </Typography>
          </Box>
          <Badge
            badgeContent={mockAlerts.length}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                },
              },
            }}
          >
            <Chip
              label="Active"
              size="small"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Badge>
        </Box>

        <List
          sx={{
            p: 0,
            flexGrow: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '10px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
            },
          }}
        >
          {/* High Priority Alerts */}
          {highPriorityAlerts.map((alert, index) => (
            <Box
              key={alert.id}
              sx={{
                animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                '@keyframes slideInLeft': {
                  from: {
                    opacity: 0,
                    transform: 'translateX(-20px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleAlertClick(alert.actionUrl)}
                  sx={{
                    borderRadius: 3,
                    mb: 1.5,
                    border: '2px solid',
                    borderColor: `${getAlertColor(alert.type)}.main`,
                    background: `linear-gradient(135deg, ${alpha(theme.palette[getAlertColor(alert.type)].light, 0.1)} 0%, ${alpha(theme.palette[getAlertColor(alert.type)].main, 0.05)} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: `linear-gradient(180deg, ${theme.palette[getAlertColor(alert.type)].main} 0%, ${theme.palette[getAlertColor(alert.type)].dark} 100%)`,
                    },
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: `0 4px 12px 0 ${alpha(theme.palette[getAlertColor(alert.type)].main, 0.25)}`,
                      borderColor: `${getAlertColor(alert.type)}.dark`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 48, ml: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${theme.palette[getAlertColor(alert.type)].main} 0%, ${theme.palette[getAlertColor(alert.type)].dark} 100%)`,
                        boxShadow: `0 4px 8px 0 ${alpha(theme.palette[getAlertColor(alert.type)].main, 0.3)}`,
                        color: 'white',
                      }}
                    >
                      {getAlertIcon(alert.type)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {alert.title}
                        </Typography>
                        <Chip
                          label={alert.priority.toUpperCase()}
                          size="small"
                          color={getPriorityColor(alert.priority)}
                          sx={{
                            height: 22,
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {alert.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          🕐 {alert.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                  <ArrowForwardIcon
                    fontSize="small"
                    sx={{
                      color: `${getAlertColor(alert.type)}.main`,
                      transition: 'transform 0.3s',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          ))}

          {highPriorityAlerts.length > 0 && otherAlerts.length > 0 && (
            <Divider sx={{ my: 2 }} />
          )}

          {/* Other Alerts */}
          {otherAlerts.map((alert, index) => (
            <Box
              key={alert.id}
              sx={{
                animation: `fadeIn 0.5s ease-out ${(highPriorityAlerts.length + index) * 0.1}s both`,
                '@keyframes fadeIn': {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleAlertClick(alert.actionUrl)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      backgroundColor: alpha(theme.palette[getAlertColor(alert.type)].main, 0.05),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getAlertIcon(alert.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {alert.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {alert.message} • {alert.timestamp}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              fontWeight: 600,
              py: 1.5,
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;

