import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Eye, Play } from 'lucide-react';
import { Rule, CampaignFormData } from '../types';
import apiService from '../services/api';
import RuleBlock from '../components/Campaigns/RuleBlock';
import AIPrompt from '../components/Campaigns/AIPrompt';
import AudiencePreview from '../components/Campaigns/AudiencePreview';

const AudienceSegments: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [combinator, setCombinator] = useState<'$and' | '$or'>('$and');
  const [audienceSize, setAudienceSize] = useState<number | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignForm, setCampaignForm] = useState<CampaignFormData>({
    name: '',
    messageTemplate: '',
  });

  const addRule = () => {
    const newRule: Rule = {
      field: 'totalSpend',
      operator: '>',
      value: 0,
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (index: number, updatedRule: Rule) => {
    const newRules = [...rules];
    newRules[index] = updatedRule;
    setRules(newRules);
  };

  const deleteRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const moveRule = (fromIndex: number, toIndex: number) => {
    const newRules = [...rules];
    const [movedRule] = newRules.splice(fromIndex, 1);
    newRules.splice(toIndex, 0, movedRule);
    setRules(newRules);
  };

  const handleAIGeneratedRules = (newRules: Rule[], newCombinator: '$and' | '$or') => {
    setRules(newRules);
    setCombinator(newCombinator);
  };

  const previewAudience = useCallback(async () => {
    if ((rules || []).length === 0) return;

    try {
      setIsLoadingPreview(true);
      const response = await apiService.previewAudience({
        rules,
        combinator,
      });
      setAudienceSize(response?.audienceSize || 0);
    } catch (error) {
      console.error('Failed to preview audience:', error);
      setAudienceSize(null);
      // Don't show alert for connection errors - just log them
      if (error && typeof error === 'object' && 'code' in error && error.code !== 'ERR_NETWORK') {
        alert('Failed to preview audience. Please try again.');
      }
    } finally {
      setIsLoadingPreview(false);
    }
  }, [rules, combinator]);

  const createCampaign = async () => {
    if ((rules || []).length === 0) {
      alert('Please add at least one rule before creating a campaign.');
      return;
    }

    if (!campaignForm.name.trim() || !campaignForm.messageTemplate.trim()) {
      alert('Please fill in all campaign details.');
      return;
    }

    try {
      await apiService.createCampaign({
        name: campaignForm.name,
        audience: { rules, combinator },
        messageTemplate: campaignForm.messageTemplate,
      });
      
      alert('Campaign created successfully!');
      setShowCampaignForm(false);
      setCampaignForm({ name: '', messageTemplate: '' });
    } catch (error) {
      console.error('Failed to create campaign:', error);
      alert('Failed to create campaign. Please try again.');
    }
  };

  // Auto-preview when rules change
  useEffect(() => {
    if ((rules || []).length > 0) {
      const timeoutId = setTimeout(() => {
        previewAudience();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setAudienceSize(null);
    }
  }, [rules, combinator, previewAudience]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audience Segments</h1>
        <p className="mt-2 text-gray-600">
          Create targeted customer segments using rules or AI-powered natural language.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Rule Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Prompt Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <AIPrompt
              onRulesGenerated={handleAIGeneratedRules}
              isLoading={isLoadingAI}
              setIsLoading={setIsLoadingAI}
            />
          </div>

          {/* Manual Rules Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Manual Rules</h3>
              <button
                onClick={addRule}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Rule
              </button>
            </div>

            {(rules || []).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No rules added yet</p>
                <button
                  onClick={addRule}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Rule
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Combinator Selection */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Combine rules with:</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCombinator('$and')}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        combinator === '$and'
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      AND
                    </button>
                    <button
                      onClick={() => setCombinator('$or')}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        combinator === '$or'
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      OR
                    </button>
                  </div>
                </div>

                {/* Rules */}
                <div className="space-y-3">
                  {(rules || []).map((rule, index) => (
                    <RuleBlock
                      key={index}
                      rule={rule}
                      index={index}
                      onUpdate={updateRule}
                      onDelete={deleteRule}
                      onMove={moveRule}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Preview and Actions */}
        <div className="space-y-6">
          {/* Audience Preview */}
          <AudiencePreview
            rules={rules}
            combinator={combinator}
            audienceSize={audienceSize}
            isLoading={isLoadingPreview}
          />

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={previewAudience}
                disabled={(rules || []).length === 0 || isLoadingPreview}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Audience
              </button>

              <button
                onClick={() => setShowCampaignForm(true)}
                disabled={(rules || []).length === 0}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create Campaign</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    id="campaign-name"
                    value={campaignForm.name}
                    onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="e.g., Summer Sale Campaign"
                  />
                </div>

                <div>
                  <label htmlFor="message-template" className="block text-sm font-medium text-gray-700">
                    Message Template *
                  </label>
                  <textarea
                    id="message-template"
                    value={campaignForm.messageTemplate}
                    onChange={(e) => setCampaignForm({ ...campaignForm, messageTemplate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    rows={4}
                    placeholder="Enter your campaign message..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowCampaignForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createCampaign}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Create Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudienceSegments;
