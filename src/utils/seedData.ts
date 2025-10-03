// Initial seed data for NetworkVision ERP
// Uses real team names and Indian Rupees

import {
  InventoryItem,
  BOMItem,
  Supplier,
  Activity,
  Alert,
  saveToStorage,
  getFromStorage,
} from './localStorage';

const STORAGE_KEYS = {
  INVENTORY: 'networkvision_inventory',
  BOM: 'networkvision_bom',
  SUPPLIERS: 'networkvision_suppliers',
  ACTIVITIES: 'networkvision_activities',
  ALERTS: 'networkvision_alerts',
};

// Team Members
export const TEAM_MEMBERS = [
  'Swapnil Kale',
  'Aaradhya Kulkarni',
  'Sanchit Joshi',
  'Ved Mahajan',
  'Yash Kahalkar',
  'Aara Danich',
];

// Initial Inventory Data
const initialInventory: InventoryItem[] = [
  {
    id: 'INV-001',
    sku: 'MT-001',
    name: 'Steel Sheet 1mm',
    category: 'Raw Materials',
    quantity: 450,
    minStock: 100,
    maxStock: 500,
    unit: 'Sheets',
    price: 850,
    location: 'Warehouse A - Rack 1',
    supplier: 'Maharashtra Steel Industries',
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Swapnil Kale',
    status: 'high',
  },
  {
    id: 'INV-002',
    sku: 'MT-002',
    name: 'Aluminum Rods 10mm',
    category: 'Raw Materials',
    quantity: 85,
    minStock: 50,
    maxStock: 200,
    unit: 'Rods',
    price: 320,
    location: 'Warehouse A - Rack 2',
    supplier: 'Pune Metal Suppliers',
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Aaradhya Kulkarni',
    status: 'medium',
  },
  {
    id: 'INV-003',
    sku: 'EL-001',
    name: 'Motor 240V 1HP',
    category: 'Electronics',
    quantity: 12,
    minStock: 15,
    maxStock: 50,
    unit: 'Units',
    price: 4500,
    location: 'Warehouse B - Section C',
    supplier: 'Mumbai Electronics Ltd',
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Sanchit Joshi',
    status: 'low',
  },
  {
    id: 'INV-004',
    sku: 'FS-001',
    name: 'M8 Bolts',
    category: 'Fasteners',
    quantity: 2500,
    minStock: 500,
    maxStock: 5000,
    unit: 'Pieces',
    price: 2,
    location: 'Warehouse A - Bin 15',
    supplier: 'Nashik Fasteners',
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Ved Mahajan',
    status: 'high',
  },
  {
    id: 'INV-005',
    sku: 'FS-002',
    name: 'M10 Nuts',
    category: 'Fasteners',
    quantity: 1800,
    minStock: 500,
    maxStock: 3000,
    unit: 'Pieces',
    price: 3,
    location: 'Warehouse A - Bin 16',
    supplier: 'Nashik Fasteners',
    lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Yash Kahalkar',
    status: 'high',
  },
  {
    id: 'INV-006',
    sku: 'CH-001',
    name: 'Industrial Adhesive',
    category: 'Chemicals',
    quantity: 25,
    minStock: 20,
    maxStock: 100,
    unit: 'Liters',
    price: 650,
    location: 'Warehouse B - Chemical Store',
    supplier: 'Gujarat Chemicals Pvt Ltd',
    lastUpdated: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Aara Danich',
    status: 'medium',
  },
  {
    id: 'INV-007',
    sku: 'PL-001',
    name: 'PVC Pipes 2 inch',
    category: 'Plastics',
    quantity: 8,
    minStock: 20,
    maxStock: 100,
    unit: 'Units',
    price: 180,
    location: 'Warehouse A - Rack 5',
    supplier: 'Delhi Plastics Corporation',
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Swapnil Kale',
    status: 'low',
  },
  {
    id: 'INV-008',
    sku: 'PK-001',
    name: 'Cardboard Boxes Large',
    category: 'Packaging',
    quantity: 150,
    minStock: 100,
    maxStock: 500,
    unit: 'Boxes',
    price: 45,
    location: 'Warehouse B - Packing Area',
    supplier: 'Bangalore Packaging Solutions',
    lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedBy: 'Aaradhya Kulkarni',
    status: 'medium',
  },
];

