# NetworkVision ERP - Setup Guide

## Problem Identified

Your project is failing because **Node.js v12.22.9** is too old. The project requires **Node.js 18+** to work with modern tools like Vite 5, TypeScript 5, and modern React tooling.

## Solution: Install Node.js 18+ using NVM

### Step 1: Install NVM (Node Version Manager)

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Or using wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM into current session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Add to your ~/.bashrc for permanent use
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc
```

### Step 2: Install Node.js 18 LTS

```bash
# Install Node.js 18 (LTS)
nvm install 18

# Use Node.js 18
nvm use 18

# Set as default
nvm alias default 18

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

### Step 3: Clean Install Dependencies

```bash
# Navigate to project directory
cd /home/swapnil/Avishkar/networkvision-erp

# Remove old node_modules and lock file
rm -rf node_modules package-lock.json

# Install dependencies with updated Node.js
npm install
```

### Step 4: Run the Development Server

```bash
# Start the development server
npm run dev

# Or use the serve script
npm run serve
```

The application should now start on `http://localhost:3000`

---

## Alternative: Quick Docker Setup (If Node Installation Fails)

If you can't upgrade Node.js on your system, use Docker:

```bash
# Build the Docker image
docker build -t networkvision-erp .

# Run the container
docker run -p 3000:3000 -v $(pwd):/app networkvision-erp
```

---

## Dependency Updates Applied

The following changes were made to `package.json`:

### Updated Dependencies:
- `@apollo/client`: ^3.7.0 → ^3.8.8
- `@emotion/react`: ^11.10.0 → ^11.11.1
- `@emotion/styled`: ^11.10.0 → ^11.11.0
- `@mui/icons-material`: ^5.11.0 → ^5.14.19
- `@mui/material`: ^5.11.0 → ^5.14.19
- `@mui/x-data-grid`: ^5.17.0 → ^6.18.2
- `react-router-dom`: ^6.8.0 → ^6.20.1
- `recharts`: ^2.5.0 → ^2.10.3
- `graphql`: ^16.6.0 → ^16.8.1
- `date-fns`: ^2.29.0 → ^2.30.0
- `react-dropzone`: ^14.2.0 → ^14.2.3

### Updated Dev Dependencies:
- `typescript`: ^4.9.0 → ^5.3.3
- `vite`: ^4.1.0 → ^5.0.8
- `@vitejs/plugin-react`: ^3.1.0 → ^4.2.1
- `@typescript-eslint/eslint-plugin`: ^5.57.0 → ^6.14.0
- `@typescript-eslint/parser`: ^5.57.0 → ^6.14.0
- `eslint`: ^8.38.0 → ^8.55.0
- Added `@types/node`: ^20.10.5

### Added Engine Requirements:
```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

---

## Troubleshooting

### Issue: "command not found: nvm"
**Solution**: Close and reopen your terminal, or run:
```bash
source ~/.bashrc
```

### Issue: Permission errors during npm install
**Solution**: Don't use sudo with npm. If needed, fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Issue: Port 3000 already in use
**Solution**: Kill the process or use a different port:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Issue: TypeScript errors after upgrade
**Solution**: The project uses TypeScript 5 which is stricter. Check the errors with:
```bash
npm run lint
```

---

## Next Steps After Setup

1. **Verify the application runs**: Navigate to `http://localhost:3000`
2. **Check all pages load**: Dashboard, Inventory, BOM, Suppliers, Compliance, Analytics
3. **Test features**: Navigation, data tables, forms
4. **Review browser console**: Fix any runtime errors
5. **Check PWA functionality**: Test offline mode in DevTools

---

## Project Structure

```
networkvision-erp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── services/       # API and Apollo client setup
│   ├── theme/          # Material-UI theme configuration
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── index.html          # HTML template
```

---

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run serve    # Serve on network (0.0.0.0:3000)
```

---

## Contact & Support

If you continue to face issues, please provide:
1. Output of `node --version` and `npm --version`
2. Complete error logs from `npm install` or `npm run dev`
3. Your operating system details

---

**Last Updated**: October 2, 2025
