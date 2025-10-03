import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  IconButton,
  Rating,
  alpha,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Receipt as ReceiptIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarTodayIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { Supplier } from '../../utils/localStorage';

interface SupplierDetailDialogProps {
  open: boolean;
  onClose: () => void;
  supplier: Supplier | null;
}

const SupplierDetailDialog: React.FC<SupplierDetailDialogProps> = ({
  open,
  onClose,
  supplier,
}) => {
  const theme = useTheme();

  if (!supplier) return null;

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'success';
    if (performance >= 75) return 'info';
    if (performance >= 60) return 'warning';
    return 'error';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Supplier Details
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: alpha('#fff', 0.1),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        {/* Header Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {supplier.name.charAt(0)}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {supplier.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={supplier.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  ({supplier.rating}/5)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Contact Information */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Information
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PersonIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Contact Person
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.contactPerson}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <EmailIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PhoneIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.phone}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
              <LocationOnIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.address}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
              Business Information
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <ReceiptIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  GST Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.gst}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <TimerIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Lead Time
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.leadTime} days
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <CalendarTodayIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Added By
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {supplier.addedBy}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
              <CalendarTodayIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Added Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {new Date(supplier.addedDate).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                  })}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Performance */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
            Performance Metrics
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <TrendingUpIcon color={getPerformanceColor(supplier.performance)} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Overall Performance
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: `${getPerformanceColor(supplier.performance)}.main` }}>
                  {supplier.performance}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={supplier.performance}
                color={getPerformanceColor(supplier.performance)}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.grey[300], 0.3),
                }}
              />
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Based on delivery time, quality, and service ratings
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Products */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <InventoryIcon color="action" />
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Products Supplied ({supplier.products.length})
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {supplier.products.map((product, index) => (
              <Chip
                key={index}
                label={product}
                variant="outlined"
                color="primary"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDetailDialog;
