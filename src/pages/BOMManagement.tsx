import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  AccountTree as AccountTreeIcon,
  History as HistoryIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';
import BOMTreeView from '../components/bom/BOMTreeView';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Mock BOM data
const mockBOMData = [
  {
    id: 'bom-001',
    name: 'Motor Assembly BOM',
    version: 'v2.1',
    productName: 'Electric Motor 5HP',
    productSku: 'MOTOR-5HP-001',
    status: 'active',
    totalCost: 15750.00,
    componentCount: 12,
    lastUpdated: '2024-01-15',
    createdBy: 'John Doe',
  },
  {
    id: 'bom-002',
    name: 'Pump Assembly BOM',
    version: 'v1.5',
    productName: 'Water Pump 2HP',
    productSku: 'PUMP-2HP-001',
    status: 'draft',
    totalCost: 8950.00,
    componentCount: 8,
    lastUpdated: '2024-01-12',
    createdBy: 'Jane Smith',
  },
];

const mockTreeData = [
  {
    id: 'root-1',
    productId: 'MOTOR-5HP-001',
    productName: 'Electric Motor 5HP',
    productSku: 'MOTOR-5HP-001',
    quantity: 1,
    unit: 'unit',
    unitCost: 15750.00,
    totalCost: 15750.00,
    wastagePercentage: 0,
    isOptional: false,
    level: 0,
    children: [
      {
        id: 'comp-1',
        productId: 'STATOR-001',
        productName: 'Stator Assembly',
        productSku: 'STATOR-001',
        quantity: 1,
        unit: 'unit',
        unitCost: 8500.00,
        totalCost: 8500.00,
        wastagePercentage: 2,
        isOptional: false,
        level: 1,
        children: [
          {
            id: 'comp-1-1',
            productId: 'COPPER-WIRE',
            productName: 'Copper Wire 2.5mm',
            productSku: 'COPPER-WIRE-2.5',
            quantity: 50,
            unit: 'meters',
            unitCost: 45.00,
            totalCost: 2250.00,
            wastagePercentage: 5,
            isOptional: false,
            level: 2,
            children: [],
          },
        ],
      },
      {
        id: 'comp-2',
        productId: 'ROTOR-001',
        productName: 'Rotor Assembly',
        productSku: 'ROTOR-001',
        quantity: 1,
        unit: 'unit',
        unitCost: 4500.00,
        totalCost: 4500.00,
        wastagePercentage: 1,
        isOptional: false,
        level: 1,
        children: [],
      },
    ],
  },
];

const BOMManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [createDialog, setCreateDialog] = useState(false);
  const [newBOMName, setNewBOMName] = useState('');

  const actions = (
    <>
      <Button
        variant="outlined"
        startIcon={<HistoryIcon />}
        sx={{ mr: 1 }}
        onClick={() => setTabValue(2)}
      >
        Version History
      </Button>
      <Button
        variant="outlined"
        startIcon={<AssessmentIcon />}
        sx={{ mr: 1 }}
        onClick={() => setTabValue(3)}
      >
        Cost Analysis
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setCreateDialog(true)}
      >
        Create BOM
      </Button>
    </>
  );

  const bomColumns: GridColDef[] = [
    { field: 'name', headerName: 'BOM Name', width: 200, flex: 1 },
    { field: 'version', headerName: 'Version', width: 100 },
    { field: 'productName', headerName: 'Product', width: 200, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      width: 120,
      valueFormatter: (params) => `₹${params.value.toFixed(2)}`,
    },
    { field: 'componentCount', headerName: 'Components', width: 120 },
    { field: 'lastUpdated', headerName: 'Last Updated', width: 130 },
    { field: 'createdBy', headerName: 'Created By', width: 130 },
  ];

  const handleUpdateNode = (nodeId: string, updates: any) => {
    console.log('Update node:', nodeId, updates);
  };

  const handleAddNode = (parentId: string, node: any) => {
    console.log('Add node to parent:', parentId, node);
  };

  const handleDeleteNode = (nodeId: string) => {
    console.log('Delete node:', nodeId);
  };

  const handleReorderNodes = (result: any) => {
    console.log('Reorder nodes:', result);
  };

  const handleCreateBOM = () => {
    // Navigate to create BOM page or handle creation
    setCreateDialog(false);
    navigate('/bom/create');
  };

  return (
    <Box>
      <PageHeader
        title="BOM Management"
        subtitle="Manage Bill of Materials, versions, and component relationships"
        actions={actions}
      />

      <Box sx={{ mb: 3 }}>
        <Chip label="45 Active BOMs" color="primary" sx={{ mr: 1 }} />
        <Chip label="12 Draft BOMs" color="warning" sx={{ mr: 1 }} />
        <Chip label="8 Pending Approval" color="info" />
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="BOM List" />
            <Tab label="Tree View" />
            <Tab label="Version History" />
            <Tab label="Cost Analysis" />
          </Tabs>
        </Box>

        <CardContent sx={{ p: 0 }}>
          {/* BOM List Tab */}
          {tabValue === 0 && (
            <Box sx={{ height: 600 }}>
              <DataGrid
                rows={mockBOMData}
                columns={bomColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowDoubleClick={(params) => navigate(`/bom/${params.id}`)}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-cell': {
                    borderColor: 'divider',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'grey.50',
                    borderColor: 'divider',
                  },
                }}
              />
            </Box>
          )}

          {/* Tree View Tab */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  BOM Structure - Motor Assembly v2.1
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Drag and drop components to reorganize the BOM structure
                </Typography>
              </Box>
              <BOMTreeView
                bomId="bom-001"
                data={mockTreeData}
                onUpdateNode={handleUpdateNode}
                onAddNode={handleAddNode}
                onDeleteNode={handleDeleteNode}
                onReorderNodes={handleReorderNodes}
              />
            </Box>
          )}

          {/* Version History Tab */}
          {tabValue === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Version History
              </Typography>
              <Grid container spacing={2}>
                {[
                  { version: 'v2.1', date: '2024-01-15', author: 'John Doe', changes: 'Updated copper wire specifications' },
                  { version: 'v2.0', date: '2024-01-10', author: 'Jane Smith', changes: 'Added new bearing components' },
                  { version: 'v1.9', date: '2024-01-05', author: 'Mike Johnson', changes: 'Cost optimization changes' },
                ].map((version) => (
                  <Grid item xs={12} key={version.version}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="h6">{version.version}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {version.changes}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {version.date} by {version.author}
                            </Typography>
                          </Box>
                          <Button variant="outlined" size="small">
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Cost Analysis Tab */}
          {tabValue === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cost Analysis
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Cost Breakdown
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>Material Cost:</Typography>
                          <Typography>₹12,500.00</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>Labor Cost:</Typography>
                          <Typography>₹2,250.00</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>Overhead Cost:</Typography>
                          <Typography>₹1,000.00</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                          <Typography>Total Cost:</Typography>
                          <Typography>₹15,750.00</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Cost Trends
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cost analysis chart would be displayed here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Create BOM Dialog */}
      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New BOM</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="BOM Name"
              value={newBOMName}
              onChange={(e) => setNewBOMName(e.target.value)}
              fullWidth
              placeholder="e.g., Motor Assembly BOM"
            />
            <TextField
              label="Product"
              fullWidth
              placeholder="Select or search product"
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              placeholder="Optional description"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateBOM} disabled={!newBOMName.trim()}>
            Create BOM
          </Button>
        </DialogActions>
      </Dialog>

      <Routes>
        <Route path="/create" element={<div>Create BOM Form (Coming Soon)</div>} />
        <Route path="/:id" element={<div>BOM Details (Coming Soon)</div>} />
        <Route path="/:id/edit" element={<div>Edit BOM (Coming Soon)</div>} />
      </Routes>
    </Box>
  );
};

export default BOMManagementPage;

