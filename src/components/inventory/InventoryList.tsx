import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { stockLevelColors } from '../../theme';

// Mock inventory data
const mockInventoryData = [
  {
    id: '1',
    sku: 'SKU-001',
    name: 'Steel Rod 12mm',
    category: 'Raw Materials',
    currentStock: 450,
    minStock: 100,
    maxStock: 1000,
    stockLevel: 'high',
    location: 'A-1-01',
    unit: 'pieces',
    lastRestocked: '2024-01-15',
    supplier: 'ABC Steel Co.',
  },
  {
    id: '2',
    sku: 'SKU-002',
    name: 'Aluminum Sheet 5mm',
    category: 'Raw Materials',
    currentStock: 75,
    minStock: 50,
    maxStock: 300,
    stockLevel: 'medium',
    location: 'B-2-03',
    unit: 'sheets',
    lastRestocked: '2024-01-10',
    supplier: 'XYZ Metals Ltd.',
  },
  {
    id: '3',
    sku: 'SKU-003',
    name: 'Motor Assembly Unit',
    category: 'Components',
    currentStock: 15,
    minStock: 20,
    maxStock: 100,
    stockLevel: 'low',
    location: 'C-1-05',
    unit: 'units',
    lastRestocked: '2024-01-05',
    supplier: 'Motor Works Inc.',
  },
  {
    id: '4',
    sku: 'SKU-004',
    name: 'Bearing Set',
    category: 'Components',
    currentStock: 0,
    minStock: 25,
    maxStock: 200,
    stockLevel: 'out',
    location: 'C-2-01',
    unit: 'sets',
    lastRestocked: '2023-12-20',
    supplier: 'Bearing Solutions',
  },
  {
    id: '5',
    sku: 'SKU-005',
    name: 'Finished Product A',
    category: 'Finished Goods',
    currentStock: 120,
    minStock: 50,
    maxStock: 500,
    stockLevel: 'high',
    location: 'D-1-01',
    unit: 'units',
    lastRestocked: '2024-01-12',
    supplier: 'Internal Production',
  },
];

const InventoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockLevelFilter, setStockLevelFilter] = useState('');

  const getStockLevelChip = (level: string) => {
    const colors = {
      high: 'success',
      medium: 'warning',
      low: 'error',
      out: 'default',
    } as const;

    const labels = {
      high: 'High Stock',
      medium: 'Medium Stock',
      low: 'Low Stock',
      out: 'Out of Stock',
    };

    return (
      <Chip
        label={labels[level as keyof typeof labels]}
        color={colors[level as keyof typeof colors]}
        size="small"
        sx={{ fontWeight: 500 }}
      />
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'sku',
      headerName: 'SKU',
      width: 120,
      fontWeight: 600,
    },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'currentStock',
      headerName: 'Current Stock',
      width: 120,
      type: 'number',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <span>{params.value}</span>
          <span style={{ fontSize: '0.75rem', color: '#666' }}>
            {params.row.unit}
          </span>
        </Box>
      ),
    },
    {
      field: 'stockLevel',
      headerName: 'Stock Level',
      width: 130,
      renderCell: (params) => getStockLevelChip(params.value),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          size="small"
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
    {
      field: 'supplier',
      headerName: 'Supplier',
      width: 150,
    },
    {
      field: 'lastRestocked',
      headerName: 'Last Restocked',
      width: 130,
      type: 'date',
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="View Details">
              <VisibilityIcon />
            </Tooltip>
          }
          label="View"
          onClick={() => console.log('View', params.id)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit Product">
              <EditIcon />
            </Tooltip>
          }
          label="Edit"
          onClick={() => console.log('Edit', params.id)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Scan Barcode">
              <QrCodeScannerIcon />
            </Tooltip>
          }
          label="Scan"
          onClick={() => console.log('Scan', params.id)}
        />,
      ],
    },
  ];

  const filteredData = mockInventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStockLevel = !stockLevelFilter || item.stockLevel === stockLevelFilter;
    
    return matchesSearch && matchesCategory && matchesStockLevel;
  });

  const categories = [...new Set(mockInventoryData.map(item => item.category))];
  const stockLevels = ['high', 'medium', 'low', 'out'];

  return (
    <Card sx={{ p: 0 }}>
      {/* Filters */}
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Stock Level</InputLabel>
            <Select
              value={stockLevelFilter}
              label="Stock Level"
              onChange={(e) => setStockLevelFilter(e.target.value)}
            >
              <MenuItem value="">All Levels</MenuItem>
              {stockLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)} Stock
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton color="primary" sx={{ ml: 'auto' }}>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Data Grid */}
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
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
    </Card>
  );
};

export default InventoryList;

