import React from 'react';
import { HelpCircle } from 'lucide-react';
import Input from '../ui/Input';
import Tooltip from '../ui/Tooltip';

interface InputRowProps {
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  tooltipText?: string;
  unit?: string | React.ReactNode;
  calculatedValue?: string | React.ReactNode;
}

const InputRow: React.FC<InputRowProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  tooltipText,
  unit,
  calculatedValue,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 items-center py-2">
      <div className="flex items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {tooltipText && (
          <Tooltip text={tooltipText}>
            <HelpCircle size={14} className="ml-1.5 text-slate-400 cursor-help" />
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="text-right"
            onFocus={(e) => e.target.select()}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
              {unit}
            </span>
          )}
        </div>
        {calculatedValue && (
          <div className="w-28 text-right text-sm text-slate-600 font-medium">
            {calculatedValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputRow;
