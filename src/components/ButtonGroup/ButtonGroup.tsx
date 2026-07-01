import React from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import './ButtonGroup.css';

export interface ButtonGroupProps {
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Array of button configurations */
  buttons: Array<ButtonProps>;
  /** Accessible label for the group */
  ariaLabel?: string;
  /** Additional CSS class */
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  orientation = 'horizontal',
  buttons,
  ariaLabel,
  className = '',
}) => {
  return (
    <div
      className={`ds-button-group ds-button-group--${orientation} ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          priority={button.priority || 'tertiary'}
          state={button.state || 'default'}
          label={button.label}
          iconLeft={button.iconLeft}
          iconRight={button.iconRight}
          icon={button.icon}
          onClick={button.onClick}
          href={button.href}
          ariaCurrent={button.ariaCurrent}
        />
      ))}
    </div>
  );
};