// Initial BOM Data
const initialBOMs: BOMItem[] = [
  {
    id: 'BOM-001',
    productName: 'Industrial Pump Assembly',
    version: 'v2.1',
    components: [
      { id: 'C1', name: 'Motor 240V 1HP', quantity: 1, unit: 'Unit', cost: 4500 },
      { id: 'C2', name: 'Steel Sheet 1mm', quantity: 2, unit: 'Sheets', cost: 1700 },
      { id: 'C3', name: 'M8 Bolts', quantity: 24, unit: 'Pieces', cost: 48 },
      { id: 'C4', name: 'M10 Nuts', quantity: 12, unit: 'Pieces', cost: 36 },
    ],
    totalCost: 6284,
    createdBy: 'Sanchit Joshi',
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    id: 'BOM-002',
    productName: 'Conveyor Belt Unit',
    version: 'v1.3',
    components: [
      { id: 'C1', name: 'Aluminum Rods 10mm', quantity: 8, unit: 'Rods', cost: 2560 },
      { id: 'C2', name: 'Steel Sheet 1mm', quantity: 3, unit: 'Sheets', cost: 2550 },
      { id: 'C3', name: 'M10 Nuts', quantity: 40, unit: 'Pieces', cost: 120 },
      { id: 'C4', name: 'Industrial Adhesive', quantity: 2, unit: 'Liters', cost: 1300 },
    ],
    totalCost: 6530,
    createdBy: 'Ved Mahajan',
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
];

// Initial Suppliers
const initialSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Maharashtra Steel Industries',
    contactPerson: 'Rajesh Patil',
    email: 'rajesh@mahasteel.in',
    phone: '+91 98765 43210',
    address: 'MIDC Industrial Area, Pune, Maharashtra 411019',
    gst: '27ABCDE1234F1Z5',
    rating: 4.5,
    leadTime: 5,
    products: ['Steel Sheets', 'Steel Rods', 'Metal Plates'],
    performance: 92,
    addedBy: 'Swapnil Kale',
    addedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'SUP-002',
    name: 'Pune Metal Suppliers',
    contactPerson: 'Amit Deshmukh',
    email: 'amit@punemetal.com',
    phone: '+91 98234 56789',
    address: 'Bhosari Industrial Estate, Pune, Maharashtra 411026',
    gst: '27FGHIJ5678K2L9',
    rating: 4.2,
    leadTime: 7,
    products: ['Aluminum Products', 'Copper Wires', 'Metal Accessories'],
    performance: 88,
    addedBy: 'Aaradhya Kulkarni',
    addedDate: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'SUP-003',
    name: 'Mumbai Electronics Ltd',
    contactPerson: 'Priya Sharma',
    email: 'priya@mumbaielectronics.in',
    phone: '+91 97654 32108',
    address: 'Andheri East, Mumbai, Maharashtra 400069',
    gst: '27KLMNO9012P3Q4',
    rating: 4.7,
    leadTime: 3,
    products: ['Motors', 'Controllers', 'Sensors', 'Electronic Components'],
    performance: 95,
    addedBy: 'Sanchit Joshi',
    addedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'SUP-004',
    name: 'Nashik Fasteners',
    contactPerson: 'Suresh Jadhav',
    email: 'suresh@nashikfasteners.com',
    phone: '+91 96543 21098',
    address: 'Satpur MIDC, Nashik, Maharashtra 422007',
    gst: '27PQRST3456U7V8',
    rating: 4.3,
    leadTime: 4,
    products: ['Bolts', 'Nuts', 'Screws', 'Washers', 'Rivets'],
    performance: 90,
    addedBy: 'Ved Mahajan',
    addedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'SUP-005',
    name: 'Gujarat Chemicals Pvt Ltd',
    contactPerson: 'Kiran Patel',
    email: 'kiran@gujaratchem.in',
    phone: '+91 95432 10987',
    address: 'GIDC Estate, Vapi, Gujarat 396195',
    gst: '24UVWXY7890Z1A2',
    rating: 4.1,
    leadTime: 10,
    products: ['Industrial Adhesives', 'Solvents', 'Coatings', 'Lubricants'],
    performance: 85,
    addedBy: 'Yash Kahalkar',
    addedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'SUP-006',
    name: 'Delhi Plastics Corporation',
    contactPerson: 'Vikram Singh',
    email: 'vikram@delhiplastics.com',
    phone: '+91 94321 09876',
    address: 'Mayapuri Industrial Area, New Delhi 110064',
    gst: '07BCDEF2345G6H7',
    rating: 4.0,
    leadTime: 8,
    products: ['PVC Pipes', 'Plastic Sheets', 'Containers', 'Fittings'],
    performance: 82,
    addedBy: 'Aara Danich',
    addedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Initial Activities
const initialActivities: Activity[] = [
  {
    id: 'ACT-001',
    type: 'inventory',
    title: 'Stock Updated',
    description: 'Added 450 units of Steel Sheet 1mm to Warehouse A',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: 'Swapnil Kale',
    status: 'completed',
  },
  {
    id: 'ACT-002',
    type: 'bom',
    title: 'BOM Version Created',
    description: 'Created BOM v2.1 for Industrial Pump Assembly',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    user: 'Sanchit Joshi',
    status: 'pending',
  },
  {
    id: 'ACT-003',
    type: 'supplier',
    title: 'Supplier Performance Updated',
    description: 'Updated performance rating for Maharashtra Steel Industries',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    user: 'Aaradhya Kulkarni',
    status: 'completed',
  },
  {
    id: 'ACT-004',
    type: 'compliance',
    title: 'GST Return Filed',
    description: 'Monthly GST return submitted successfully for September 2024',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    user: 'Ved Mahajan',
    status: 'completed',
  },
  {
    id: 'ACT-005',
    type: 'inventory',
    title: 'Low Stock Alert Generated',
    description: 'Motor 240V 1HP stock level dropped below minimum threshold',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    user: 'System',
    status: 'pending',
  },
  {
    id: 'ACT-006',
    type: 'bom',
    title: 'BOM Approved',
    description: 'Conveyor Belt Unit BOM v1.3 approved for production',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    user: 'Yash Kahalkar',
    status: 'approved',
  },
];

// Initial Alerts
const initialAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'error',
    priority: 'high',
    title: 'Critical Stock Level',
    message: 'PVC Pipes 2 inch inventory has fallen to 8 units. Reorder immediately!',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'ALT-002',
    type: 'warning',
    priority: 'high',
    title: 'Low Stock Alert',
    message: 'Motor 240V 1HP stock is below minimum level (12/15 units)',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'ALT-003',
    type: 'warning',
    priority: 'medium',
    title: 'Supplier Lead Time Exceeded',
    message: 'Order from Gujarat Chemicals Pvt Ltd is 2 days overdue',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'ALT-004',
    type: 'info',
    priority: 'medium',
    title: 'BOM Pending Approval',
    message: 'Industrial Pump Assembly BOM v2.1 requires manager approval',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'ALT-005',
    type: 'success',
    priority: 'low',
    title: 'Compliance Updated',
    message: 'GST return for September 2024 filed successfully. Next due: 20th October',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'ALT-006',
    type: 'info',
    priority: 'low',
    title: 'Inventory Audit Due',
    message: 'Quarterly inventory audit scheduled for next week',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

// Initialize data if not exists
export const initializeData = (): void => {
  // Only initialize if no data exists
  if (getFromStorage(STORAGE_KEYS.INVENTORY).length === 0) {
    saveToStorage(STORAGE_KEYS.INVENTORY, initialInventory);
  }
  
  if (getFromStorage(STORAGE_KEYS.BOM).length === 0) {
    saveToStorage(STORAGE_KEYS.BOM, initialBOMs);
  }
  
  if (getFromStorage(STORAGE_KEYS.SUPPLIERS).length === 0) {
    saveToStorage(STORAGE_KEYS.SUPPLIERS, initialSuppliers);
  }
  
  if (getFromStorage(STORAGE_KEYS.ACTIVITIES).length === 0) {
    saveToStorage(STORAGE_KEYS.ACTIVITIES, initialActivities);
  }
  
  if (getFromStorage(STORAGE_KEYS.ALERTS).length === 0) {
    saveToStorage(STORAGE_KEYS.ALERTS, initialAlerts);
  }
  
  console.log('✅ NetworkVision ERP: Initial data loaded successfully');
};

// Reset to initial data
export const resetToInitialData = (): void => {
  saveToStorage(STORAGE_KEYS.INVENTORY, initialInventory);
  saveToStorage(STORAGE_KEYS.BOM, initialBOMs);
  saveToStorage(STORAGE_KEYS.SUPPLIERS, initialSuppliers);
  saveToStorage(STORAGE_KEYS.ACTIVITIES, initialActivities);
  saveToStorage(STORAGE_KEYS.ALERTS, initialAlerts);
  
  console.log('🔄 NetworkVision ERP: Data reset to initial state');
};
