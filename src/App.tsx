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
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        },
      }}
    >
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

