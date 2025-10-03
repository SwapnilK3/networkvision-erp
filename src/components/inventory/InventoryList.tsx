// filepath: /home/swapnil/Avishkar/networkvision-erp/src/components/inventory/InventoryList.tsx
import React, { useState, useEffect } from 'react';
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

import { getInventory, formatINR } from '../../utils/localStorage';

const InventoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [inventoryData, setInventoryData] = useState<any[]>([]);

  useEffect(() => {
    const loadInventory = () => {
      const data = getInventory();
      setInventoryData(data);
    };
    
    loadInventory();
    
    const interval = setInterval(loadInventory, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStockLevelChip = (status: string) => {
    const colors = {
      high: 'success',
      medium: 'info',
      low: 'warning',
      out: 'error',
    } as const;

    const labels = {
      high: 'High Stock',
      medium: 'Medium Stock',
      low: 'Low Stock',
      out: 'Out of Stock',
    };

    return (
      <Chip
        label={labels[status as keyof typeof labels]}
        color={colors[status as keyof typeof colors]}
        size="small"
        sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem' }}
      />
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'sku',
      headerName: 'SKU',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 600, color: 'primary.main' }}>{params.value}</Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Box sx={{ fontWeight: 600 }}>{params.value}</Box>
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{params.row.category}</Box>
        </Box>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Stock',
      width: 120,
      type: 'number',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
          <span>{params.value}</span>
          <span style={{ fontSize: '0.75rem', color: '#666' }}>{params.row.unit}</span>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => getStockLevelChip(params.value),
    },
    {
      field: 'price',
      headerName: 'Unit Price',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 600, color: 'success.main' }}>{formatINR(params.value)}</Box>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 110,
      renderCell: (params) => (
        <Chip label={params.value} variant="outlined" size="small" 
          sx={{ fontSize: '0.75rem', fontWeight: 600, borderColor: 'primary.main', color: 'primary.main' }} />
      ),
    },
    {
      field: 'supplier',
      headerName: 'Supplier',
      width: 200,
      renderCell: (params) => <Box sx={{ fontSize: '0.85rem' }}>{params.value}</Box>,
    },
    {
      field: 'totalValue',
      headerName: 'Total Value',
      width: 130,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 700, color: 'primary.dark', fontSize: '0.9rem' }}>
          {formatINR(params.row.quantity * params.row.price)}
        </Box>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Tooltip title="View Details"><VisibilityIcon /></Tooltip>}
          label="View"
          onClick={() => console.log('View', params.id)}
        />,
        <GridActionsCellItem
          icon={<Tooltip title="Edit Product"><EditIcon /></Tooltip>}
          label="Edit"
          onClick={() => console.log('Edit', params.id)}
        />,
        <GridActionsCellItem
          icon={<Tooltip title="Scan Barcode"><QrCodeScannerIcon /></Tooltip>}
          label="Scan"
          onClick={() => console.log('Scan', params.id)}
        />,
      ],
    },
  ];

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(inventoryData.map(item => item.category))];
  const statuses = ['high', 'medium', 'low', 'out'];

  return (
    <Card sx={{ p: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)',
        backdropFilter: 'blur(10px)', border: '1px solid', borderColor: 'divider', borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField placeholder="Search products, SKU, or supplier..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            sx={{ minWidth: 350, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)} sx={{ borderRadius: 2 }}>
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (<MenuItem key={category} value={category}>{category}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Stock Status</InputLabel>
            <Select value={statusFilter} label="Stock Status" onChange={(e) => setStatusFilter(e.target.value)} sx={{ borderRadius: 2 }}>
              <MenuItem value="">All Status</MenuItem>
              {statuses.map((status) => (<MenuItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)} Stock</MenuItem>))}
            </Select>
          </FormControl>
          <IconButton color="primary" sx={{ ml: 'auto', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white',
              '&:hover': { background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' } }}>
            <FilterListIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, p: 2, background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)', borderRadius: 2 }}>
          <Box>
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Total Products</Box>
            <Box sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'primary.main' }}>{filteredData.length}</Box>
          </Box>
          <Box sx={{ borderLeft: '2px solid', borderColor: 'divider', pl: 2 }}>
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Total Inventory Value</Box>
            <Box sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'success.main' }}>
              {formatINR(filteredData.reduce((sum, item) => sum + (item.quantity * item.price), 0))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: 600 }}>
        <DataGrid rows={filteredData} columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25, 50]} checkboxSelection disableRowSelectionOnClick
          sx={{ border: 0, '& .MuiDataGrid-cell': { borderColor: 'divider', py: 1.5 },
            '& .MuiDataGrid-columnHeaders': { background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)', borderColor: 'divider', fontWeight: 700, fontSize: '0.85rem' },
            '& .MuiDataGrid-row': { '&:hover': { backgroundColor: 'rgba(102,126,234,0.05)' } } }} />
      </Box>
    </Card>
  );
};

export default InventoryList;
