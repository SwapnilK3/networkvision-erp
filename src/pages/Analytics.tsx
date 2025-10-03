import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  GetApp as GetAppIcon,
  PictureAsPdf as PictureAsPdfIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import { getInventory, getSuppliers, getBOMs } from '../utils/localStorage';

// Mock analytics data
const inventoryData = [
  { month: 'Jan', inStock: 450, lowStock: 23, outOfStock: 5 },
  { month: 'Feb', inStock: 478, lowStock: 18, outOfStock: 3 },
  { month: 'Mar', inStock: 523, lowStock: 15, outOfStock: 2 },
  { month: 'Apr', inStock: 567, lowStock: 12, outOfStock: 1 },
  { month: 'May', inStock: 598, lowStock: 8, outOfStock: 0 },
  { month: 'Jun', inStock: 634, lowStock: 11, outOfStock: 2 },
];

const salesData = [
  { month: 'Jan', revenue: 125000, orders: 45, avgOrder: 2778 },
  { month: 'Feb', revenue: 138000, orders: 52, avgOrder: 2654 },
  { month: 'Mar', revenue: 156000, orders: 61, avgOrder: 2557 },
  { month: 'Apr', revenue: 172000, orders: 68, avgOrder: 2529 },
  { month: 'May', revenue: 189000, orders: 74, avgOrder: 2554 },
  { month: 'Jun', revenue: 205000, orders: 82, avgOrder: 2500 },
];

const supplierData = [
  { name: 'ABC Steel Co.', performance: 95, orders: 24 },
  { name: 'XYZ Metals Ltd.', performance: 87, orders: 18 },
  { name: 'Motor Works Inc.', performance: 92, orders: 15 },
  { name: 'Bearing Solutions', performance: 78, orders: 12 },
  { name: 'Component Plus', performance: 89, orders: 9 },
];

const categoryData = [
  { name: 'Raw Materials', value: 45, color: '#667eea' },
  { name: 'Components', value: 30, color: '#764ba2' },
  { name: 'Finished Goods', value: 15, color: '#f093fb' },
  { name: 'Tools & Equipment', value: 10, color: '#4facfe' },
];

const AnalyticsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('6months');

  const handleExportCSV = () => {
    const inventory = getInventory();
    const suppliers = getSuppliers();
    const boms = getBOMs();
    
    // Create comprehensive analytics CSV
    const headers = ['Metric', 'Value', 'Category'];
    const rows = [
      ['Total Products', inventory.length, 'Inventory'],
      ['Low Stock Items', inventory.filter(i => i.status === 'low').length, 'Inventory'],
      ['Out of Stock', inventory.filter(i => i.status === 'out').length, 'Inventory'],
      ['Total Suppliers', suppliers.length, 'Suppliers'],
      ['Total BOMs', boms.length, 'BOMs'],
      ['Active BOMs', boms.filter(b => b.status === 'active').length, 'BOMs'],
      ['Total Inventory Value (₹)', inventory.reduce((sum, i) => sum + (i.quantity * i.price), 0), 'Financial'],
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actions = (
    <>
      <Button
        variant="outlined"
        startIcon={<TableChartIcon />}
        sx={{ mr: 1 }}
        onClick={handleExportCSV}
      >
        Export CSV
      </Button>
      <Button
        variant="outlined"
        startIcon={<PictureAsPdfIcon />}
        sx={{ mr: 1 }}
      >
        Export PDF
      </Button>
      <Button
        variant="contained"
        startIcon={<GetAppIcon />}
      >
        Generate Report
      </Button>
    </>
  );

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '₹12.5L',
      change: 18,
      changeType: 'increase' as const,
      color: 'success' as const,
    },
    {
      title: 'Avg Order Value',
      value: '₹2,554',
      change: 2,
      changeType: 'increase' as const,
      color: 'primary' as const,
    },
    {
      title: 'Inventory Turnover',
      value: '4.2x',
      change: 8,
      changeType: 'increase' as const,
      color: 'info' as const,
    },
    {
      title: 'Supplier Rating',
      value: '88%',
      change: -3,
      changeType: 'decrease' as const,
      color: 'warning' as const,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Analytics & Reports"
        subtitle="View insights, generate reports, and analyze business performance"
        actions={actions}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Chip label="15 Reports Available" color="primary" sx={{ mr: 1 }} />
          <Chip label="Real-time Data" color="success" sx={{ mr: 1 }} />
          <Chip label="Last Updated: 5 min ago" color="info" />
        </Box>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="1month">Last Month</MenuItem>
            <MenuItem value="3months">Last 3 Months</MenuItem>
            <MenuItem value="6months">Last 6 Months</MenuItem>
            <MenuItem value="1year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              color={kpi.color}
            />
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Overview" />
            <Tab label="Inventory Analytics" />
            <Tab label="Sales Performance" />
            <Tab label="Supplier Analysis" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Overview Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#667eea"
                      fill="#667eea"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Inventory Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          )}

          {/* Inventory Analytics Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Inventory Status Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inStock" stackId="a" fill="#4caf50" name="In Stock" />
                  <Bar dataKey="lowStock" stackId="a" fill="#ff9800" name="Low Stock" />
                  <Bar dataKey="outOfStock" stackId="a" fill="#f44336" name="Out of Stock" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}

          {/* Sales Performance Tab */}
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Monthly Revenue
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#667eea"
                      strokeWidth={3}
                      dot={{ fill: '#667eea', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Volume
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#764ba2" />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          )}

          {/* Supplier Analysis Tab */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Supplier Performance Scorecard
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={supplierData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                  <Bar dataKey="performance" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>

              <Grid container spacing={3} sx={{ mt: 3 }}>
                {supplierData.map((supplier, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {supplier.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Performance:</Typography>
                          <Chip
                            label={`${supplier.performance}%`}
                            color={supplier.performance >= 90 ? 'success' : supplier.performance >= 80 ? 'warning' : 'error'}
                            size="small"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">Orders:</Typography>
                          <Typography variant="body2">{supplier.orders}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      <Routes>
        <Route path="/reports" element={<div>Report Generation (Coming Soon)</div>} />
        <Route path="/inventory-trends" element={<div>Inventory Trend Analysis (Coming Soon)</div>} />
        <Route path="/supplier-performance" element={<div>Supplier Performance Analytics (Coming Soon)</div>} />
        <Route path="/cost-analysis" element={<div>Cost Analysis Dashboard (Coming Soon)</div>} />
      </Routes>
    </Box>
  );
};

export default AnalyticsPage;

