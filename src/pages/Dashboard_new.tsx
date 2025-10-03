// NetworkVision ERP Dashboard - With Local Storage Integration
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  TrendingDown as TrendingDownIcon,
  ShoppingCart as ShoppingCartIcon,
  Business as BusinessIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  Verified as VerifiedIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import RecentActivity from '../components/dashboard/RecentActivity';
import { getInventory, getSuppliers, getAlerts, formatINR } from '../utils/localStorage';
import { initializeData } from '../utils/seedData';

const Dashboard: React.FC = () => {
  const [kpiData, setKpiData] = useState([
    {
      title: 'Total Products',
      value: 0,
      change: 12,
      changeType: 'increase' as const,
      icon: <InventoryIcon />,
      color: 'primary' as const,
    },
    {
      title: 'Low Stock Items',
      value: 0,
      change: -8,
      changeType: 'decrease' as const,
      icon: <TrendingDownIcon />,
      color: 'warning' as const,
    },
    {
      title: 'Pending Orders',
      value: 0,
      change: 5,
      changeType: 'increase' as const,
      icon: <ShoppingCartIcon />,
      color: 'info' as const,
    },
    {
      title: 'Active Suppliers',
      value: 0,
      change: 3,
      changeType: 'increase' as const,
      icon: <BusinessIcon />,
      color: 'success' as const,
    },
    {
      title: 'Monthly Revenue',
      value: '₹0',
      change: 18,
      changeType: 'increase' as const,
      icon: <AttachMoneyIcon />,
      color: 'success' as const,
    },
    {
      title: 'Inventory Value',
      value: '₹0',
      change: 7,
      changeType: 'increase' as const,
      icon: <AssessmentIcon />,
      color: 'primary' as const,
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: 2,
      changeType: 'increase' as const,
      icon: <VerifiedIcon />,
      color: 'success' as const,
    },
    {
      title: 'System Health',
      value: '98%',
      change: 0,
      icon: <SpeedIcon />,
      color: 'success' as const,
    },
  ]);

  useEffect(() => {
    // Initialize data on first load
    initializeData();
    
    // Load real data from localStorage
    const loadDashboardData = () => {
      const inventory = getInventory();
      const suppliers = getSuppliers();
      const alerts = getAlerts();
      
      // Calculate KPIs
      const totalProducts = inventory.length;
      const lowStockItems = inventory.filter(item => item.status === 'low' || item.status === 'out').length;
      const activeSuppliers = suppliers.length;
      const pendingOrders = alerts.filter(alert => alert.type === 'warning' && !alert.read).length;
      
      // Calculate inventory value
      const inventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      
      // Mock monthly revenue (in real app, this would come from sales data)
      const monthlyRevenue = inventoryValue * 0.25; // Assuming 25% is revenue
      
      setKpiData([
        {
          title: 'Total Products',
          value: totalProducts,
          change: 12,
          changeType: 'increase',
          icon: <InventoryIcon />,
          color: 'primary',
        },
        {
          title: 'Low Stock Items',
          value: lowStockItems,
          change: lowStockItems > 3 ? -8 : 5,
          changeType: 'decrease' as const,
          icon: <TrendingDownIcon />,
          color: 'warning' as const,
        },
        {
          title: 'Pending Orders',
          value: pendingOrders,
          change: 5,
          changeType: 'increase',
          icon: <ShoppingCartIcon />,
          color: 'info',
        },
        {
          title: 'Active Suppliers',
          value: activeSuppliers,
          change: 3,
          changeType: 'increase',
          icon: <BusinessIcon />,
          color: 'success',
        },
        {
          title: 'Monthly Revenue',
          value: formatINR(monthlyRevenue),
          change: 18,
          changeType: 'increase',
          icon: <AttachMoneyIcon />,
          color: 'success',
        },
        {
          title: 'Inventory Value',
          value: formatINR(inventoryValue),
          change: 7,
          changeType: 'increase',
          icon: <AssessmentIcon />,
          color: 'primary',
        },
        {
          title: 'Compliance Score',
          value: '94%',
          change: 2,
          changeType: 'increase',
          icon: <VerifiedIcon />,
          color: 'success',
        },
        {
          title: 'System Health',
          value: '98%',
          change: 0,
          icon: <SpeedIcon />,
          color: 'success',
        },
      ]);
    };
    
    loadDashboardData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <PageHeader
        title="Dashboard"
        subtitle="नमस्ते! Welcome back! Here's what's happening with your business today."
        showBreadcrumbs={false}
      />

      {/* KPI Cards with staggered animation */}
      <Grid
        container
        spacing={3}
        sx={{
          mb: 4,
          '& > .MuiGrid-item': {
            animation: 'fadeInUp 0.6s ease-out both',
          },
          '@keyframes fadeInUp': {
            from: {
              opacity: 0,
              transform: 'translateY(30px)',
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        {kpiData.map((kpi, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <StatCard
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={kpi.icon}
              color={kpi.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions with animation */}
      <Box
        sx={{
          mb: 4,
          animation: 'fadeIn 0.8s ease-out 0.5s both',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <QuickActions />
      </Box>

      {/* Alerts and Activity with animation */}
      <Grid
        container
        spacing={3}
        sx={{
          animation: 'fadeIn 0.8s ease-out 0.7s both',
        }}
      >
        <Grid item xs={12} lg={6}>
          <AlertsPanel />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
