export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Terms of Service</h1>
                <p className="text-gray-400">Last updated: February 2026</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">1. Acceptence of Terms</h2>
                    <p className="text-gray-400">By accessing Eventix, you agree to be bound by these Terms of Service. This is a free-to-play prediction platform for entertainment purposes only.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">2. PRED Coins</h2>
                    <p className="text-gray-400">PRED coins are virtual units with no real-world monetary value. They cannot be withdrawn, sold, or transferred for real currency.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">3. Responsible Use</h2>
                    <p className="text-gray-400">Please use this platform responsibly. We reserve the right to ban accounts found using automated bots or exploiting bugs.</p>
                </section>

                <a href="/login" className="inline-block text-indigo-400 hover:underline">← Back to Login</a>
            </div>
        </div>
    );
}
