# 🗺️ Export & Import System - Visual Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    NetworkVision ERP                             │
│                    Export & Import System                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴──────────────┐
                │                            │
         ┌──────▼──────┐            ┌───────▼────────┐
         │   EXPORT    │            │    IMPORT      │
         │   SYSTEM    │            │    SYSTEM      │
         └──────┬──────┘            └───────┬────────┘
                │                           │
      ┌─────────┼─────────┐                │
      │         │         │                │
┌─────▼───┐ ┌──▼───┐ ┌───▼────┐    ┌─────▼──────┐
│Inventory│ │Suppli│ │  BOM   │    │    BOM     │
│         │ │ ers  │ │        │    │  Import    │
└─────────┘ └──────┘ └────────┘    │  Wizard    │
┌─────────┐ ┌──────┐ ┌────────┐    └────────────┘
│Complian │ │Analyt│ │Dashbrd │
│  ce     │ │ ics  │ │        │
└─────────┘ └──────┘ └────────┘
```

---

## Export Flow Diagram

```
┌──────────┐
│   USER   │
└────┬─────┘
     │ 1. Clicks "Export CSV"
     │
┌────▼──────────────────────────┐
│  handleExport() Function       │
│  ┌──────────────────────────┐ │
│  │ 1. Get data from storage │ │
│  │ 2. Create CSV headers    │ │
│  │ 3. Map data to rows      │ │
│  │ 4. Join with commas      │ │
│  │ 5. Create Blob           │ │
│  │ 6. Generate download URL │ │
│  │ 7. Trigger download      │ │
│  └──────────────────────────┘ │
└───────────┬───────────────────┘
            │
     ┌──────▼──────┐
     │   Browser   │
     │  Downloads  │
     │     CSV     │
     └─────────────┘
```

---

## BOM Import Flow Diagram

```
┌──────────┐
│   USER   │
└────┬─────┘
     │
     │ Opens Import Dialog
     │
