import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Customer, CustomerFormData } from '../types';
import apiService from '../services/api';
import CustomerCard from '../components/Customers/CustomerCard';
import CustomerForm from '../components/Customers/CustomerForm';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      console.log('Loading customers...');
      const data = await apiService.getCustomers();
      console.log('Customers data:', data);
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load customers:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (data: CustomerFormData) => {
    try {
      setFormLoading(true);
      await apiService.createCustomer(data);
      await loadCustomers();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create customer:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateCustomer = async (data: CustomerFormData) => {
    if (!editingCustomer) return;
    
    try {
      setFormLoading(true);
      await apiService.updateCustomer(editingCustomer._id, data);
      await loadCustomers();
      setEditingCustomer(null);
    } catch (error) {
      console.error('Failed to update customer:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCustomer = async (customer: Customer) => {
    if (!window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      return;
    }

    try {
      await apiService.deleteCustomer(customer._id);
      await loadCustomers();
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const filteredCustomers = Array.isArray(customers) ? customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="mt-2 text-gray-600">
            Manage your customer database and view customer information.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>

      {/* Customer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Customer</h3>
              <CustomerForm
                onSubmit={handleCreateCustomer}
                onCancel={() => setShowForm(false)}
                isLoading={formLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Customer</h3>
              <CustomerForm
                initialData={{
                  name: editingCustomer.name,
                  email: editingCustomer.email,
                  phone: editingCustomer.phone,
                }}
                onSubmit={handleUpdateCustomer}
                onCancel={() => setEditingCustomer(null)}
                isLoading={formLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Customers Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No customers found matching your search.' : 'No customers yet. Add your first customer to get started.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer._id}
              customer={customer}
              onEdit={setEditingCustomer}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
