export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
                <p className="text-gray-400">Last updated: February 2026</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">1. Data Collection</h2>
                    <p className="text-gray-400">We collect your email/phone number and display name for authentication purposes via Supabase.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">2. Usage Data</h2>
                    <p className="text-gray-400">We track your trades and performance to generate the global leaderboard and your profile statistics.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">3. Third Parties</h2>
                    <p className="text-gray-400">Your data is managed securely by Supabase. We do not sell your personal information to third parties.</p>
                </section>

                <a href="/login" className="inline-block text-indigo-400 hover:underline">← Back to Login</a>
            </div>
        </div>
    );
}
