// Core data models
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  visits: number;
  lastPurchaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  customerId: string;
  orderNumber: string;
  totalAmount: number;
  items: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Rule {
  field: string;
  operator: string;
  value: any;
}

export interface Audience {
  rules: Rule[];
  combinator: '$and' | '$or';
}

export interface Campaign {
  _id: string;
  name: string;
  audience: Audience;
  messageTemplate: string;
  audienceSize: number;
  deliveryStats: {
    sent: number;
    failed: number;
    pending: number;
  };
  status: 'Draft' | 'Running' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

// API request/response types
export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {}

export interface CreateOrderRequest {
  customerId: string;
  orderNumber: string;
  totalAmount: number;
  items: string[];
}

export interface UpdateOrderRequest extends Partial<CreateOrderRequest> {}

export interface TextToRulesRequest {
  text: string;
}

export interface TextToRulesResponse {
  rules: Rule[];
  combinator: '$and' | '$or';
}

export interface PreviewAudienceRequest {
  rules: Rule[];
  combinator: '$and' | '$or';
}

export interface PreviewAudienceResponse {
  audienceSize: number;
}

export interface CreateCampaignRequest {
  name: string;
  audience: Audience;
  messageTemplate: string;
}

// UI state types
export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Form types
export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

export interface OrderFormData {
  customerId: string;
  orderNumber: string;
  totalAmount: number;
  items: string[];
}

export interface CampaignFormData {
  name: string;
  messageTemplate: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
