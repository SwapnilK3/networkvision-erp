import React, { useEffect, useState } from 'react';
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
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';
import InventoryList from '../components/inventory/InventoryList';
import AddInventoryDialog from '../components/inventory/AddInventoryDialog';
import { getInventory } from '../utils/localStorage';

const InventoryPage: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadStats = () => {
      const inventory = getInventory();
      const lowStock = inventory.filter(item => item.status === 'low').length;
      const outOfStock = inventory.filter(item => item.status === 'out').length;
      
      setStats({
        total: inventory.length,
        lowStock,
        outOfStock,
      });
    };
    
    loadStats();
  }, [refreshKey]);

  const handleExportCSV = () => {
    const inventory = getInventory();
    
    // Create CSV header
    const headers = ['SKU', 'Name', 'Category', 'Quantity', 'Unit', 'Price (₹)', 'Min Stock', 'Max Stock', 'Location', 'Supplier', 'Status', 'Last Updated'];
    
    // Create CSV rows
    const rows = inventory.map(item => [
      item.sku,
      item.name,
      item.category,
      item.quantity,
      item.unit,
      item.price,
      item.minStock,
      item.maxStock,
      item.location,
      item.supplier,
      item.status,
      new Date(item.lastUpdated).toLocaleString('en-IN'),
    ]);
    
    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        startIcon={<FileDownloadIcon />}
        sx={{ mr: 1 }}
        onClick={handleExportCSV}
      >
        Export CSV
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
        onClick={() => setAddDialogOpen(true)}
      >
        Add Product
      </Button>
    </>
  );

  const handleAddSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Box>
      <PageHeader
        title="Inventory Management"
        subtitle="Manage your products, stock levels, and warehouse locations"
        actions={actions}
      />

      <Box sx={{ mb: 2 }}>
        {stats.lowStock > 0 && (
          <Chip label={`${stats.lowStock} Low Stock Items`} color="warning" sx={{ mr: 1 }} />
        )}
        {stats.outOfStock > 0 && (
          <Chip label={`${stats.outOfStock} Out of Stock`} color="error" sx={{ mr: 1 }} />
        )}
        <Chip label={`${stats.total} Total Products`} color="primary" />
      </Box>

      <Routes>
        <Route path="/" element={<InventoryList key={refreshKey} />} />
        <Route path="/add" element={<div>Add Product Form (Coming Soon)</div>} />
        <Route path="/scan" element={<div>Barcode Scanner (Coming Soon)</div>} />
        <Route path="/:id" element={<div>Product Details (Coming Soon)</div>} />
        <Route path="/:id/edit" element={<div>Edit Product (Coming Soon)</div>} />
      </Routes>

      <AddInventoryDialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </Box>
  );
};

export default InventoryPage;

