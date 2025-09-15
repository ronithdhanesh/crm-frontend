import React from 'react';
import { X, GripVertical } from 'lucide-react';
import { Rule } from '../../types';

interface RuleBlockProps {
  rule: Rule;
  index: number;
  onUpdate: (index: number, rule: Rule) => void;
  onDelete: (index: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const RuleBlock: React.FC<RuleBlockProps> = ({
  rule,
  index,
  onUpdate,
  onDelete,
  onMove,
}) => {
  const fieldOptions = [
    { value: 'totalSpend', label: 'Total Spend' },
    { value: 'visits', label: 'Visits' },
    { value: 'lastPurchaseDate', label: 'Last Purchase Date' },
  ];

  const operatorOptions = [
    { value: '>', label: 'Greater than' },
    { value: '<', label: 'Less than' },
    { value: '>=', label: 'Greater than or equal' },
    { value: '<=', label: 'Less than or equal' },
    { value: '==', label: 'Equal to' },
    { value: '!=', label: 'Not equal to' },
  ];

  const handleFieldChange = (field: string) => {
    onUpdate(index, { ...rule, field });
  };

  const handleOperatorChange = (operator: string) => {
    onUpdate(index, { ...rule, operator });
  };

  const handleValueChange = (value: any) => {
    onUpdate(index, { ...rule, value });
  };

  const getValueInputType = () => {
    if (rule.field === 'lastPurchaseDate') return 'date';
    if (rule.field === 'totalSpend') return 'number';
    return 'number';
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 relative group">
      <div className="flex items-center space-x-3">
        {/* Drag Handle */}
        <div className="cursor-move text-blue-400 hover:text-blue-600">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Field Selection */}
        <select
          value={rule.field}
          onChange={(e) => handleFieldChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          {fieldOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Operator Selection */}
        <select
          value={rule.operator}
          onChange={(e) => handleOperatorChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          {operatorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Value Input */}
        <input
          type={getValueInputType()}
          value={rule.value}
          onChange={(e) => handleValueChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder="Value"
        />

        {/* Delete Button */}
        <button
          onClick={() => onDelete(index)}
          className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RuleBlock;
