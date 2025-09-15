import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShoppingCart, Megaphone, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from API
  const stats = [
    {
      title: 'Total Customers',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Total Orders',
      value: '5,678',
      change: '+8%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Active Campaigns',
      value: '12',
      change: '+3',
      changeType: 'positive' as const,
      icon: Megaphone,
    },
    {
      title: 'Revenue',
      value: '₹45,678',
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'customer',
      message: 'New customer John Doe registered',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'order',
      message: 'Order #1234 completed for ₹299.99',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'campaign',
      message: 'Campaign "Summer Sale" sent to 1,200 customers',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'customer',
      message: 'Customer Jane Smith updated their profile',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your Mini CRM dashboard. Here's an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'customer' ? 'bg-blue-500' :
                    activity.type === 'order' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`} />
                  <p className="text-sm text-gray-900">{activity.message}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/customers')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <div className="text-center">
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Add Customer</p>
            </div>
          </button>
          <button 
            onClick={() => navigate('/audience-segments')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <div className="text-center">
              <Megaphone className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Create Campaign</p>
            </div>
          </button>
          <button 
            onClick={() => navigate('/campaigns')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">View Analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
