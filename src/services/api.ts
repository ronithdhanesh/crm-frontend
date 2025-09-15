import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  Customer,
  Order,
  Campaign,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CreateOrderRequest,
  UpdateOrderRequest,
  CreateCampaignRequest,
  TextToRulesRequest,
  TextToRulesResponse,
  PreviewAudienceRequest,
  PreviewAudienceResponse
} from '../types';

const BASE_URL = 'https://mini-crm-backend-xeno.onrender.com';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      withCredentials: true, // Important for session cookies
      // NEW: Tell Axios not to follow redirects
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log('Making API request:', config.method?.toUpperCase(), config.url);
        console.log('Request cookies:', document.cookie);
        console.log('Request headers:', config.headers);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        console.log('API response:', response.status, response.config.url, response.headers['content-type']);
        return response;
      },
      (error: AxiosError) => {
        console.log('API error:', error.response?.status, error.config?.url, error.message);
        if (error.response?.status === 401 || error.response?.status === 302) {
          // Instead of redirecting the whole page, reject the promise
          // The calling component/hook (e.g., useAuth) will handle authentication state and redirect within the app.
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication methods
  async checkAuth(): Promise<boolean> {
    try {
      console.log('🔍 API: Checking authentication...');
      const response = await this.api.get('/api/customers');
      
      // If we get a 200 OK, the user is authenticated.
      console.log('✅ API: Auth check successful. Status:', response.status);
      return true;
    } catch (error: any) {
      console.log('❌ API: Auth check error. Status:', error.response?.status);
      console.log('❌ API: Error message:', error.message);
      
      // If we get a 302 or 401, the user is not authenticated.
      if (error.response?.status === 302 || error.response?.status === 401) {
        window.location.href = `${BASE_URL}/login`;
        return false;
      }
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
        await this.api.get('/logout');
        window.location.href = `${BASE_URL}/login`;
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
  }

  // New: Method to get the Google Auth URL
  getGoogleAuthUrl(): string {
    return `${BASE_URL}/auth/google`;
  }

  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    try {
      const response: AxiosResponse<Customer[]> = await this.api.get('/api/customers');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      throw error;
    }
  }

  async getCustomer(id: string): Promise<Customer> {
    try {
      const response: AxiosResponse<Customer> = await this.api.get(`/api/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch customer:', error);
      throw error;
    }
  }

  async createCustomer(data: CreateCustomerRequest): Promise<Customer> {
    try {
      const response: AxiosResponse<Customer> = await this.api.post('/api/customers', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create customer:', error);
      throw error;
    }
  }

  async updateCustomer(id: string, data: UpdateCustomerRequest): Promise<Customer> {
    try {
      const response: AxiosResponse<Customer> = await this.api.put(`/api/customers/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update customer:', error);
      throw error;
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.api.delete(`/api/customers/${id}`);
    } catch (error) {
      console.error('Failed to delete customer:', error);
      throw error;
    }
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    try {
      const response: AxiosResponse<Order[]> = await this.api.get('/api/orders');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const response: AxiosResponse<Order> = await this.api.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw error;
    }
  }

  async createOrder(data: CreateOrderRequest): Promise<Order> {
    try {
      const response: AxiosResponse<Order> = await this.api.post('/api/orders', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }

  async updateOrder(id: string, data: UpdateOrderRequest): Promise<Order> {
    try {
      const response: AxiosResponse<Order> = await this.api.put(`/api/orders/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update order:', error);
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await this.api.delete(`/api/orders/${id}`);
    } catch (error) {
      console.error('Failed to delete order:', error);
      throw error;
    }
  }

  // AI methods
  async textToRules(data: TextToRulesRequest): Promise<TextToRulesResponse> {
    try {
      const response: AxiosResponse<TextToRulesResponse> = await this.api.post('/api/ai/text-to-rules', data);
      return response.data;
    } catch (error) {
      console.error('Failed to get AI rules:', error);
      throw error;
    }
  }

  // Campaign methods
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const response: AxiosResponse<Campaign[]> = await this.api.get('/api/campaigns');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      throw error;
    }
  }

  async previewAudience(data: PreviewAudienceRequest): Promise<PreviewAudienceResponse> {
    try {
      const response: AxiosResponse<PreviewAudienceResponse> = await this.api.post('/api/campaigns/preview', data);
      return response.data || { audienceSize: 0 };
    } catch (error) {
      console.error('Failed to preview audience:', error);
      throw error;
    }
  }

  async createCampaign(data: CreateCampaignRequest): Promise<Campaign> {
    try {
      const response: AxiosResponse<Campaign> = await this.api.post('/api/campaigns', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create campaign:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;
