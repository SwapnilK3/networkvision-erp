import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import BOMManagement from './pages/BOMManagement';
import Suppliers from './pages/Suppliers';
import Compliance from './pages/Compliance';
import Analytics from './pages/Analytics';
import Plugins from './pages/Plugins';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          {/* Main application routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory/*" element={<Inventory />} />
          <Route path="/bom/*" element={<BOMManagement />} />
          <Route path="/suppliers/*" element={<Suppliers />} />
          <Route path="/compliance/*" element={<Compliance />} />
          <Route path="/analytics/*" element={<Analytics />} />
          <Route path="/plugins/*" element={<Plugins />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;

