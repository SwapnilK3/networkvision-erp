import React from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Stack,
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
  const breadcrumbs = showBreadcrumbs ? generateBreadcrumbs(location.pathname) : [];

  return (
    <Box sx={{ mb: 3 }}>
      {showBreadcrumbs && breadcrumbs.length > 1 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={crumb.path} color="text.primary" variant="body2">
                {crumb.title}
              </Typography>
            ) : (
              <Link
                key={crumb.path}
                underline="hover"
                color="inherit"
                href={crumb.path}
                variant="body2"
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
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 600, mb: subtitle ? 1 : 0 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {actions}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PageHeader;

