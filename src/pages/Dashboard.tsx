import React from 'react';
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

// Mock KPI data
const kpiData = [
  {
    title: 'Total Products',
    value: 1247,
    change: 12,
    changeType: 'increase' as const,
    icon: <InventoryIcon />,
    color: 'primary' as const,
  },
  {
    title: 'Low Stock Items',
    value: 23,
    change: -8,
    changeType: 'decrease' as const,
    icon: <TrendingDownIcon />,
    color: 'warning' as const,
  },
  {
    title: 'Pending Orders',
    value: 156,
    change: 5,
    changeType: 'increase' as const,
    icon: <ShoppingCartIcon />,
    color: 'info' as const,
  },
  {
    title: 'Active Suppliers',
    value: 89,
    change: 3,
    changeType: 'increase' as const,
    icon: <BusinessIcon />,
    color: 'success' as const,
  },
  {
    title: 'Monthly Revenue',
    value: '₹12.5L',
    change: 18,
    changeType: 'increase' as const,
    icon: <AttachMoneyIcon />,
    color: 'success' as const,
  },
  {
    title: 'Inventory Value',
    value: '₹45.2L',
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
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your business today."
        showBreadcrumbs={false}
      />

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <QuickActions />
      </Box>

      {/* Alerts and Activity */}
      <Grid container spacing={3}>
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

