import { clsx, type ClassValue } from 'clsx';

/**
 * Merge Tailwind class names conditionally.
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Format virtual currency amount.
 */
export function formatPred(amount: number): string {
    return `${amount.toLocaleString()} PRED`;
}

/**
 * Format probability as percentage.
 */
export function formatPercent(value: number): string {
    return `${value}%`;
}

/**
 * Format date for display.
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Format relative time (e.g., "2 hours ago").
 */
export function formatRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 30) return `${diffDay}d ago`;
    return formatDate(dateString);
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}

/**
 * Category display labels & emoji.
 */
export const CATEGORY_DISPLAY: Record<string, { label: string; emoji: string }> = {
    politics: { label: 'Politics', emoji: '🏛️' },
    sports: { label: 'Sports', emoji: '🏆' },
    crypto: { label: 'Crypto', emoji: '🪙' },
    finance: { label: 'Finance', emoji: '💰' },
    geopolitics: { label: 'Geopolitics', emoji: '🌏' },
    tech: { label: 'Tech', emoji: '💻' },
    entertainment: { label: 'Entertainment', emoji: '🎬' },
};

/**
 * Region display labels & flags.
 */
export const REGION_DISPLAY: Record<string, { label: string; flag: string }> = {
    india: { label: 'India', flag: '🇮🇳' },
    usa: { label: 'USA', flag: '🇺🇸' },
    europe: { label: 'Europe', flag: '🇪🇺' },
    asia: { label: 'Asia', flag: '🌏' },
    global: { label: 'Global', flag: '🌐' },
};

/**
 * Get base URL for tRPC client.
 */
export function getBaseUrl() {
    if (typeof window !== 'undefined') return ''; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}
