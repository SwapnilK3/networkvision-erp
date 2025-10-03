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
  alpha,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { InventoryItem } from '../../utils/localStorage';

interface InventoryDetailDialogProps {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

const InventoryDetailDialog: React.FC<InventoryDetailDialogProps> = ({
  open,
  onClose,
  item,
}) => {
  const theme = useTheme();

  if (!item) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'success';
      case 'medium':
        return 'info';
      case 'low':
        return 'warning';
      case 'out':
        return 'error';
      default:
        return 'default';
    }
  };

  const totalValue = item.quantity * item.price;
  const stockUtilization = ((item.quantity - item.minStock) / (item.maxStock - item.minStock)) * 100;
  const isAboveMin = item.quantity > item.minStock;

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
          <InventoryIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Product Details
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                SKU: {item.sku}
              </Typography>
            </Box>
            <Chip
              label={item.status.toUpperCase()}
              color={getStatusColor(item.status)}
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Stock Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                Stock Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {isAboveMin ? (
                  <TrendingUpIcon color="success" />
                ) : (
                  <TrendingDownIcon color="error" />
                )}
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.unit}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Min Stock:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.minStock}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Max Stock:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.maxStock}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Utilization:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {stockUtilization.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                Financial Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AttachMoneyIcon color="primary" />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ₹{totalValue.toLocaleString('en-IN')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Value
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Unit Price:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₹{item.price.toLocaleString('en-IN')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Quantity:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.quantity} {item.unit}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Additional Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <CategoryIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.category}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <LocationOnIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.location}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <BusinessIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Supplier
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.supplier}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PersonIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Updated By
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.updatedBy}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CalendarTodayIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {new Date(item.lastUpdated).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
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

export default InventoryDetailDialog;
