import React from 'react';
import { Users, Loader } from 'lucide-react';
import { Rule } from '../../types';

interface AudiencePreviewProps {
  rules: Rule[];
  combinator: '$and' | '$or';
  audienceSize: number | null;
  isLoading: boolean;
}

const AudiencePreview: React.FC<AudiencePreviewProps> = ({
  rules,
  combinator,
  audienceSize,
  isLoading,
}) => {
  const hasRules = rules.length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-medium text-gray-900">Audience Preview</h3>
      </div>

      {!hasRules ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Add rules to see your audience size</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Rules Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Rules:</h4>
            <div className="space-y-2">
              {rules.map((rule, index) => (
                <div key={index} className="text-sm text-gray-600">
                  <span className="font-medium">{rule.field}</span>
                  <span className="mx-2">{rule.operator}</span>
                  <span className="font-medium">{rule.value}</span>
                  {index < rules.length - 1 && (
                    <span className="ml-2 text-primary-600 font-medium">
                      {combinator === '$and' ? 'AND' : 'OR'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audience Size */}
          <div className="text-center">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="w-5 h-5 animate-spin text-primary-600" />
                <span className="text-gray-600">Calculating audience size...</span>
              </div>
            ) : audienceSize !== null && typeof audienceSize === 'number' && !isNaN(audienceSize) ? (
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {audienceSize.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">customers match your criteria</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <p>Click "Preview Audience" to see the size</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudiencePreview;
