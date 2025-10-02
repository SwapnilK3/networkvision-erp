import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

// Auth link to add authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Apollo Client configuration with cache and error handling
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Configure pagination for inventory items
          inventoryItems: {
            keyArgs: ['filters'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          // Configure pagination for suppliers
          suppliers: {
            keyArgs: ['filters'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          // Configure pagination for BOMs
          boms: {
            keyArgs: ['filters'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Mock GraphQL queries for development
export const mockQueries = {
  GET_DASHBOARD_STATS: `
    query GetDashboardStats {
      dashboardStats {
        totalProducts
        lowStockItems
        pendingOrders
        activeSuppliers
        monthlyRevenue
        inventoryValue
        complianceScore
        systemHealth
      }
    }
  `,
  
  GET_INVENTORY_ITEMS: `
    query GetInventoryItems($filters: InventoryFilters, $pagination: PaginationInput) {
      inventoryItems(filters: $filters, pagination: $pagination) {
        items {
          id
          product {
            id
            sku
            name
            category
          }
          currentStock
          minStock
          maxStock
          stockLevel
          location {
            warehouse
            zone
            aisle
            shelf
          }
          lastRestocked
        }
        total
        page
        totalPages
      }
    }
  `,
  
  GET_SUPPLIERS: `
    query GetSuppliers($filters: SupplierFilters, $pagination: PaginationInput) {
      suppliers(filters: $filters, pagination: $pagination) {
        items {
          id
          name
          code
          type
          contactPerson
          email
          phone
          rating
          status
          leadTime
          performanceMetrics {
            onTimeDelivery
            qualityRating
            priceCompetitiveness
            responsiveness
          }
        }
        total
        page
        totalPages
      }
    }
  `,
  
  GET_BOMS: `
    query GetBOMs($filters: BOMFilters, $pagination: PaginationInput) {
      boms(filters: $filters, pagination: $pagination) {
        items {
          id
          name
          version
          product {
            id
            name
            sku
          }
          totalCost
          status
          createdAt
          updatedAt
          components {
            id
            product {
              name
              sku
            }
            quantity
            unit
          }
        }
        total
        page
        totalPages
      }
    }
  `,
};

export default apolloClient;

