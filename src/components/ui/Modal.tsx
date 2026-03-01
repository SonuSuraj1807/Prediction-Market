'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className={cn(
                    'relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl transition-colors duration-300',
                    'animate-in fade-in zoom-in-95 duration-200',
                    className
                )}
            >
                {title && (
                    <div className="flex items-center justify-between p-6 pb-0">
                        <h2 className="text-lg font-semibold text-text">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1 text-text-muted hover:text-text rounded-lg hover:bg-surface-raised transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
