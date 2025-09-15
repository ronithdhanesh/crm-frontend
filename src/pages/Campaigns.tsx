import React, { useState, useEffect } from 'react';
import { Campaign } from '../types';
import apiService from '../services/api';
import { Megaphone, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCampaigns();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Running':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Draft':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Running':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <p className="mt-2 text-gray-600">
          View and manage your marketing campaigns and their performance.
        </p>
      </div>

      {/* Campaigns List */}
      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-500 mb-6">
            Create your first campaign to start reaching your customers.
          </p>
          <button
            onClick={() => window.location.href = '/audience-segments'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(campaigns) ? campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1">{campaign.status}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{campaign.messageTemplate}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Audience: {campaign.audienceSize.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        Sent: {campaign.deliveryStats.sent}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">
                        Failed: {campaign.deliveryStats.failed}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Created: {formatDate(campaign.createdAt)}
                    {campaign.updatedAt !== campaign.createdAt && (
                      <span className="ml-4">Updated: {formatDate(campaign.updatedAt)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Campaign Rules Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Audience Rules:</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="space-y-1">
                    {campaign.audience.rules.map((rule, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <span className="font-medium">{rule.field}</span>
                        <span className="mx-2">{rule.operator}</span>
                        <span className="font-medium">{rule.value}</span>
                        {index < campaign.audience.rules.length - 1 && (
                          <span className="ml-2 text-primary-600 font-medium">
                            {campaign.audience.combinator === '$and' ? 'AND' : 'OR'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )) : null}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
