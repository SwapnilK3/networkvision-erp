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
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';

const SuppliersPage: React.FC = () => {
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

