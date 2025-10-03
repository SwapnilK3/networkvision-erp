import React from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

import { generateBreadcrumbs } from '../../utils/navigation';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showBreadcrumbs?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  showBreadcrumbs = true,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const breadcrumbs = showBreadcrumbs ? generateBreadcrumbs(location.pathname) : [];

  return (
    <Box
      sx={{
        mb: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -24,
          left: -24,
          right: -24,
          bottom: -16,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          borderRadius: 4,
          zIndex: -1,
        },
      }}
    >
      {showBreadcrumbs && breadcrumbs.length > 1 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{
            mb: 2,
            '& .MuiBreadcrumbs-separator': {
              color: theme.palette.text.disabled,
            },
          }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography
                key={crumb.path}
                color="text.primary"
                variant="body2"
                sx={{ fontWeight: 600 }}
              >
                {crumb.title}
              </Typography>
            ) : (
              <Link
                key={crumb.path}
                underline="hover"
                color="inherit"
                href={crumb.path}
                variant="body2"
                sx={{
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateX(2px)',
                  },
                }}
              >
                {crumb.title}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: subtitle ? 1 : 0,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: 500, maxWidth: 600 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexWrap: 'wrap',
              '& > *': {
                animation: 'fadeInUp 0.5s ease-out',
              },
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(10px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {actions}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PageHeader;

