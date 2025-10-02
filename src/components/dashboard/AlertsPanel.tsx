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
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
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

const getAlertColor = (type: Alert['type']) => {
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
      return 'default';
  }
};

const getPriorityColor = (priority: Alert['priority']) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const AlertsPanel: React.FC = () => {
  const handleAlertClick = (actionUrl?: string) => {
    if (actionUrl) {
      window.location.href = actionUrl;
    }
  };

  const highPriorityAlerts = mockAlerts.filter(alert => alert.priority === 'high');
  const otherAlerts = mockAlerts.filter(alert => alert.priority !== 'high');

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Alerts & Notifications
          </Typography>
          <Chip
            label={`${mockAlerts.length} active`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
          {/* High Priority Alerts */}
          {highPriorityAlerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleAlertClick(alert.actionUrl)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    border: '1px solid',
                    borderColor: `${getAlertColor(alert.type)}.light`,
                    backgroundColor: `${getAlertColor(alert.type)}.50`,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getAlertIcon(alert.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {alert.title}
                        </Typography>
                        <Chip
                          label={alert.priority.toUpperCase()}
                          size="small"
                          color={getPriorityColor(alert.priority)}
                          sx={{ height: 20, fontSize: '0.6875rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {alert.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {alert.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                  <ArrowForwardIcon fontSize="small" color="action" />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}

          {highPriorityAlerts.length > 0 && otherAlerts.length > 0 && (
            <Divider sx={{ my: 1 }} />
          )}

          {/* Other Alerts */}
          {otherAlerts.map((alert) => (
            <ListItem key={alert.id} disablePadding>
              <ListItemButton
                onClick={() => handleAlertClick(alert.actionUrl)}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getAlertIcon(alert.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {alert.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {alert.message} • {alert.timestamp}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            endIcon={<ArrowForwardIcon />}
          >
            View All Notifications
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;

