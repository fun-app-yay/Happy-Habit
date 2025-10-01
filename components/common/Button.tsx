import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large' | 'icon';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'medium', className = '', ...props }) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-sage-green text-white hover:bg-sage-green/90 focus:ring-sage-green',
    secondary: 'bg-light-sky-blue text-dusty-blue hover:bg-light-sky-blue/80 focus:ring-dusty-blue',
    danger: 'bg-dusty-rose text-white hover:bg-dusty-rose/90 focus:ring-dusty-rose',
  };

  const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
      icon: 'p-3'
  };
  
  const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
  ].join(' ');

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;