// Local Storage Management for NetworkVision ERP
// Handles all local data caching and CRUD operations

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unit: string;
  price: number;
  location: string;
  supplier: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'high' | 'medium' | 'low' | 'out';
}

export interface BOMItem {
  id: string;
  productName: string;
  version: string;
  components: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
  }>;
  totalCost: number;
  createdBy: string;
  createdDate: string;
  status: 'active' | 'draft' | 'archived';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gst: string;
  rating: number;
  leadTime: number;
  products: string[];
  performance: number;
  addedBy: string;
  addedDate: string;
}

export interface Activity {
  id: string;
  type: 'inventory' | 'bom' | 'supplier' | 'compliance' | 'user';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  status?: 'completed' | 'pending' | 'approved' | 'rejected';
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Storage Keys
const STORAGE_KEYS = {
  INVENTORY: 'networkvision_inventory',
  BOM: 'networkvision_bom',
  SUPPLIERS: 'networkvision_suppliers',
  ACTIVITIES: 'networkvision_activities',
  ALERTS: 'networkvision_alerts',
  USERS: 'networkvision_users',
};

// Generic Storage Functions
export const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return [];
  }
};

export const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
  }
};

// Inventory Functions
export const getInventory = (): InventoryItem[] => {
  return getFromStorage<InventoryItem>(STORAGE_KEYS.INVENTORY);
};

export const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'lastUpdated'>): InventoryItem => {
  const inventory = getInventory();
  const newItem: InventoryItem = {
    ...item,
    id: `INV-${Date.now()}`,
    lastUpdated: new Date().toISOString(),
  };
  inventory.push(newItem);
  saveToStorage(STORAGE_KEYS.INVENTORY, inventory);
  
  // Add activity log
  addActivity({
    type: 'inventory',
    title: 'Inventory Added',
    description: `Added ${item.quantity} units of ${item.name} (${item.sku})`,
    user: item.updatedBy,
    status: 'completed',
  });
  
  return newItem;
};

export const updateInventoryItem = (id: string, updates: Partial<InventoryItem>): InventoryItem | null => {
  const inventory = getInventory();
  const index = inventory.findIndex(item => item.id === id);
  
  if (index === -1) return null;
  
  const updatedItem = {
    ...inventory[index],
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  
  inventory[index] = updatedItem;
  saveToStorage(STORAGE_KEYS.INVENTORY, inventory);
  
  // Add activity log
  addActivity({
    type: 'inventory',
    title: 'Inventory Updated',
    description: `Updated ${updatedItem.name} (${updatedItem.sku})`,
    user: updates.updatedBy || 'System',
    status: 'completed',
  });
  
  return updatedItem;
};

export const deleteInventoryItem = (id: string, deletedBy: string): boolean => {
  const inventory = getInventory();
  const item = inventory.find(i => i.id === id);
  const filtered = inventory.filter(item => item.id !== id);
  
  if (filtered.length === inventory.length) return false;
  
  saveToStorage(STORAGE_KEYS.INVENTORY, filtered);
  
  // Add activity log
  if (item) {
    addActivity({
      type: 'inventory',
      title: 'Inventory Deleted',
      description: `Deleted ${item.name} (${item.sku})`,
      user: deletedBy,
      status: 'completed',
    });
  }
  
  return true;
};

// BOM Functions
export const getBOMs = (): BOMItem[] => {
  return getFromStorage<BOMItem>(STORAGE_KEYS.BOM);
};

export const addBOM = (bom: Omit<BOMItem, 'id' | 'createdDate'>): BOMItem => {
  const boms = getBOMs();
  const newBOM: BOMItem = {
    ...bom,
    id: `BOM-${Date.now()}`,
    createdDate: new Date().toISOString(),
  };
  boms.push(newBOM);
  saveToStorage(STORAGE_KEYS.BOM, boms);
  
  // Add activity log
  addActivity({
    type: 'bom',
    title: 'BOM Created',
    description: `Created BOM ${bom.version} for ${bom.productName}`,
    user: bom.createdBy,
    status: 'pending',
  });
  
  return newBOM;
};

export const updateBOM = (id: string, updates: Partial<BOMItem>): BOMItem | null => {
  const boms = getBOMs();
  const index = boms.findIndex(bom => bom.id === id);
  
  if (index === -1) return null;
  
  const updatedBOM = { ...boms[index], ...updates };
  boms[index] = updatedBOM;
  saveToStorage(STORAGE_KEYS.BOM, boms);
  
  return updatedBOM;
};

// Supplier Functions
export const getSuppliers = (): Supplier[] => {
  return getFromStorage<Supplier>(STORAGE_KEYS.SUPPLIERS);
};

export const addSupplier = (supplier: Omit<Supplier, 'id' | 'addedDate'>): Supplier => {
  const suppliers = getSuppliers();
  const newSupplier: Supplier = {
    ...supplier,
    id: `SUP-${Date.now()}`,
    addedDate: new Date().toISOString(),
  };
  suppliers.push(newSupplier);
  saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers);
  
  // Add activity log
  addActivity({
    type: 'supplier',
    title: 'Supplier Added',
    description: `Added ${supplier.name} to supplier database`,
    user: supplier.addedBy,
    status: 'approved',
  });
  
  return newSupplier;
};

