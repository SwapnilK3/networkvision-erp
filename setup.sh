#!/bin/bash

# NetworkVision ERP - Automated Setup Script
# This script will install the correct Node.js version and set up the project

set -e  # Exit on error

echo "=========================================="
echo "NetworkVision ERP - Setup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check current Node version
CURRENT_NODE_VERSION=$(node --version 2>/dev/null || echo "none")
echo -e "${YELLOW}Current Node.js version: $CURRENT_NODE_VERSION${NC}"

if [[ "$CURRENT_NODE_VERSION" < "v18" ]] && [[ "$CURRENT_NODE_VERSION" != "none" ]]; then
    echo -e "${RED}⚠️  Node.js version is too old (requires v18+)${NC}"
    echo ""
fi

# Check if NVM is installed
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    echo -e "${GREEN}✓ NVM is already installed${NC}"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
    echo -e "${YELLOW}Installing NVM (Node Version Manager)...${NC}"
    
    # Install NVM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # Add to bashrc if not already there
    if ! grep -q "NVM_DIR" ~/.bashrc; then
        echo "" >> ~/.bashrc
        echo "# NVM Configuration" >> ~/.bashrc
        echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
        echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
        echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc
    fi
    
    echo -e "${GREEN}✓ NVM installed successfully${NC}"
fi

echo ""
echo -e "${YELLOW}Installing Node.js 18 LTS...${NC}"

# Install Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Verify installation
NEW_NODE_VERSION=$(node --version)
NEW_NPM_VERSION=$(npm --version)

echo -e "${GREEN}✓ Node.js installed: $NEW_NODE_VERSION${NC}"
echo -e "${GREEN}✓ npm installed: $NEW_NPM_VERSION${NC}"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

echo -e "${YELLOW}Cleaning old dependencies...${NC}"
rm -rf node_modules package-lock.json

echo -e "${YELLOW}Installing project dependencies...${NC}"
npm install

echo ""
echo -e "${GREEN}=========================================="
echo "✓ Setup completed successfully!"
echo "==========================================${NC}"
echo ""
echo "To start the development server, run:"
echo -e "${GREEN}  npm run dev${NC}"
echo ""
echo "Or to serve on network:"
echo -e "${GREEN}  npm run serve${NC}"
echo ""
echo "Access the application at: ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Note: You may need to restart your terminal or run:${NC}"
echo -e "${YELLOW}  source ~/.bashrc${NC}"
echo ""
