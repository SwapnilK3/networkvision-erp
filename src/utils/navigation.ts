import { NavigationItem } from '../types';

// Navigation structure for NetworkVision ERP
export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/',
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: 'inventory',
    path: '/inventory',
    badge: {
      count: 5, // Low stock items
      color: 'warning',
    },
  },
  {
    id: 'bom',
    title: 'BOM Management',
    icon: 'account_tree',
    path: '/bom',
  },
  {
    id: 'suppliers',
    title: 'Suppliers',
    icon: 'business',
    path: '/suppliers',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    icon: 'verified',
    path: '/compliance',
    badge: {
      count: 2, // Pending tasks
      color: 'error',
    },
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: 'analytics',
    path: '/analytics',
  },
  {
    id: 'plugins',
    title: 'Plugins',
    icon: 'extension',
    path: '/plugins',
  },
];

// Quick action items for dashboard
export const quickActions = [
  {
    id: 'add-product',
    title: 'Add Product',
    description: 'Add a new product to inventory',
    icon: 'add_box',
    path: '/inventory/add',
    color: 'primary' as const,
  },
  {
    id: 'create-bom',
    title: 'Create BOM',
    description: 'Create a new Bill of Materials',
    icon: 'account_tree',
    path: '/bom/create',
    color: 'secondary' as const,
  },
  {
    id: 'add-supplier',
    title: 'Add Supplier',
    description: 'Register a new supplier',
    icon: 'person_add',
    path: '/suppliers/add',
    color: 'info' as const,
  },
  {
    id: 'scan-barcode',
    title: 'Scan Barcode',
    description: 'Scan product barcode',
    icon: 'qr_code_scanner',
    path: '/inventory/scan',
    color: 'success' as const,
  },
  {
    id: 'generate-report',
    title: 'Generate Report',
    description: 'Create analytics report',
    icon: 'assessment',
    path: '/analytics/reports',
    color: 'warning' as const,
  },
  {
    id: 'compliance-check',
    title: 'Compliance Check',
    description: 'Review compliance status',
    icon: 'fact_check',
    path: '/compliance/check',
    color: 'error' as const,
  },
];

// Breadcrumb generator
export const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ title: 'Home', path: '/' }];
  
  let currentPath = '';
  for (const segment of pathSegments) {
    currentPath += `/${segment}`;
    const navItem = navigationItems.find(item => item.path === currentPath);
    
    if (navItem) {
      breadcrumbs.push({
        title: navItem.title,
        path: currentPath,
      });
    } else {
      // Handle dynamic routes
      const formattedTitle = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({
        title: formattedTitle,
        path: currentPath,
      });
    }
  }
  
  return breadcrumbs;
};

