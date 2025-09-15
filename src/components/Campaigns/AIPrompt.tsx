import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Rule } from '../../types';
import apiService from '../../services/api';

interface AIPromptProps {
  onRulesGenerated: (rules: Rule[], combinator: '$and' | '$or') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AIPrompt: React.FC<AIPromptProps> = ({
  onRulesGenerated,
  isLoading,
  setIsLoading,
}) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerateRules = async () => {
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      const response = await apiService.textToRules({ text: prompt });
      onRulesGenerated(response.rules, response.combinator);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate rules:', error);
      alert('Failed to generate rules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    "customers who bought more than 3 items in the last month",
    "customers who spent more than ₹1000 and visited less than 3 times",
    "customers who haven't made a purchase in the last 30 days",
    "customers who spent more than ₹500 and live in California",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-medium text-gray-900">AI-Powered Rule Generation</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Describe your audience in natural language
          </label>
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. 'customers who bought more than 3 items in the last month and live in California'"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            rows={3}
          />
        </div>

        <button
          onClick={handleGenerateRules}
          disabled={!prompt.trim() || isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Rules
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Example prompts:</p>
        <div className="space-y-1">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="block w-full text-left text-sm text-gray-500 hover:text-primary-600 hover:bg-primary-50 px-2 py-1 rounded transition-colors"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPrompt;
