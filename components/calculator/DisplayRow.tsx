import React from 'react';
import { HelpCircle } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface DisplayRowProps {
  label: string;
  value: string | number;
  tooltipText?: string;
  valueColor?: string;
}

const DisplayRow: React.FC<DisplayRowProps> = ({ label, value, tooltipText, valueColor }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100">
      <div className="flex items-center">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        {tooltipText && (
          <Tooltip text={tooltipText}>
            <HelpCircle size={14} className="ml-1.5 text-slate-400 cursor-help" />
          </Tooltip>
        )}
      </div>
      <span className={`text-sm font-semibold text-slate-800 ${valueColor}`}>
        {value}
      </span>
    </div>
  );
};

export default DisplayRow;
