import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Settings as SettingsIcon,
  Extension as ExtensionIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';

const PluginsPage: React.FC = () => {
  const actions = (
    <>
      <Button
        variant="outlined"
        startIcon={<SettingsIcon />}
        sx={{ mr: 1 }}
      >
        Business Rules
      </Button>
      <Button
        variant="outlined"
        startIcon={<ExtensionIcon />}
        sx={{ mr: 1 }}
      >
        Plugin Store
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
      >
        Install Plugin
      </Button>
    </>
  );

  return (
    <Box>
      <PageHeader
        title="Plugin Management"
        subtitle="Manage plugins, configure business rules, and extend platform functionality"
        actions={actions}
      />

      <Box sx={{ mb: 3 }}>
        <Chip label="12 Plugins Installed" color="success" sx={{ mr: 1 }} />
        <Chip label="8 Active Rules" color="primary" sx={{ mr: 1 }} />
        <Chip label="3 Updates Available" color="warning" />
      </Box>

      <Routes>
        <Route path="/" element={<div>Plugin Management Interface (Coming Soon)</div>} />
        <Route path="/store" element={<div>Plugin Store (Coming Soon)</div>} />
        <Route path="/rules" element={<div>Business Rules Configuration (Coming Soon)</div>} />
        <Route path="/installed" element={<div>Installed Plugins List (Coming Soon)</div>} />
        <Route path="/:id/configure" element={<div>Plugin Configuration (Coming Soon)</div>} />
      </Routes>
    </Box>
  );
};

export default PluginsPage;

