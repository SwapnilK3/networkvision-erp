import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  QrCodeScanner as QrCodeScannerIcon,
  FileUpload as FileUploadIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';
import InventoryList from '../components/inventory/InventoryList';

const InventoryPage: React.FC = () => {
  const actions = (
    <>
      <Button
        variant="outlined"
        startIcon={<FileUploadIcon />}
        sx={{ mr: 1 }}
      >
        Import CSV
      </Button>
      <Button
        variant="outlined"
        startIcon={<QrCodeScannerIcon />}
        sx={{ mr: 1 }}
      >
        Scan Barcode
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Product
      </Button>
    </>
  );

  return (
    <Box>
      <PageHeader
        title="Inventory Management"
        subtitle="Manage your products, stock levels, and warehouse locations"
        actions={actions}
      />

      <Box sx={{ mb: 2 }}>
        <Chip label="23 Low Stock Items" color="warning" sx={{ mr: 1 }} />
        <Chip label="5 Out of Stock" color="error" sx={{ mr: 1 }} />
        <Chip label="1,247 Total Products" color="primary" />
      </Box>

      <Routes>
        <Route path="/" element={<InventoryList />} />
        <Route path="/add" element={<div>Add Product Form (Coming Soon)</div>} />
        <Route path="/scan" element={<div>Barcode Scanner (Coming Soon)</div>} />
        <Route path="/:id" element={<div>Product Details (Coming Soon)</div>} />
        <Route path="/:id/edit" element={<div>Edit Product (Coming Soon)</div>} />
      </Routes>
    </Box>
  );
};

export default InventoryPage;

