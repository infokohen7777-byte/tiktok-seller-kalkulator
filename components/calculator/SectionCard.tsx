import React from 'react';
import Card from '../ui/Card';

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => {
  return (
    <Card className="mb-6">
      <div className="flex items-center mb-4">
        <div className="text-cyan-600">{icon}</div>
        <h2 className="text-lg font-bold text-slate-800 ml-2">{title}</h2>
      </div>
      <div className="space-y-2">{children}</div>
    </Card>
  );
};

export default SectionCard;
