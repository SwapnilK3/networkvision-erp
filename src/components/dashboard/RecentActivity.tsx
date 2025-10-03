import React, { useEffect, useState } from 'react';
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
  alpha,
  useTheme,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  AccountTree as AccountTreeIcon,
  Business as BusinessIcon,
  Verified as VerifiedIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { getActivities, getTimeAgo, Activity } from '../../utils/localStorage';

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

const getActivityColor = (type: Activity['type']): 'primary' | 'secondary' | 'info' | 'success' | 'warning' => {
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
      return 'primary';
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
  const theme = useTheme();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Load activities from localStorage
    const loadedActivities = getActivities();
    setActivities(loadedActivities.slice(0, 6)); // Show last 6 activities
  }, []);

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <HistoryIcon
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '1.5rem',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Recent Activity
          </Typography>
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
          {activities.map((activity, index) => (
            <Box
              key={activity.id}
              sx={{
                animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`,
                '@keyframes slideInRight': {
                  from: {
                    opacity: 0,
                    transform: 'translateX(20px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  px: 2,
                  py: 2,
                  mb: 1.5,
                  borderRadius: 3,
                  background: alpha(theme.palette[getActivityColor(activity.type)].main, 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette[getActivityColor(activity.type)].main, 0.1),
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: `linear-gradient(180deg, ${theme.palette[getActivityColor(activity.type)].main} 0%, ${theme.palette[getActivityColor(activity.type)].dark} 100%)`,
                  },
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: `0 4px 12px 0 ${alpha(theme.palette[getActivityColor(activity.type)].main, 0.15)}`,
                    borderColor: alpha(theme.palette[getActivityColor(activity.type)].main, 0.3),
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette[getActivityColor(activity.type)].main} 0%, ${theme.palette[getActivityColor(activity.type)].dark} 100%)`,
                      width: 44,
                      height: 44,
                      boxShadow: `0 4px 8px 0 ${alpha(theme.palette[getActivityColor(activity.type)].main, 0.3)}`,
                      '& svg': {
                        fontSize: '1.25rem',
                      },
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {activity.title}
                      </Typography>
                      {activity.status && (
                        <Chip
                          label={activity.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(activity.status)}
                          sx={{
                            height: 22,
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontWeight: 500 }}
                      >
                        {activity.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette[getActivityColor(activity.type)].main,
                            fontWeight: 600,
                          }}
                        >
                          👤 {activity.user}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          🕐 {getTimeAgo(activity.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </Box>
          ))}
        </List>

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontWeight: 600,
              py: 1.5,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                transform: 'translateY(-2px)',
              },
            }}
          >
            View All Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

