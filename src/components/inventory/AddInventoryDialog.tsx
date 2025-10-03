import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { addInventoryItem } from '../../utils/localStorage';

interface AddInventoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddInventoryDialog: React.FC<AddInventoryDialogProps> = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Raw Materials',
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    unit: 'Units',
    price: 0,
    location: '',
    supplier: '',
    updatedBy: 'Swapnil Kale',
  });

  const categories = ['Raw Materials', 'Electronics', 'Fasteners', 'Chemicals', 'Plastics', 'Packaging', 'Components', 'Finished Goods'];
  const units = ['Units', 'Pieces', 'Kg', 'Liters', 'Meters', 'Sheets', 'Boxes', 'Rods'];
  const teamMembers = ['Swapnil Kale', 'Aaradhya Kulkarni', 'Sanchit Joshi', 'Ved Mahajan', 'Yash Kahalkar', 'Aara Danich'];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    try {
      // Calculate status based on stock levels
      let status: 'high' | 'medium' | 'low' | 'out' = 'high';
      if (formData.quantity === 0) {
        status = 'out';
      } else if (formData.quantity < formData.minStock) {
        status = 'low';
      } else if (formData.quantity < (formData.minStock + formData.maxStock) / 2) {
        status = 'medium';
      }

      addInventoryItem({
        ...formData,
        status,
      });
      
      // Reset form
      setFormData({
        sku: '',
        name: '',
        category: 'Raw Materials',
        quantity: 0,
        minStock: 0,
        maxStock: 0,
        unit: 'Units',
        price: 0,
        location: '',
        supplier: '',
        updatedBy: 'Swapnil Kale',
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding inventory:', error);
      alert('Failed to add inventory item. Please try again.');
    }
  };

  const isValid = formData.sku && formData.name && formData.quantity >= 0 && formData.price >= 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Add New Inventory Item
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 1 }}>
          {/* Row 1 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="SKU"
              placeholder="e.g., MT-009"
              value={formData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Product Name"
              placeholder="e.g., Copper Wire"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
              required
            />
          </Box>

          {/* Row 2 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Unit"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              fullWidth
            >
              {units.map((unit) => (
                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Row 3 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
              fullWidth
              required
            />
            <TextField
              label="Min Stock"
              type="number"
              value={formData.minStock}
              onChange={(e) => handleChange('minStock', parseFloat(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Max Stock"
              type="number"
              value={formData.maxStock}
              onChange={(e) => handleChange('maxStock', parseFloat(e.target.value) || 0)}
              fullWidth
            />
          </Box>

          {/* Row 4 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Unit Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              fullWidth
              required
            />
            <TextField
              label="Location"
              placeholder="e.g., Warehouse A - Rack 3"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              fullWidth
            />
          </Box>

          {/* Row 5 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Supplier"
              placeholder="e.g., Maharashtra Steel Industries"
              value={formData.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              fullWidth
            />
            <TextField
              select
              label="Updated By"
              value={formData.updatedBy}
              onChange={(e) => handleChange('updatedBy', e.target.value)}
              fullWidth
            >
              {teamMembers.map((member) => (
                <MenuItem key={member} value={member}>{member}</MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Total Value Display */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>
                Total Value
              </Box>
              <Box sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'primary.main' }}>
                ₹{(formData.quantity * formData.price).toLocaleString('en-IN')}
              </Box>
            </Box>
            <Box>
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>
                Stock Status
              </Box>
              <Box sx={{ fontSize: '1rem', fontWeight: 600 }}>
                {formData.quantity === 0 ? 'Out of Stock' :
                 formData.quantity < formData.minStock ? 'Low Stock' :
                 formData.quantity > formData.maxStock ? 'Overstocked' :
                 'Normal'}
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
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInventoryDialog;
