import React from 'react';
import { MarginMode } from '../../types';
import Input from '../ui/Input';
import { HelpCircle } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface MarginInputProps {
  label: string;
  value: number;
  mode: MarginMode;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onModeChange: (mode: MarginMode) => void;
  tooltipText?: string;
}

const MarginInput: React.FC<MarginInputProps> = ({
  label,
  value,
  mode,
  onValueChange,
  onModeChange,
  tooltipText,
}) => {
  const isPercent = mode === MarginMode.PERCENT;

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
        <Input
          type="number"
          value={value}
          onChange={onValueChange}
          className="text-right"
          onFocus={(e) => e.target.select()}
        />
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => onModeChange(MarginMode.PERCENT)}
            className={`px-3 py-2 rounded-l-md text-sm font-semibold focus:z-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              isPercent ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            %
          </button>
          <button
            type="button"
            onClick={() => onModeChange(MarginMode.RUPIAH)}
            className={`px-3 py-2 rounded-r-md text-sm font-semibold focus:z-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              !isPercent ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Rp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarginInput;
