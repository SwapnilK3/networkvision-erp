import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Avatar,
  alpha,
  useTheme,
} from '@mui/material';
import {
  AddBox as AddBoxIcon,
  AccountTree as AccountTreeIcon,
  PersonAdd as PersonAddIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Assessment as AssessmentIcon,
  FactCheck as FactCheckIcon,
  ArrowForward as ArrowForwardIcon,
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
  const theme = useTheme();

  const handleActionClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        ⚡ Quick Actions
      </Typography>
      <Grid container spacing={2.5}>
        {quickActions.map((action, index) => {
          const icon = iconMap[action.icon] || <AddBoxIcon />;
          // Get color palette ensuring it's a PaletteColor type
          const getColorPalette = (colorName: string) => {
            const validColors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;
            type ValidColor = typeof validColors[number];
            const color = validColors.includes(colorName as ValidColor) ? colorName as ValidColor : 'primary';
            return theme.palette[color];
          };
          const colorMain = getColorPalette(action.color);
          
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={action.id}
              sx={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                '@keyframes fadeInUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${alpha(colorMain.main, 0.05)} 0%, ${alpha(colorMain.main, 0.1)} 100%)`,
                  border: `1px solid ${alpha(colorMain.main, 0.1)}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${colorMain.main} 0%, ${colorMain.dark} 100%)`,
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 12px 32px 0 ${alpha(colorMain.main, 0.25)}`,
                    border: `1px solid ${alpha(colorMain.main, 0.3)}`,
                    '& .action-arrow': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                    '& .action-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleActionClick(action.path)}
                  sx={{ height: '100%', p: 3 }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        className="action-icon"
                        sx={{
                          background: `linear-gradient(135deg, ${colorMain.main} 0%, ${colorMain.dark} 100%)`,
                          color: '#ffffff',
                          width: 56,
                          height: 56,
                          boxShadow: `0 8px 16px 0 ${alpha(colorMain.main, 0.3)}`,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '& svg': {
                            fontSize: '1.75rem',
                          },
                        }}
                      >
                        {icon}
                      </Avatar>
                    </Box>
                    <Box sx={{ position: 'relative' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.3,
                          mb: 0.5,
                          color: 'text.primary',
                        }}
                      >
                        {action.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.5,
                          fontWeight: 500,
                          pr: 4,
                        }}
                      >
                        {action.description}
                      </Typography>
                      <Box
                        className="action-arrow"
                        sx={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          opacity: 0,
                          transform: 'translateX(-10px)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          color: colorMain.main,
                        }}
                      >
                        <ArrowForwardIcon />
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

