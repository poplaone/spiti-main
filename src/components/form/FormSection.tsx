
import { ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  leftLabel?: string;
  rightLabel?: string;
  children: ReactNode;
}

const FormSection = ({ title, leftLabel, rightLabel, children }: FormSectionProps) => {
  return (
    <div className="space-y-2">
      {title && <h4 className="text-sm font-medium text-spiti-slate mb-2">{title}</h4>}
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between">
          {leftLabel && <span className="text-sm font-medium text-spiti-slate">{leftLabel}</span>}
          {rightLabel && <span className="text-sm font-medium text-spiti-slate">{rightLabel}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export default FormSection;