export const updateSupplier = (id: string, updates: Partial<Supplier>): Supplier | null => {
  const suppliers = getSuppliers();
  const index = suppliers.findIndex(sup => sup.id === id);
  
  if (index === -1) return null;
  
  const updatedSupplier = { ...suppliers[index], ...updates };
  suppliers[index] = updatedSupplier;
  saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers);
  
  return updatedSupplier;
};

// Activity Functions
export const getActivities = (): Activity[] => {
  return getFromStorage<Activity>(STORAGE_KEYS.ACTIVITIES);
};

export const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>): Activity => {
  const activities = getActivities();
  const newActivity: Activity = {
    ...activity,
    id: `ACT-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  
  // Keep only last 100 activities
  activities.unshift(newActivity);
  if (activities.length > 100) {
    activities.pop();
  }
  
  saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
  return newActivity;
};

// Alert Functions
export const getAlerts = (): Alert[] => {
  return getFromStorage<Alert>(STORAGE_KEYS.ALERTS);
};

export const addAlert = (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>): Alert => {
  const alerts = getAlerts();
  const newAlert: Alert = {
    ...alert,
    id: `ALT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  
  alerts.unshift(newAlert);
  saveToStorage(STORAGE_KEYS.ALERTS, alerts);
  return newAlert;
};

export const markAlertAsRead = (id: string): boolean => {
  const alerts = getAlerts();
  const alert = alerts.find(a => a.id === id);
  
  if (!alert) return false;
  
  alert.read = true;
  saveToStorage(STORAGE_KEYS.ALERTS, alerts);
  return true;
};

export const deleteAlert = (id: string): boolean => {
  const alerts = getAlerts();
  const filtered = alerts.filter(alert => alert.id !== id);
  
  if (filtered.length === alerts.length) return false;
  
  saveToStorage(STORAGE_KEYS.ALERTS, filtered);
  return true;
};

// Clear all data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export data as JSON
export const exportData = (): string => {
  const data = {
    inventory: getInventory(),
    boms: getBOMs(),
    suppliers: getSuppliers(),
    activities: getActivities(),
    alerts: getAlerts(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

// Import data from JSON
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.inventory) saveToStorage(STORAGE_KEYS.INVENTORY, data.inventory);
    if (data.boms) saveToStorage(STORAGE_KEYS.BOM, data.boms);
    if (data.suppliers) saveToStorage(STORAGE_KEYS.SUPPLIERS, data.suppliers);
    if (data.activities) saveToStorage(STORAGE_KEYS.ACTIVITIES, data.activities);
    if (data.alerts) saveToStorage(STORAGE_KEYS.ALERTS, data.alerts);
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Format currency in Indian Rupees
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date in Indian format
export const formatIndianDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Get time ago in Indian context
export const getTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'अभी (just now)';
  if (diffMins < 60) return `${diffMins} मिनट पहले (${diffMins} mins ago)`;
  if (diffHours < 24) return `${diffHours} घंटे पहले (${diffHours} hours ago)`;
  if (diffDays < 7) return `${diffDays} दिन पहले (${diffDays} days ago)`;
  
  return formatIndianDate(date);
};
