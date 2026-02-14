import React from 'react';
import { Button, ButtonProps } from '../Button/Button';
import './ButtonGroup.css';

export interface ButtonGroupProps {
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Array of button configurations */
  buttons: Array<{
    label: string;
    icon?: string;
    onClick?: () => void;
  } & Omit<ButtonProps, 'children'>>;
  /** Additional CSS class */
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  orientation = 'horizontal',
  buttons,
  className = '',
}) => {
  return (
    <div
      className={`ds-button-group ds-button-group--${orientation} ${className}`}
      role="group"
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'secondary'}
          state={button.state || 'default'}
          onClick={button.onClick}
        >
          {button.icon && (
            <span className="material-symbols-rounded">{button.icon}</span>
          )}
          {button.label}
        </Button>
      ))}
    </div>
  );
};
