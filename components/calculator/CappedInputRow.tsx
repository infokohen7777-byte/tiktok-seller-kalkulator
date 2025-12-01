import React from 'react';
import { HelpCircle } from 'lucide-react';
import Input from '../ui/Input';
import Tooltip from '../ui/Tooltip';

interface CappedInputRowProps {
  label: string;
  tooltipText?: string;
  percentValue: number;
  onPercentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  capValue: number;
  onCapChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculatedValue?: string | React.ReactNode;
}

const CappedInputRow: React.FC<CappedInputRowProps> = ({
  label,
  tooltipText,
  percentValue,
  onPercentChange,
  capValue,
  onCapChange,
  calculatedValue,
}) => {
  const displayCapValue = capValue >= 999999999 ? '' : capValue;

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
      <div className="grid grid-cols-3 gap-2 items-center">
        <div className="relative col-span-1">
          <Input
            type="number"
            value={percentValue}
            onChange={onPercentChange}
            className="text-right pr-6"
            onFocus={(e) => e.target.select()}
            step="0.1"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
        </div>
        <div className="relative col-span-1">
            <Input
                type="number"
                value={displayCapValue}
                onChange={onCapChange}
                placeholder="Max"
                className="text-right pr-6"
                onFocus={(e) => e.target.select()}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">Rp</span>
        </div>
        <div className="col-span-1 text-right text-sm text-slate-600 font-medium">
          {calculatedValue}
        </div>
      </div>
    </div>
  );
};

export default CappedInputRow;
