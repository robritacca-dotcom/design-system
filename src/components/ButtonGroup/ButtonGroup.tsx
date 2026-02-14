import React from 'react';
import { Button, ButtonProps } from '../Button/Button';
import './ButtonGroup.css';

export interface ButtonGroupProps {
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Array of button configurations */
  buttons: Array<ButtonProps>;
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
          priority={button.priority || 'secondary'}
          state={button.state || 'default'}
          label={button.label}
          iconLeft={button.iconLeft}
          iconRight={button.iconRight}
          icon={button.icon}
          iconStyle={button.iconStyle}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};