┌────▼─────────────────────────────────────────────────┐
│              BOM Import Wizard                       │
│                                                      │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  STEP 1: UPLOAD                               ║  │
│  ║  ┌─────────────────────────────────────────┐ ║  │
│  ║  │  📥 Download Template                   │ ║  │
│  ║  │  ┌───────────────────────────────────┐  │ ║  │
│  ║  │  │  BOM_Import_Template.csv          │  │ ║  │
│  ║  │  │  - Level, Parent ID, Product ID   │  │ ║  │
│  ║  │  │  - 10 example rows                │  │ ║  │
│  ║  │  └───────────────────────────────────┘  │ ║  │
│  ║  │                                          │ ║  │
│  ║  │  ☁️  Drag & Drop Zone                   │ ║  │
│  ║  │  ┌───────────────────────────────────┐  │ ║  │
│  ║  │  │  Drop CSV here or click to browse │  │ ║  │
│  ║  │  └───────────────────────────────────┘  │ ║  │
│  ║  └─────────────────────────────────────────┘ ║  │
│  ╚═══════════════════════════════════════════════╝  │
│                        │                             │
│                        │ CSV Uploaded                │
│                        ▼                             │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  STEP 2: VALIDATE                             ║  │
│  ║  ┌─────────────────────────────────────────┐ ║  │
│  ║  │  PapaParse CSV                          │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  Check Required Fields                  │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  Validate Data Types                    │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  Check Value Ranges                     │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  ┌─────────────┐    ┌────────────────┐ │ ║  │
│  ║  │  │   ERRORS?   │───>│  Show Error    │ │ ║  │
│  ║  │  │             │    │  Table         │ │ ║  │
│  ║  │  └─────────────┘    └────────────────┘ │ ║  │
│  ║  │  ┌─────────────┐    ┌────────────────┐ │ ║  │
│  ║  │  │  WARNINGS?  │───>│  Show Warning  │ │ ║  │
│  ║  │  │             │    │  Table         │ │ ║  │
│  ║  │  └─────────────┘    └────────────────┘ │ ║  │
│  ║  │  ┌─────────────┐                       │ ║  │
│  ║  │  │   SUCCESS   │───> Next Step        │ ║  │
│  ║  │  └─────────────┘                       │ ║  │
│  ║  └─────────────────────────────────────────┘ ║  │
│  ╚═══════════════════════════════════════════════╝  │
│                        │                             │
│                        │ Validation Passed           │
│                        ▼                             │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  STEP 3: PREVIEW TREE                         ║  │
│  ║  ┌─────────────────────────────────────────┐ ║  │
│  ║  │  Build Tree Structure                   │ ║  │
│  ║  │  ├─ Sort by Level                       │ ║  │
│  ║  │  ├─ Create node map                     │ ║  │
│  ║  │  ├─ Assign parents                      │ ║  │
│  ║  │  └─ Calculate costs                     │ ║  │
│  ║  │                                          │ ║  │
│  ║  │  Visual Tree Display:                   │ ║  │
│  ║  │  ┌───────────────────────────────────┐  │ ║  │
│  ║  │  │ 🌳 Electric Motor 5HP             │  │ ║  │
│  ║  │  │   ├─ 🔩 Stator Assembly           │  │ ║  │
│  ║  │  │   │   ├─ ⚡ Copper Wire 2.5mm     │  │ ║  │
│  ║  │  │   │   └─ 📄 Lamination Steel      │  │ ║  │
│  ║  │  │   ├─ 🔩 Rotor Assembly            │  │ ║  │
│  ║  │  │   │   ├─ 🔧 Steel Shaft           │  │ ║  │
│  ║  │  │   │   └─ ⚙️  Bearing 6205         │  │ ║  │
│  ║  │  │   ├─ 🏠 Aluminum Housing          │  │ ║  │
│  ║  │  │   └─ 🌀 Cooling Fan (Optional)    │  │ ║  │
│  ║  │  └───────────────────────────────────┘  │ ║  │
│  ║  │                                          │ ║  │
│  ║  │  💰 Total Cost: ₹15,750                 │ ║  │
│  ║  │  📦 Components: 9                        │ ║  │
│  ║  └─────────────────────────────────────────┘ ║  │
│  ╚═══════════════════════════════════════════════╝  │
│                        │                             │
│                        │ User Confirms               │
│                        ▼                             │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  STEP 4: IMPORT                               ║  │
│  ║  ┌─────────────────────────────────────────┐ ║  │
│  ║  │  Save to localStorage                   │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  Create Activity Log                    │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  Show Success Animation                 │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  ✅ Import Successful!                  │ ║  │
│  ║  │  9 components imported                  │ ║  │
│  ║  │  ↓                                       │ ║  │
│  ║  │  Refresh Page                           │ ║  │
│  ║  └─────────────────────────────────────────┘ ║  │
│  ╚═══════════════════════════════════════════════╝  │
└──────────────────────────────────────────────────────┘
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Inventory │  │Suppliers │  │   BOM    │             │
│  │   Page   │  │   Page   │  │   Page   │             │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
│       │             │              │                    │
│       │ Export      │ Export       │ Export/Import     │
│       ▼             ▼              ▼                    │
│  ┌─────────────────────────────────────────────┐       │
│  │         Export/Import Functions             │       │
│  │  - handleExport()                           │       │
│  │  - handleImport()                           │       │
│  │  - validateData()                           │       │
│  │  - buildTree()                              │       │
│  └─────────────┬───────────────────────────────┘       │
│                │                                        │
└────────────────┼────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│                    STORAGE LAYER                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │           localStorage Utilities                 │   │
│  │  - getInventory()                               │   │
│  │  - getSuppliers()                               │   │
│  │  - getBOMs()                                    │   │
│  │  - addBOM()                                     │   │
│  │  - addActivity()                                │   │
│  └─────────────┬───────────────────────────────────┘   │
│                │                                        │
│                ▼                                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │          Browser localStorage                    │   │
│  │  - networkvision_inventory                      │   │
│  │  - networkvision_suppliers                      │   │
│  │  - networkvision_bom                            │   │
│  │  - networkvision_activities                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
BOMImportDialog (Main Component)
│
├── Dialog (Material-UI)
│   │
│   ├── DialogTitle
│   │   ├── CloudUploadIcon
│   │   ├── Typography ("Import BOM from CSV")
│   │   └── IconButton (Close)
│   │
│   ├── DialogContent
│   │   │
│   │   ├── Stepper (4 steps)
│   │   │   ├── Step 1: Upload
│   │   │   ├── Step 2: Validate
│   │   │   ├── Step 3: Preview
│   │   │   └── Step 4: Import
│   │   │
│   │   ├── Step Content (conditional)
│   │   │   │
│   │   │   ├── [STEP 0] Upload Section
│   │   │   │   ├── Alert (Template info)
│   │   │   │   ├── Paper (Dropzone)
│   │   │   │   └── Accordion (Format guide)
│   │   │   │
│   │   │   ├── [STEP 1] Validation Section
│   │   │   │   ├── Alert (Status)
│   │   │   │   ├── TableContainer (Errors)
│   │   │   │   └── TableContainer (Components)
│   │   │   │
│   │   │   ├── [STEP 2] Preview Section
│   │   │   │   ├── Alert (Info)
│   │   │   │   ├── Box (Stats chips)
│   │   │   │   └── Paper (Tree view)
│   │   │   │       └── renderTreePreview()
│   │   │   │           ├── Level 0 nodes
│   │   │   │           ├── Level 1 nodes (indented)
│   │   │   │           └── Level 2+ nodes (further indented)
│   │   │   │
│   │   │   └── [STEP 3] Success Section
│   │   │       ├── CheckCircleIcon (large)
│   │   │       └── Typography (Success message)
│   │   │
│   │   └── LinearProgress (Processing)
│   │
│   └── DialogActions
│       ├── Button (Cancel/Back)
│       └── Button (Next/Import)
│
└── State Management
    ├── activeStep
    ├── csvData
    ├── parsedComponents
    ├── errors
    ├── isProcessing
    ├── bomName
    └── bomVersion
