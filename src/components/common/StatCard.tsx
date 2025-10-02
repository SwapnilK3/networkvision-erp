import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactElement;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType,
  icon,
  color = 'primary',
  onClick,
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const getChangeColor = () => {
    if (!changeType) return 'default';
    return changeType === 'increase' ? 'success' : 'error';
  };

  const getChangeIcon = () => {
    if (!changeType) return null;
    return changeType === 'increase' ? (
      <TrendingUpIcon fontSize="small" />
    ) : (
      <TrendingDownIcon fontSize="small" />
    );
  };

  return (
    <Card
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick
          ? {
              transform: 'translateY(-2px)',
              boxShadow: 4,
            }
          : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 700, lineHeight: 1 }}
              >
                {formatValue(value)}
              </Typography>
              {unit && (
                <Typography variant="body2" color="text.secondary">
                  {unit}
                </Typography>
              )}
            </Box>
          </Box>

          {icon && (
            <Avatar
              sx={{
                bgcolor: `${color}.main`,
                color: `${color}.contrastText`,
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
          )}
        </Box>

        {change !== undefined && (
          <Chip
            icon={getChangeIcon()}
            label={`${change > 0 ? '+' : ''}${change}%`}
            size="small"
            color={getChangeColor()}
            variant="outlined"
            sx={{
              borderRadius: 1,
              '& .MuiChip-icon': {
                fontSize: '1rem',
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;

