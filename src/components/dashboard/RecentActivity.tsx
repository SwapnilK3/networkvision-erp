import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Chip,
  Button,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  AccountTree as AccountTreeIcon,
  Business as BusinessIcon,
  Verified as VerifiedIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

interface Activity {
  id: string;
  type: 'inventory' | 'bom' | 'supplier' | 'compliance' | 'user';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  status?: 'completed' | 'pending' | 'approved' | 'rejected';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'inventory',
    title: 'Stock Updated',
    description: 'Added 500 units of SKU-001 to warehouse A',
    timestamp: '10 minutes ago',
    user: 'John Doe',
    status: 'completed',
  },
  {
    id: '2',
    type: 'bom',
    title: 'BOM Version Created',
    description: 'Created BOM v2.1 for Product XYZ',
    timestamp: '1 hour ago',
    user: 'Jane Smith',
    status: 'pending',
  },
  {
    id: '3',
    type: 'supplier',
    title: 'Supplier Registered',
    description: 'ABC Corp added to supplier database',
    timestamp: '2 hours ago',
    user: 'Mike Johnson',
    status: 'approved',
  },
  {
    id: '4',
    type: 'compliance',
    title: 'GST Return Filed',
    description: 'Monthly GST return submitted successfully',
    timestamp: '4 hours ago',
    user: 'Sarah Wilson',
    status: 'completed',
  },
  {
    id: '5',
    type: 'inventory',
    title: 'Low Stock Alert',
    description: 'SKU-045 stock level dropped below minimum',
    timestamp: '6 hours ago',
    user: 'System',
    status: 'pending',
  },
  {
    id: '6',
    type: 'bom',
    title: 'BOM Approved',
    description: 'Product ABC BOM v1.5 approved by manager',
    timestamp: '1 day ago',
    user: 'David Brown',
    status: 'approved',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'inventory':
      return <InventoryIcon />;
    case 'bom':
      return <AccountTreeIcon />;
    case 'supplier':
      return <BusinessIcon />;
    case 'compliance':
      return <VerifiedIcon />;
    case 'user':
      return <PersonIcon />;
    default:
      return <PersonIcon />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'inventory':
      return 'primary';
    case 'bom':
      return 'secondary';
    case 'supplier':
      return 'info';
    case 'compliance':
      return 'success';
    case 'user':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusColor = (status?: Activity['status']) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
};

const RecentActivity: React.FC = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Recent Activity
        </Typography>

        <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
          {mockActivities.map((activity) => (
            <ListItem key={activity.id} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: `${getActivityColor(activity.type)}.main`,
                    width: 36,
                    height: 36,
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {activity.title}
                    </Typography>
                    {activity.status && (
                      <Chip
                        label={activity.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(activity.status)}
                        sx={{ height: 20, fontSize: '0.6875rem' }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {activity.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        by {activity.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
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
            View All Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

