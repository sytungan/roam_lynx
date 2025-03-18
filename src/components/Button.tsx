import type { ReactNode } from '@lynx-js/react';

export interface ButtonProps {
  onTap?: () => void;
  text?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({
  onTap,
  text,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  // Generate style classes based on props
  const getButtonClasses = () => {
    const classes = ['button'];
    
    // Variant styling
    classes.push(`button-${variant}`);
    
    // Size styling
    classes.push(`button-${size}`);
    
    // Disabled state
    if (disabled) {
      classes.push('button-disabled');
    }
    
    // Full width
    if (fullWidth) {
      classes.push('button-full-width');
    }
    
    // Custom classes
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <view 
      className={getButtonClasses()}
      bindtap={disabled ? undefined : onTap}
    >
      <text className="button-text">{text || children}</text>
    </view>
  );
}; 