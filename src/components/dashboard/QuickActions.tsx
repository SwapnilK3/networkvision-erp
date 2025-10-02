import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import {
  AddBox as AddBoxIcon,
  AccountTree as AccountTreeIcon,
  PersonAdd as PersonAddIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Assessment as AssessmentIcon,
  FactCheck as FactCheckIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { quickActions } from '../../utils/navigation';

const iconMap: { [key: string]: React.ReactElement } = {
  add_box: <AddBoxIcon />,
  account_tree: <AccountTreeIcon />,
  person_add: <PersonAddIcon />,
  qr_code_scanner: <QrCodeScannerIcon />,
  assessment: <AssessmentIcon />,
  fact_check: <FactCheckIcon />,
};

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const handleActionClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {quickActions.map((action) => {
          const icon = iconMap[action.icon] || <AddBoxIcon />;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={action.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleActionClick(action.path)}
                  sx={{ height: '100%', p: 2 }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: `${action.color}.main`,
                          color: `${action.color}.contrastText`,
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        {icon}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, lineHeight: 1.2 }}
                        >
                          {action.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.3 }}
                        >
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default QuickActions;

