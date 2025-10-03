import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  alpha,
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
    if (!changeType) return undefined;
    return changeType === 'increase' ? (
      <TrendingUpIcon fontSize="small" />
    ) : (
      <TrendingDownIcon fontSize="small" />
    );
  };

  // Get gradient colors based on card color
  const getGradientColors = () => {
    const colorMap = {
      primary: { from: '#667eea', to: '#764ba2' },
      secondary: { from: '#764ba2', to: '#667eea' },
      success: { from: '#10b981', to: '#059669' },
      warning: { from: '#f59e0b', to: '#d97706' },
      error: { from: '#ef4444', to: '#dc2626' },
      info: { from: '#3b82f6', to: '#2563eb' },
    };
    return colorMap[color];
  };

  const gradientColors = getGradientColors();

  return (
    <Card
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'visible',
        background: `linear-gradient(135deg, ${alpha(gradientColors.from, 0.05)} 0%, ${alpha(gradientColors.to, 0.08)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(gradientColors.from, 0.1)}`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
          borderRadius: '20px 20px 0 0',
        },
        '&:hover': onClick
          ? {
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: `0 20px 40px 0 ${alpha(gradientColors.from, 0.25)}`,
              border: `1px solid ${alpha(gradientColors.from, 0.2)}`,
            }
          : {},
        '&:active': onClick
          ? {
              transform: 'translateY(-4px) scale(1.01)',
            }
          : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3, position: 'relative' }}>
        {/* Decorative background gradient orb */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(gradientColors.to, 0.15)} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5, position: 'relative' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                mb: 1.5,
              }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1,
                  background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {formatValue(value)}
              </Typography>
              {unit && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, ml: 0.5 }}
                >
                  {unit}
                </Typography>
              )}
            </Box>
          </Box>

          {icon && (
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
                color: '#ffffff',
                width: 56,
                height: 56,
                boxShadow: `0 8px 24px 0 ${alpha(gradientColors.from, 0.3)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& svg': {
                  fontSize: '1.75rem',
                },
                ...(onClick && {
                  '&:hover': {
                    transform: 'rotate(15deg) scale(1.1)',
                  },
                }),
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
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '0.75rem',
              height: 28,
              boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
              '& .MuiChip-icon': {
                fontSize: '1rem',
              },
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;

