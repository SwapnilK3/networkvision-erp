// Core entity types for NetworkVision ERP

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  avatar?: string;
  lastLogin?: string;
  permissions: string[];
}

export interface Company {
  id: string;
  name: string;
  udyamNumber?: string;
  gstNumber?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  industry: string;
  establishedYear?: number;
}

// Inventory Management Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  price: number;
  currency: string;
  barcode?: string;
  qrCode?: string;
  images: string[];
  specifications: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  product: Product;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  location: {
    warehouse: string;
    zone?: string;
    aisle?: string;
    shelf?: string;
    bin?: string;
  };
  stockLevel: 'high' | 'medium' | 'low' | 'out';
  lastRestocked: string;
  averageConsumption: number;
  leadTime: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string;
  reference?: string;
  location: string;
  performedBy: string;
  timestamp: string;
  notes?: string;
}

// BOM Management Types
export interface BOMComponent {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unit: string;
  wastagePercentage: number;
  notes?: string;
  isOptional: boolean;
  alternativeProducts: string[];
}

export interface BOM {
  id: string;
  name: string;
  version: string;
  productId: string;
  product: Product;
  components: BOMComponent[];
  totalCost: number;
  laborCost: number;
  overheadCost: number;
  status: 'draft' | 'active' | 'archived';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

export interface BOMVersion {
  id: string;
  bomId: string;
  version: string;
  changes: {
    type: 'added' | 'removed' | 'modified';
    component: string;
    details: string;
  }[];
  createdBy: string;
  createdAt: string;
  reason: string;
}

// Supplier Management Types
export interface Supplier {
  id: string;
  name: string;
  code: string;
  type: 'manufacturer' | 'distributor' | 'service_provider';
  contactPerson: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  gstNumber?: string;
  panNumber?: string;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  paymentTerms: string;
  leadTime: number;
  rating: number;
  status: 'active' | 'inactive' | 'blacklisted';
  products: string[];
  performanceMetrics: {
    onTimeDelivery: number;
    qualityRating: number;
    priceCompetitiveness: number;
    responsiveness: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplier: Supplier;
  items: {
    productId: string;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'confirmed' | 'partial' | 'completed' | 'cancelled';
  expectedDelivery: string;
  actualDelivery?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// Compliance Types
export interface ComplianceDocument {
  id: string;
  type: 'udyam' | 'gst' | 'msme' | 'environmental' | 'quality' | 'other';
  name: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'valid' | 'expired' | 'pending' | 'rejected';
  filePath?: string;
  submittedBy: string;
  submittedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface ComplianceTask {
  id: string;
  title: string;
  type: 'filing' | 'renewal' | 'audit' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: string;
  assignedTo: string;
  description: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// Analytics Types
export interface KPIMetric {
  id: string;
  name: string;
  value: number;
  unit?: string;
  change: number;
  changeType: 'increase' | 'decrease';
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  target?: number;
  status: 'good' | 'warning' | 'critical';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

// Plugin Management Types
export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  enabled: boolean;
  configuration: Record<string, any>;
  dependencies: string[];
  permissions: string[];
  author: string;
  installDate: string;
  lastUpdated: string;
}

export interface BusinessRule {
  id: string;
  name: string;
  description: string;
  module: string;
  condition: Record<string, any>;
  action: Record<string, any>;
  enabled: boolean;
  priority: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Common utility types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ImportResult {
  success: boolean;
  totalRows: number;
  successCount: number;
  errorCount: number;
  errors: {
    row: number;
    field: string;
    message: string;
  }[];
}

// Navigation and UI types
export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  children?: NavigationItem[];
  badge?: {
    count: number;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  };
  permission?: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

