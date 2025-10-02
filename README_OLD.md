# NetworkVision ERP

A modern, modular frontend prototype for an ERP platform designed specifically for Indian micro-manufacturers. This React-based application provides comprehensive inventory management, BOM (Bill of Materials) management, supplier management, compliance tracking, and analytics capabilities.

## 🌟 Features

### Core Modules
- **Inventory Management**: Real-time stock tracking, barcode scanning, location mapping
- **BOM Management**: Interactive multi-level tree view, version control, cost analysis
- **Supplier Management**: Performance scorecards, lead time tracking, ratings
- **Compliance**: Multi-step wizards for Udyam, GST, MSME filings
- **Analytics**: Visual dashboards with charts and export capabilities
- **Plugin Management**: Enable/disable features, JSON-based business rules

### Technical Features
- **Progressive Web App (PWA)**: Offline-first functionality with local caching
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Accessibility**: ARIA attributes, keyboard navigation support
- **GraphQL Integration**: Apollo Client for efficient data management
- **Drag & Drop**: Excel/CSV import with template recognition
- **Real-time Updates**: Live data synchronization
- **Modular Architecture**: Extensible component structure

## 🎨 Design System

- **Primary Colors**: #667eea (trusted blue), #764ba2 (professional purple)
- **Typography**: Inter font family for modern readability
- **Components**: Material-UI (MUI) with custom theming
- **Icons**: Material-UI icons with consistent styling
- **Layout**: Responsive navigation drawer with collapsible sidebar

## 🚀 Getting Started

### ⚠️ Important: Node.js Compatibility

**Current Issue**: The system has Node.js v12.22.9, but this project requires Node.js 14+ for optimal performance.

### Prerequisites

- **Node.js 14+ (Required)** - Current version 12.22.9 is incompatible
- npm or yarn package manager
- Modern web browser with ES2020 support

### Installation & Running Options

#### Option 1: Upgrade Node.js (Recommended)
```bash
# Install Node.js 14+ from https://nodejs.org
# Then run:
cd /home/swapnil/Avishkar/networkvision-erp
npm install
npm run dev
# Open http://localhost:3000
```

#### Option 2: Use Docker (Alternative)
```bash
# Create a Dockerfile with Node.js 18+
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build and run
docker build -t networkvision-erp .
docker run -p 3000:3000 networkvision-erp
```

#### Option 3: Cloud Development Environment
- Use **GitHub Codespaces**, **Gitpod**, or **CodeSandbox**
- Clone this repository in the cloud environment
- Run `npm install && npm run dev`
- Access via the provided cloud URL

#### Option 4: Static Build (If you have access to Node.js 14+)
```bash
# On a system with Node.js 14+:
npm run build
# Then serve the 'dist' folder with any web server
python -m http.server 3000  # From the dist folder
```

### Quick Preview
Open `run-prototype.html` in your browser to see the project overview and running instructions.

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (PageHeader, StatCard, etc.)
│   ├── layout/          # Layout components (Header, Sidebar, Layout)
│   ├── dashboard/       # Dashboard-specific components
│   ├── inventory/       # Inventory management components
│   ├── bom/            # BOM management components
│   ├── suppliers/       # Supplier management components
│   ├── compliance/      # Compliance components
│   ├── analytics/       # Analytics components
│   └── plugins/         # Plugin management components
├── pages/              # Page components for routing
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── services/           # API services and Apollo client
├── theme/              # Material-UI theme configuration
└── main.tsx           # Application entry point
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with full IntelliSense
- **Vite**: Fast build tool with hot module replacement

### UI Library
- **Material-UI (MUI) v5**: Comprehensive React component library
- **MUI X Data Grid**: Advanced data table with filtering and sorting
- **MUI X Charts**: Data visualization components
- **MUI X Date Pickers**: Date/time selection components

### State Management & Data
- **Apollo Client**: GraphQL client with caching and error handling
- **GraphQL**: Query language for efficient data fetching
- **React Router**: Client-side routing with nested routes

### Development Tools
- **ESLint**: Code linting with React-specific rules
- **TypeScript Compiler**: Type checking and compilation
- **Vite PWA Plugin**: Progressive Web App functionality

### Additional Libraries
- **React Dropzone**: Drag & drop file uploads
- **Date-fns**: Date manipulation and formatting
- **Recharts**: Additional charting capabilities

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_TITLE=NetworkVision ERP
```

### PWA Configuration

The application is configured as a Progressive Web App with:
- Service worker for offline functionality
- Web app manifest for installability
- Offline-first caching strategy
- Background sync capabilities

### Theme Customization

The theme can be customized in `src/theme/index.ts`:

```typescript
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#667eea', // Customize primary color
    },
    secondary: {
      main: '#764ba2', // Customize secondary color
    },
  },
  // ... other theme options
};
```

## 📱 Mobile Experience

The application is designed with a mobile-first approach:

- **Responsive Breakpoints**: Adapts to all screen sizes
- **Touch-Friendly**: Optimized touch targets and gestures
- **Offline Support**: Works without internet connection
- **Fast Loading**: Optimized bundle size and lazy loading
- **Native Feel**: PWA installation for app-like experience

## 🔌 Plugin System

The application supports a flexible plugin architecture:

### Plugin Structure
```typescript
interface Plugin {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  configuration: Record<string, any>;
  permissions: string[];
}
```

### Business Rules
JSON-based business rules for customization:
```typescript
interface BusinessRule {
  id: string;
  name: string;
  module: string;
  condition: Record<string, any>;
  action: Record<string, any>;
  enabled: boolean;
}
```

## 📊 Data Models

### Core Entities
- **Products**: SKU, name, category, specifications
- **Inventory**: Stock levels, locations, movements
- **BOMs**: Components, versions, cost analysis
- **Suppliers**: Contact info, performance metrics
- **Compliance**: Documents, tasks, deadlines

### Sample Data
The application includes comprehensive mock data for demonstration:
- 1,247 sample products across multiple categories
- Realistic stock levels and locations
- Supplier performance metrics
- Compliance tracking examples

## 🚀 Deployment

### Build Optimization
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Image and font optimization
- **Service Worker**: Caches resources for offline use

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Docker**: Containerized deployment
- **Traditional Servers**: Apache, Nginx

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📈 Performance

### Optimization Features
- **Lazy Loading**: Components loaded on demand
- **Virtual Scrolling**: Efficient large dataset handling
- **Memoization**: Prevents unnecessary re-renders
- **Bundle Analysis**: Webpack bundle analyzer
- **Performance Monitoring**: Web Vitals tracking

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 90+
- PWA: 100

## 🔒 Security

- **Input Validation**: Client-side validation with server verification
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based request validation
- **Secure Headers**: Content Security Policy implementation
- **Authentication**: JWT token-based authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Maintain accessibility standards
- Follow Material-UI design patterns
- Document new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI Team**: Excellent React component library
- **Vite Team**: Fast and modern build tool
- **Apollo Team**: Powerful GraphQL client
- **React Team**: Amazing frontend framework

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

---

**NetworkVision ERP** - Empowering India's micro-manufacturers with modern technology solutions.

