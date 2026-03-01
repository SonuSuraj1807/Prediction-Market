'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'medium' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && ['light', 'medium', 'dark'].includes(savedTheme)) {
            setThemeState(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            // setThemeState('light'); // Keep dark as default unless user explicitly chose light before? 
            // Actually, let's just stick to dark as default for this app's "premium" feel.
        }
        setMounted(true);
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.setAttribute('data-theme', theme);
        // Also update the 'dark' utility class for tailwind's dark: variant if needed
        if (theme === 'dark' || theme === 'medium') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
