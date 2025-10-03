import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { addSupplier } from '../../utils/localStorage';

interface AddSupplierDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    gst: '',
    rating: 4,
    leadTime: 7,
    products: [] as string[],
    performance: 85,
    addedBy: 'Swapnil Kale',
  });

  const teamMembers = ['Swapnil Kale', 'Aaradhya Kulkarni', 'Sanchit Joshi', 'Ved Mahajan', 'Yash Kahalkar', 'Aara Danich'];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    try {
      addSupplier(formData);
      
      // Reset form
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        gst: '',
        rating: 4,
        leadTime: 7,
        products: [],
        performance: 85,
        addedBy: 'Swapnil Kale',
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Failed to add supplier. Please try again.');
    }
  };

  const isValid = formData.name && formData.contactPerson && formData.email && formData.phone;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Add New Supplier
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 1 }}>
          {/* Row 1 */}
          <TextField
            label="Company Name"
            placeholder="e.g., Maharashtra Steel Industries"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
          />

          {/* Row 2 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Contact Person"
              placeholder="e.g., Rajesh Patil"
              value={formData.contactPerson}
              onChange={(e) => handleChange('contactPerson', e.target.value)}
              fullWidth
              required
            />
            <TextField
              select
              label="Added By"
              value={formData.addedBy}
              onChange={(e) => handleChange('addedBy', e.target.value)}
              fullWidth
              SelectProps={{ native: true }}
            >
              {teamMembers.map((member) => (
                <option key={member} value={member}>{member}</option>
              ))}
            </TextField>
          </Box>

          {/* Row 3 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="e.g., contact@company.in"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              placeholder="e.g., +91 98765 43210"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              fullWidth
              required
            />
          </Box>

          {/* Row 4 */}
          <TextField
            label="Address"
            placeholder="e.g., MIDC Industrial Area, Pune, Maharashtra"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          {/* Row 5 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="GST Number"
              placeholder="e.g., 27ABCDE1234F1Z5"
              value={formData.gst}
              onChange={(e) => handleChange('gst', e.target.value)}
              fullWidth
            />
            <TextField
              label="Lead Time (days)"
              type="number"
              value={formData.leadTime}
              onChange={(e) => handleChange('leadTime', parseInt(e.target.value) || 7)}
              fullWidth
            />
          </Box>

          {/* Row 6 - Rating & Performance */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Supplier Rating
              </Typography>
              <Rating
                value={formData.rating}
                onChange={(_, value) => handleChange('rating', value || 0)}
                size="large"
              />
            </Box>
            <TextField
              label="Performance Score (%)"
              type="number"
              value={formData.performance}
              onChange={(e) => handleChange('performance', parseInt(e.target.value) || 85)}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>

          {/* Row 7 */}
          <TextField
            label="Products Supplied"
            placeholder="e.g., Steel Sheets, Metal Rods (comma-separated)"
            value={formData.products.join(', ')}
            onChange={(e) => handleChange('products', e.target.value.split(',').map(s => s.trim()))}
            fullWidth
            multiline
            rows={2}
          />

          {/* Summary Box */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Summary
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Rating</Typography>
                <Typography variant="h6">{formData.rating}/5</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Lead Time</Typography>
                <Typography variant="h6">{formData.leadTime} days</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Performance</Typography>
                <Typography variant="h6">{formData.performance}%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!isValid}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          Add Supplier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSupplierDialog;
