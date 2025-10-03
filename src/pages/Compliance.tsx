import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  FactCheck as FactCheckIcon,
  Description as DescriptionIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';

const CompliancePage: React.FC = () => {
  const handleExportCompliance = () => {
    // Mock compliance data export
    const headers = ['Filing Type', 'Status', 'Due Date', 'Filed Date', 'Department'];
    const rows = [
      ['GST Return', 'Completed', '20-Oct-2024', '18-Oct-2024', 'Finance'],
      ['Income Tax', 'Pending', '31-Oct-2024', '-', 'Finance'],
      ['MSME Registration', 'Completed', '15-Sep-2024', '10-Sep-2024', 'Admin'],
      ['Udyam Certificate', 'Active', '-', '05-Jan-2024', 'Admin'],
      ['ESI Filing', 'Pending', '25-Oct-2024', '-', 'HR'],
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `compliance_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actions = (
    <>
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        sx={{ mr: 1 }}
        onClick={handleExportCompliance}
      >
        Export CSV
      </Button>
      <Button
        variant="outlined"
        startIcon={<DescriptionIcon />}
        sx={{ mr: 1 }}
      >
        Generate Report
      </Button>
      <Button
        variant="outlined"
        startIcon={<FactCheckIcon />}
        sx={{ mr: 1 }}
      >
        Compliance Check
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
      >
        New Filing
      </Button>
    </>
  );

  return (
    <Box>
      <PageHeader
        title="Compliance Management"
        subtitle="Manage regulatory filings, documents, and compliance status"
        actions={actions}
      />

      <Box sx={{ mb: 3 }}>
        <Chip label="94% Compliance Score" color="success" sx={{ mr: 1 }} />
        <Chip label="2 Pending Tasks" color="error" sx={{ mr: 1 }} />
        <Chip label="5 Upcoming Deadlines" color="warning" />
      </Box>

      <Routes>
        <Route path="/" element={<div>Compliance Dashboard with Multi-step Wizards (Coming Soon)</div>} />
        <Route path="/check" element={<div>Compliance Status Checker (Coming Soon)</div>} />
        <Route path="/udyam" element={<div>Udyam Registration Form (Coming Soon)</div>} />
        <Route path="/gst" element={<div>GST Filing Form (Coming Soon)</div>} />
        <Route path="/msme" element={<div>MSME Scheme Application (Coming Soon)</div>} />
        <Route path="/documents" element={<div>Document Management (Coming Soon)</div>} />
      </Routes>
    </Box>
  );
};

export default CompliancePage;

