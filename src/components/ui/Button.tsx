import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'yes' | 'no';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed',
                    // Variants
                    variant === 'primary' && 'bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-lg shadow-primary/20',
                    variant === 'secondary' && 'bg-surface-raised text-text border border-border hover:bg-surface-higher focus:ring-text-muted',
                    variant === 'ghost' && 'text-text-muted hover:text-text hover:bg-surface-raised focus:ring-text-muted',
                    variant === 'destructive' && 'bg-red-600/20 text-red-400 border border-red-800/50 hover:bg-red-600/30 focus:ring-red-500',
                    variant === 'yes' && 'bg-emerald-600/20 text-emerald-400 border border-emerald-700/50 hover:bg-emerald-600/30 focus:ring-emerald-500',
                    variant === 'no' && 'bg-rose-600/20 text-rose-400 border border-rose-700/50 hover:bg-rose-600/30 focus:ring-rose-500',
                    // Sizes
                    size === 'sm' && 'px-3 py-1.5 text-sm',
                    size === 'md' && 'px-4 py-2.5 text-sm',
                    size === 'lg' && 'px-6 py-3 text-base',
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
export { Button };
