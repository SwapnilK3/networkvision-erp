import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  GetApp as GetAppIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

interface ImportError {
  row: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

interface ImportResult {
  success: boolean;
  totalRows: number;
  successCount: number;
  errorCount: number;
  warningCount: number;
  errors: ImportError[];
  data: any[];
}

interface FileImportProps {
  open: boolean;
  onClose: () => void;
  onImport: (data: any[]) => Promise<ImportResult>;
  title: string;
  templateName: string;
  expectedColumns: string[];
  validationRules?: {
    [key: string]: (value: any, row: any) => string | null;
  };
}

const FileImport: React.FC<FileImportProps> = ({
  open,
  onClose,
  onImport,
  title,
  templateName,
  expectedColumns,
  validationRules = {},
}) => {
  const [importStep, setImportStep] = useState<'upload' | 'preview' | 'result'>('upload');
  const [csvData, setCsvData] = useState<any[]>([]);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
            setCsvData(results.data);
            setImportStep('preview');
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
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  });

  const validateData = (data: any[]): ImportError[] => {
    const errors: ImportError[] = [];

    data.forEach((row, index) => {
      // Check for missing required columns
      expectedColumns.forEach((column) => {
        if (!row[column] || row[column].toString().trim() === '') {
          errors.push({
            row: index + 1,
            field: column,
            message: `${column} is required`,
            severity: 'error',
          });
        }
      });

      // Apply custom validation rules
      Object.entries(validationRules).forEach(([field, validator]) => {
        const error = validator(row[field], row);
        if (error) {
          errors.push({
            row: index + 1,
            field,
            message: error,
            severity: 'warning',
          });
        }
      });
    });

    return errors;
  };

  const handleImport = async () => {
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      const result = await onImport(csvData);
      setImportResult(result);
      setImportStep('result');
      setUploadProgress(100);
    } catch (error) {
      console.error('Import error:', error);
      setImportResult({
        success: false,
        totalRows: csvData.length,
        successCount: 0,
        errorCount: csvData.length,
        warningCount: 0,
        errors: [{ row: 0, field: 'general', message: 'Import failed', severity: 'error' }],
        data: [],
      });
      setImportStep('result');
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setImportStep('upload');
    setCsvData([]);
    setImportResult(null);
    setIsProcessing(false);
    setUploadProgress(0);
    onClose();
  };

  const downloadTemplate = () => {
    const csvContent = expectedColumns.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validationErrors = csvData.length > 0 ? validateData(csvData) : [];
  const hasErrors = validationErrors.some((error) => error.severity === 'error');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Upload Step */}
        {importStep === 'upload' && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                startIcon={<GetAppIcon />}
                onClick={downloadTemplate}
                sx={{ mb: 2 }}
              >
                Download Template
              </Button>
              <Typography variant="body2" color="text.secondary">
                Download the template file to ensure your data is in the correct format.
              </Typography>
            </Box>

            <Paper
              {...getRootProps()}
              sx={{
                p: 6,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: isDragActive ? 'primary.main' : 'grey.300',
                backgroundColor: isDragActive ? 'primary.50' : 'grey.50',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'primary.50',
                },
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isDragActive ? 'Drop the file here' : 'Drag & drop your file here'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                or click to select a file
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: CSV, XLS, XLSX
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Preview Step */}
        {importStep === 'preview' && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Data Preview
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={`${csvData.length} rows`}
                  color="primary"
                  size="small"
                />
                {validationErrors.length > 0 && (
                  <Chip
                    label={`${validationErrors.filter(e => e.severity === 'error').length} errors`}
                    color="error"
                    size="small"
                  />
                )}
                {validationErrors.filter(e => e.severity === 'warning').length > 0 && (
                  <Chip
                    label={`${validationErrors.filter(e => e.severity === 'warning').length} warnings`}
                    color="warning"
                    size="small"
                  />
                )}
              </Box>
            </Box>

            {validationErrors.length > 0 && (
              <Alert severity={hasErrors ? 'error' : 'warning'} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Validation Issues Found:
                </Typography>
                <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                  {validationErrors.slice(0, 10).map((error, index) => (
                    <Typography key={index} variant="caption" display="block">
                      Row {error.row}: {error.field} - {error.message}
                    </Typography>
                  ))}
                  {validationErrors.length > 10 && (
                    <Typography variant="caption" color="text.secondary">
                      ... and {validationErrors.length - 10} more issues
                    </Typography>
                  )}
                </Box>
              </Alert>
            )}

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    {expectedColumns.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvData.slice(0, 100).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {expectedColumns.map((column) => (
                        <TableCell key={column}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {row[column] || '-'}
                            {validationErrors.some(
                              (error) => error.row === index + 1 && error.field === column
                            ) && (
                              <Tooltip
                                title={
                                  validationErrors.find(
                                    (error) => error.row === index + 1 && error.field === column
                                  )?.message
                                }
                              >
                                {validationErrors.find(
                                  (error) => error.row === index + 1 && error.field === column
                                )?.severity === 'error' ? (
                                  <ErrorIcon color="error" fontSize="small" />
                                ) : (
                                  <WarningIcon color="warning" fontSize="small" />
                                )}
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {csvData.length > 100 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Showing first 100 rows of {csvData.length} total rows
              </Typography>
            )}
          </Box>
        )}

        {/* Result Step */}
        {importStep === 'result' && importResult && (
          <Box>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {importResult.success ? (
                <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              ) : (
                <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              )}
              <Typography variant="h6" gutterBottom>
                {importResult.success ? 'Import Completed!' : 'Import Failed'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Chip
                label={`${importResult.totalRows} Total`}
                color="primary"
              />
              <Chip
                label={`${importResult.successCount} Success`}
                color="success"
              />
              {importResult.errorCount > 0 && (
                <Chip
                  label={`${importResult.errorCount} Errors`}
                  color="error"
                />
              )}
              {importResult.warningCount > 0 && (
                <Chip
                  label={`${importResult.warningCount} Warnings`}
                  color="warning"
                />
              )}
            </Box>

            {importResult.errors.length > 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Issues Found:
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Row</TableCell>
                        <TableCell>Field</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Severity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {importResult.errors.map((error, index) => (
                        <TableRow key={index}>
                          <TableCell>{error.row}</TableCell>
                          <TableCell>{error.field}</TableCell>
                          <TableCell>{error.message}</TableCell>
                          <TableCell>
                            <Chip
                              label={error.severity}
                              color={error.severity === 'error' ? 'error' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        )}

        {isProcessing && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Processing import... {uploadProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {importStep === 'upload' && (
          <Button onClick={handleClose}>Cancel</Button>
        )}

        {importStep === 'preview' && (
          <>
            <Button onClick={() => setImportStep('upload')}>Back</Button>
            <Button
              variant="contained"
              onClick={handleImport}
              disabled={hasErrors || isProcessing}
            >
              Import Data
            </Button>
          </>
        )}

        {importStep === 'result' && (
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FileImport;
