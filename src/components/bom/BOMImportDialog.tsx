import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  alpha,
  useTheme,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
  AccountTree as AccountTreeIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { addBOM } from '../../utils/localStorage';

interface BOMComponent {
  level: number;
  parentId?: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;
  unitCost: number;
  wastagePercentage: number;
  isOptional: boolean;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

interface BOMImportDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const steps = ['Upload File', 'Validate Data', 'Preview Structure', 'Import'];

const BOMImportDialog: React.FC<BOMImportDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [parsedComponents, setParsedComponents] = useState<BOMComponent[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bomName, setBomName] = useState('');
  const [bomVersion, setBomVersion] = useState('v1.0');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setActiveStep(1);
            validateData(results.data);
          },
          error: (error: any) => {
            console.error('CSV parsing error:', error);
          },
        });
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const validateData = (data: any[]) => {
    const validationErrors: ValidationError[] = [];
    const components: BOMComponent[] = [];

    data.forEach((row, index) => {
      // Required fields validation
      const requiredFields = [
        'Level',
        'Product ID',
        'Product Name',
        'Product SKU',
        'Quantity',
        'Unit',
        'Unit Cost',
      ];

      requiredFields.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === '') {
          validationErrors.push({
            row: index + 1,
            field,
            message: `${field} is required`,
            severity: 'error',
          });
        }
      });

      // Type validation
      const level = parseInt(row['Level']);
      const quantity = parseFloat(row['Quantity']);
      const unitCost = parseFloat(row['Unit Cost']);
      const wastagePercentage = parseFloat(row['Wastage %'] || '0');

      if (isNaN(level) || level < 0) {
        validationErrors.push({
          row: index + 1,
          field: 'Level',
          message: 'Level must be a non-negative number',
          severity: 'error',
        });
      }

      if (isNaN(quantity) || quantity <= 0) {
        validationErrors.push({
          row: index + 1,
          field: 'Quantity',
          message: 'Quantity must be greater than 0',
          severity: 'error',
        });
      }

      if (isNaN(unitCost) || unitCost < 0) {
        validationErrors.push({
          row: index + 1,
          field: 'Unit Cost',
          message: 'Unit Cost must be non-negative',
          severity: 'error',
        });
      }

      if (isNaN(wastagePercentage) || wastagePercentage < 0 || wastagePercentage > 100) {
        validationErrors.push({
          row: index + 1,
          field: 'Wastage %',
          message: 'Wastage % must be between 0 and 100',
          severity: 'warning',
        });
      }

      // Add to components if no critical errors
      if (validationErrors.filter(e => e.row === index + 1 && e.severity === 'error').length === 0) {
        components.push({
          level,
          parentId: row['Parent ID'] || undefined,
          productId: row['Product ID'],
          productName: row['Product Name'],
          productSku: row['Product SKU'],
          quantity,
          unit: row['Unit'],
          unitCost,
          wastagePercentage,
          isOptional: row['Optional']?.toLowerCase() === 'yes' || row['Optional']?.toLowerCase() === 'true',
        });
      }
    });

    setErrors(validationErrors);
    setParsedComponents(components);

    // Auto-set BOM name from first row if it's level 0
    if (components.length > 0 && components[0].level === 0) {
      setBomName(components[0].productName);
    }
  };

  const buildTreeStructure = (components: BOMComponent[]) => {
    // Sort by level
    const sorted = [...components].sort((a, b) => a.level - b.level);
    
    const tree: any[] = [];
    const map = new Map();

    sorted.forEach((comp, index) => {
      const node = {
        id: `node-${index}`,
        ...comp,
        totalCost: comp.quantity * comp.unitCost * (1 + comp.wastagePercentage / 100),
        children: [],
      };

      map.set(comp.productId, node);

      if (comp.level === 0) {
        tree.push(node);
      } else if (comp.parentId && map.has(comp.parentId)) {
        map.get(comp.parentId).children.push(node);
      } else {
        // Find parent by level (previous component with level-1)
        const parent = sorted
          .slice(0, index)
          .reverse()
          .find(c => c.level === comp.level - 1);
        
        if (parent && map.has(parent.productId)) {
          map.get(parent.productId).children.push(node);
        }
      }
    });

    return tree;
  };

  const handleImport = async () => {
    setIsProcessing(true);
    
    try {
      const treeStructure = buildTreeStructure(parsedComponents);
      
      // Calculate total cost
      const calculateTotalCost = (nodes: any[]): number => {
        return nodes.reduce((sum, node) => {
          const nodeCost = node.totalCost + calculateTotalCost(node.children || []);
          return sum + nodeCost;
        }, 0);
      };

      const totalCost = calculateTotalCost(treeStructure);

      // Save to localStorage
      addBOM({
        productName: bomName || parsedComponents[0]?.productName || 'Imported BOM',
        version: bomVersion,
        components: parsedComponents.map(c => ({
          id: c.productId,
          name: c.productName,
          quantity: c.quantity,
          unit: c.unit,
          cost: c.unitCost,
        })),
        totalCost,
        createdBy: 'Admin User',
        status: 'draft',
      });

      setActiveStep(3);
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
        handleClose();
      }, 1500);
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setParsedComponents([]);
    setErrors([]);
    setBomName('');
    setBomVersion('v1.0');
    onClose();
  };

  const downloadTemplate = () => {
    const template = [
      'Level,Parent ID,Product ID,Product Name,Product SKU,Quantity,Unit,Unit Cost,Wastage %,Optional',
      '0,,MOTOR-5HP-001,Electric Motor 5HP,MOTOR-5HP-001,1,unit,15750,0,No',
      '1,MOTOR-5HP-001,STATOR-001,Stator Assembly,STATOR-001,1,unit,8500,2,No',
      '2,STATOR-001,COPPER-WIRE-2.5,Copper Wire 2.5mm,COPPER-WIRE-2.5,50,meters,45,5,No',
      '2,STATOR-001,LAMINATION-STEEL,Lamination Steel,LAM-STEEL-001,20,sheets,150,3,No',
      '1,MOTOR-5HP-001,ROTOR-001,Rotor Assembly,ROTOR-001,1,unit,5200,2,No',
      '2,ROTOR-001,SHAFT-STEEL,Steel Shaft 25mm,SHAFT-25MM,1,unit,850,1,No',
      '2,ROTOR-001,BEARING-6205,Bearing 6205,BEAR-6205,2,unit,220,0,No',
      '1,MOTOR-5HP-001,HOUSING-ALU,Aluminum Housing,HOUSE-ALU-001,1,unit,1800,5,No',
      '1,MOTOR-5HP-001,FAN-BLADE,Cooling Fan,FAN-COOL-001,1,unit,250,0,Yes',
    ].join('\n');

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BOM_Import_Template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderTreePreview = (nodes: any[], level = 0) => {
    return nodes.map((node, index) => (
      <Box key={index}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            ml: level * 4,
            backgroundColor: level === 0 
              ? alpha(theme.palette.primary.main, 0.05)
              : alpha(theme.palette.grey[500], 0.02),
            borderLeft: `3px solid ${level === 0 
              ? theme.palette.primary.main 
              : theme.palette.grey[300]}`,
            borderRadius: 1,
            mb: 0.5,
          }}
        >
          <AccountTreeIcon 
            sx={{ 
              color: level === 0 ? 'primary.main' : 'text.secondary',
              fontSize: 20 - level * 2,
            }} 
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {node.productName} ({node.productSku})
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Qty: {node.quantity} {node.unit} × ₹{node.unitCost} = ₹{node.totalCost.toFixed(2)}
              {node.wastagePercentage > 0 && ` (Wastage: ${node.wastagePercentage}%)`}
              {node.isOptional && (
                <Chip label="Optional" size="small" sx={{ ml: 1, height: 16 }} />
              )}
            </Typography>
          </Box>
        </Box>
        {node.children && node.children.length > 0 && renderTreePreview(node.children, level + 1)}
      </Box>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUploadIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Import BOM from CSV
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: alpha('#fff', 0.1),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 0: Upload */}
        {activeStep === 0 && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }} icon={<DownloadIcon />}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Download Template First
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                Use our CSV template to structure your BOM data correctly with level-based hierarchy.
              </Typography>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={downloadTemplate}
              >
                Download CSV Template
              </Button>
            </Alert>

            <Paper
              {...getRootProps()}
              sx={{
                p: 4,
                textAlign: 'center',
                border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
                backgroundColor: isDragActive 
                  ? alpha(theme.palette.primary.main, 0.05)
                  : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                },
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isDragActive ? 'Drop the CSV file here' : 'Drag & drop CSV file here'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                or click to browse files
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                Supported format: CSV with headers (Level, Product ID, Product Name, etc.)
              </Typography>
            </Paper>

            {/* Format Guide */}
            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  📋 CSV Format Guide
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    <strong>Required Columns:</strong>
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li><code>Level</code> - Hierarchy level (0=root, 1=child, 2=sub-child, etc.)</li>
                    <li><code>Parent ID</code> - Parent product ID (optional, auto-inferred from level)</li>
                    <li><code>Product ID</code> - Unique identifier for the component</li>
                    <li><code>Product Name</code> - Display name of the component</li>
                    <li><code>Product SKU</code> - SKU/code for the component</li>
                    <li><code>Quantity</code> - Number of units required</li>
                    <li><code>Unit</code> - Unit of measurement (unit, kg, meters, etc.)</li>
                    <li><code>Unit Cost</code> - Cost per unit in ₹</li>
                    <li><code>Wastage %</code> - Wastage percentage (0-100)</li>
                    <li><code>Optional</code> - Yes/No if component is optional</li>
                  </ul>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                    💡 The system will automatically build the tree structure based on levels and parent IDs.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {/* Step 1: Validation */}
        {activeStep === 1 && (
          <Box>
            <Alert 
              severity={errors.filter(e => e.severity === 'error').length > 0 ? 'error' : 'success'}
              sx={{ mb: 3 }}
            >
              {errors.filter(e => e.severity === 'error').length > 0 ? (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {errors.filter(e => e.severity === 'error').length} Error(s) Found
                  </Typography>
                  <Typography variant="caption">
                    Please fix the errors before proceeding.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Validation Successful!
                  </Typography>
                  <Typography variant="caption">
                    {parsedComponents.length} components validated successfully.
                  </Typography>
                </>
              )}
            </Alert>

            {errors.length > 0 && (
              <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Row</TableCell>
                      <TableCell>Field</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {errors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell>{error.row}</TableCell>
                        <TableCell><code>{error.field}</code></TableCell>
                        <TableCell>{error.message}</TableCell>
                        <TableCell>
                          <Chip
                            label={error.severity}
                            color={error.severity === 'error' ? 'error' : 'warning'}
                            size="small"
                            icon={error.severity === 'error' ? <ErrorIcon /> : <WarningIcon />}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {parsedComponents.length > 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Parsed Components ({parsedComponents.length})
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Level</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell align="right">Cost</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {parsedComponents.map((comp, index) => (
                        <TableRow key={index}>
                          <TableCell>{comp.level}</TableCell>
                          <TableCell>{comp.productName}</TableCell>
                          <TableCell><code>{comp.productSku}</code></TableCell>
                          <TableCell align="right">{comp.quantity}</TableCell>
                          <TableCell>{comp.unit}</TableCell>
                          <TableCell align="right">₹{comp.unitCost}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        )}

        {/* Step 2: Preview Tree Structure */}
        {activeStep === 2 && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Preview BOM Tree Structure
              </Typography>
              <Typography variant="caption">
                Review the hierarchical structure before importing. The tree will be saved as shown below.
              </Typography>
            </Alert>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                BOM Details
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip label={`${parsedComponents.length} Components`} color="primary" />
                <Chip 
                  label={`Total Cost: ₹${parsedComponents.reduce((sum, c) => 
                    sum + (c.quantity * c.unitCost * (1 + c.wastagePercentage / 100)), 0
                  ).toFixed(2)}`} 
                  color="success" 
                />
              </Box>
            </Box>

            <Paper sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
              {renderTreePreview(buildTreeStructure(parsedComponents))}
            </Paper>
          </Box>
        )}

        {/* Step 3: Import Complete */}
        {activeStep === 3 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Import Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {parsedComponents.length} components have been imported successfully.
            </Typography>
          </Box>
        )}

        {isProcessing && <LinearProgress sx={{ mt: 2 }} />}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        {activeStep === 0 && (
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        )}
        {activeStep === 1 && (
          <>
            <Button onClick={() => setActiveStep(0)} variant="outlined">
              Back
            </Button>
            <Button
              onClick={() => setActiveStep(2)}
              variant="contained"
              disabled={errors.filter(e => e.severity === 'error').length > 0}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              Next: Preview
            </Button>
          </>
        )}
        {activeStep === 2 && (
          <>
            <Button onClick={() => setActiveStep(1)} variant="outlined">
              Back
            </Button>
            <Button
              onClick={handleImport}
              variant="contained"
              disabled={isProcessing}
              startIcon={<CheckCircleIcon />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              Import BOM
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BOMImportDialog;
