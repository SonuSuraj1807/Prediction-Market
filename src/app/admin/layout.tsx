import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-surface transition-colors">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-border p-6 flex flex-col gap-6 bg-surface-raised/50 backdrop-blur-xl">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
                        E
                    </div>
                    <span className="text-xl font-bold tracking-tight text-text">Eventix Admin</span>
                </div>

                <nav className="flex flex-col gap-1">
                    <Link
                        href="/admin/markets"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-primary text-white shadow-md"
                    >
                        Markets
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-text-muted hover:text-text hover:bg-surface-higher"
                    >
                        Users
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 mt-auto rounded-lg text-sm font-medium transition-colors text-text-muted hover:text-text hover:bg-surface-higher"
                    >
                        Exit to App
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-border flex items-center px-8 bg-surface/50 transition-colors">
                    <h1 className="text-sm font-medium text-text-muted uppercase tracking-widest">Administration</h1>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