```

---

## Tree Building Process

```
Input CSV (Flat Structure):
┌─────┬─────────┬────────────┬───────────────────┐
│Level│Parent ID│Product ID  │Product Name       │
├─────┼─────────┼────────────┼───────────────────┤
│  0  │         │MOTOR-001   │Electric Motor     │
│  1  │MOTOR-001│STATOR-001  │Stator Assembly    │
│  2  │STATOR-01│COPPER-001  │Copper Wire        │
│  2  │STATOR-01│STEEL-001   │Lamination Steel   │
│  1  │MOTOR-001│ROTOR-001   │Rotor Assembly     │
└─────┴─────────┴────────────┴───────────────────┘

              ↓ buildTreeStructure()

Output Tree (Hierarchical):
Electric Motor (MOTOR-001)
├── Stator Assembly (STATOR-001)
│   ├── Copper Wire (COPPER-001)
│   └── Lamination Steel (STEEL-001)
└── Rotor Assembly (ROTOR-001)
```

---

## Validation Logic Flow

```
                     ┌───────────┐
                     │ CSV Data  │
                     └─────┬─────┘
                           │
                     ┌─────▼──────┐
                     │ For Each   │
                     │    Row     │
                     └─────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
    │   Check     │ │   Check    │ │   Check    │
    │  Required   │ │   Types    │ │   Ranges   │
    │   Fields    │ │            │ │            │
    └──────┬──────┘ └─────┬──────┘ └─────┬──────┘
           │               │               │
           │  ❌ Missing   │  ❌ Invalid  │  ⚠️  Out of
           │     Field     │     Type     │     Range
           │               │               │
           └───────────────┼───────────────┘
                           │
                     ┌─────▼──────┐
                     │  Collect   │
                     │   Errors   │
                     └─────┬──────┘
                           │
                  ┌────────┴────────┐
                  │                 │
           ┌──────▼──────┐   ┌─────▼─────┐
           │   Errors    │   │  Warnings │
           │   (Block)   │   │  (Allow)  │
           └─────────────┘   └───────────┘
