import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment as AssessmentIcon,
  CalendarMonth as CalendarMonthIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';
import { getSuppliers } from '../utils/localStorage';

const SuppliersPage: React.FC = () => {
  const handleExportCSV = () => {
    const suppliers = getSuppliers();
    
    // Create CSV header
    const headers = ['Name', 'Contact Person', 'Email', 'Phone', 'Address', 'GST Number', 'Rating', 'Lead Time (Days)', 'Performance (%)', 'Products', 'Added By', 'Added Date'];
    
    // Create CSV rows
    const rows = suppliers.map(supplier => [
      supplier.name,
      supplier.contactPerson,
      supplier.email,
      supplier.phone,
      supplier.address,
      supplier.gst,
      supplier.rating,
      supplier.leadTime,
      supplier.performance,
      supplier.products.join('; '),
      supplier.addedBy,
      new Date(supplier.addedDate).toLocaleString('en-IN'),
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
    link.setAttribute('download', `suppliers_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actions = (
    <>
      <Button
        variant="outlined"
        startIcon={<CalendarMonthIcon />}
        sx={{ mr: 1 }}
      >
        Lead Time Calendar
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
        startIcon={<AssessmentIcon />}
        sx={{ mr: 1 }}
      >
        Performance Report
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Supplier
      </Button>
    </>
  );

  return (
    <Box>
      <PageHeader
        title="Supplier Management"
        subtitle="Manage suppliers, track performance, and monitor lead times"
        actions={actions}
      />

      <Box sx={{ mb: 3 }}>
        <Chip label="89 Active Suppliers" color="success" sx={{ mr: 1 }} />
        <Chip label="12 Pending Verification" color="warning" sx={{ mr: 1 }} />
        <Chip label="3 Performance Issues" color="error" />
      </Box>

      <Routes>
        <Route path="/" element={<div>Supplier List with Performance Scorecards (Coming Soon)</div>} />
        <Route path="/add" element={<div>Add Supplier Form (Coming Soon)</div>} />
        <Route path="/:id" element={<div>Supplier Details (Coming Soon)</div>} />
        <Route path="/:id/edit" element={<div>Edit Supplier (Coming Soon)</div>} />
        <Route path="/:id/performance" element={<div>Supplier Performance Dashboard (Coming Soon)</div>} />
      </Routes>
    </Box>
  );
};

export default SuppliersPage;

