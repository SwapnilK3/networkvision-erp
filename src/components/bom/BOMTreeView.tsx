import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';

interface BOMTreeNode {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  wastagePercentage: number;
  isOptional: boolean;
  children: BOMTreeNode[];
  level: number;
}

interface BOMTreeViewProps {
  bomId: string;
  data: BOMTreeNode[];
  onUpdateNode: (nodeId: string, updates: Partial<BOMTreeNode>) => void;
  onAddNode: (parentId: string, node: Omit<BOMTreeNode, 'id' | 'children'>) => void;
  onDeleteNode: (nodeId: string) => void;
  onReorderNodes: (result: any) => void;
}

const BOMTreeView: React.FC<BOMTreeViewProps> = ({
  data,
  onUpdateNode,
  onDeleteNode,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editingNode, setEditingNode] = useState<BOMTreeNode | null>(null);

  const handleToggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (expandedNodes.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, nodeId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNode(nodeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNode(null);
  };

  const handleEditNode = () => {
    const node = findNodeById(data, selectedNode!);
    if (node) {
      setEditingNode(node);
      setEditDialog(true);
    }
    handleMenuClose();
  };

  const handleAddChild = () => {
    setAddDialog(true);
    handleMenuClose();
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      onDeleteNode(selectedNode);
    }
    handleMenuClose();
  };

  const findNodeById = (nodes: BOMTreeNode[], id: string): BOMTreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
    return null;
  };

  const renderNode = (node: BOMTreeNode): React.ReactNode => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const indentLevel = node.level * 24;

    return (
      <Box key={node.id} sx={{ mb: 1 }}>
        <Card
          variant="outlined"
          sx={{
            ml: `${indentLevel}px`,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ py: 2, px: 3, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Drag Handle */}
              <Box>
                <DragIndicatorIcon color="action" sx={{ cursor: 'grab' }} />
              </Box>

                  {/* Expand/Collapse Button */}
                  {hasChildren && (
                    <IconButton
                      size="small"
                      onClick={() => handleToggleExpand(node.id)}
                      sx={{ p: 0.5 }}
                    >
                      {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  )}
                  {!hasChildren && <Box sx={{ width: 32 }} />}

                  {/* Node Content */}
                  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {node.productName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        SKU: {node.productSku}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={`${node.quantity} ${node.unit}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`₹${node.totalCost.toFixed(2)}`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                      {node.isOptional && (
                        <Chip
                          label="Optional"
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      )}
                      {node.wastagePercentage > 0 && (
                        <Tooltip title={`Wastage: ${node.wastagePercentage}%`}>
                          <Chip
                            label={`${node.wastagePercentage}%`}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </Box>

                  {/* Actions Menu */}
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, node.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>

        {/* Render Children */}
        {isExpanded && hasChildren && (
          <Box sx={{ ml: 2, mt: 1 }}>
            {node.children.map((child) =>
              renderNode(child)
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {data.map((node) => renderNode(node))}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditNode}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit Component
        </MenuItem>
        <MenuItem onClick={handleAddChild}>
          <AddIcon sx={{ mr: 1 }} fontSize="small" />
          Add Child Component
        </MenuItem>
        <MenuItem onClick={handleDeleteNode} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete Component
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit BOM Component</DialogTitle>
        <DialogContent>
          {editingNode && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Product Name"
                value={editingNode.productName}
                onChange={(e) => setEditingNode({ ...editingNode, productName: e.target.value })}
                fullWidth
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={editingNode.quantity}
                  onChange={(e) => setEditingNode({ ...editingNode, quantity: Number(e.target.value) })}
                />
                <TextField
                  label="Unit"
                  value={editingNode.unit}
                  onChange={(e) => setEditingNode({ ...editingNode, unit: e.target.value })}
                />
                <TextField
                  label="Unit Cost"
                  type="number"
                  value={editingNode.unitCost}
                  onChange={(e) => setEditingNode({ ...editingNode, unitCost: Number(e.target.value) })}
                />
              </Box>
              <TextField
                label="Wastage Percentage"
                type="number"
                value={editingNode.wastagePercentage}
                onChange={(e) => setEditingNode({ ...editingNode, wastagePercentage: Number(e.target.value) })}
              />
              <FormControl fullWidth>
                <InputLabel>Optional Component</InputLabel>
                <Select
                  value={editingNode.isOptional ? 'true' : 'false'}
                  label="Optional Component"
                  onChange={(e) => setEditingNode({ ...editingNode, isOptional: e.target.value === 'true' })}
                >
                  <MenuItem value="false">Required</MenuItem>
                  <MenuItem value="true">Optional</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (editingNode) {
                onUpdateNode(editingNode.id, editingNode);
                setEditDialog(false);
                setEditingNode(null);
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Child Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Child Component</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add a new component to the BOM structure
          </Typography>
          {/* Add form fields similar to edit dialog */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained">Add Component</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BOMTreeView;