```

---

## Cost Calculation Flow

```
Component Data:
┌──────────┬─────┬──────┬─────────┐
│ Quantity │Unit │ Cost │Wastage %│
├──────────┼─────┼──────┼─────────┤
│    50    │ m   │ ₹45  │   5%    │
└──────────┴─────┴──────┴─────────┘

         ↓

Base Cost = Quantity × Unit Cost
         = 50 × ₹45
         = ₹2,250

         ↓

Wastage = Base Cost × (Wastage % / 100)
        = ₹2,250 × (5 / 100)
        = ₹112.50

         ↓

Total Cost = Base Cost + Wastage
          = ₹2,250 + ₹112.50
          = ₹2,362.50

         ↓

Final: ₹2,362.50
```

---

## File Organization

```
networkvision-erp/
│
├── src/
│   ├── components/
│   │   ├── bom/
│   │   │   ├── BOMImportDialog.tsx  ⭐ NEW (720 lines)
│   │   │   └── BOMTreeView.tsx
│   │   │
│   │   ├── inventory/
│   │   │   ├── AddInventoryDialog.tsx
│   │   │   ├── InventoryDetailDialog.tsx
│   │   │   └── InventoryList.tsx
│   │   │
│   │   └── suppliers/
│   │       ├── AddSupplierDialog.tsx
│   │       └── SupplierDetailDialog.tsx
│   │
│   └── pages/
│       ├── Inventory.tsx           📝 Modified (Export added)
│       ├── Suppliers.tsx           📝 Modified (Export added)
│       ├── BOMManagement.tsx       📝 Modified (Import/Export)
│       ├── Compliance.tsx          📝 Modified (Export added)
│       ├── Analytics.tsx           📝 Modified (Export prepared)
│       └── Dashboard.tsx           📝 Modified (Export prepared)
│
├── Documentation/
│   ├── EXPORT_IMPORT_COMPLETE.md         📚 Feature docs
│   ├── EXPORT_IMPORT_TESTING.md          📚 Test guide
│   ├── FINAL_EXPORT_IMPORT_SUMMARY.md    📚 Summary
│   └── EXPORT_IMPORT_ARCHITECTURE.md     📚 This file
│
└── Template Files/
    └── BOM_Import_Template.csv           📥 Downloadable
```

---

## State Management

```
BOMImportDialog State:

activeStep: number
├── 0: Upload
├── 1: Validate
├── 2: Preview
└── 3: Import Complete

csvData: any[]
└── Raw parsed CSV data

parsedComponents: BOMComponent[]
└── Validated and typed components

errors: ValidationError[]
└── Array of validation errors

isProcessing: boolean
└── Loading state during import

bomName: string
└── Name for the BOM

bomVersion: string
└── Version string (e.g., "v1.0")
```

---

## Integration Points

```
┌─────────────────────────────────────────┐
│         Application Entry Points        │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼────┐    ┌────▼─────┐   ┌────▼─────┐
│Export  │    │  Import  │   │localStorage│
│Buttons │    │  Dialog  │   │  Utils    │
└───┬────┘    └────┬─────┘   └────┬─────┘
    │              │               │
    │              │               │
    └──────────────┼───────────────┘
                   │
         ┌─────────▼──────────┐
         │   Browser Storage  │
         │  (localStorage)    │
         └────────────────────┘
```

---

**END OF ARCHITECTURE DIAGRAM**

This visual guide shows the complete architecture, data flow, and component hierarchy of the Export & Import System in NetworkVision ERP.

