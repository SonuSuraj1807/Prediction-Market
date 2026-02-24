import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { TrendingUp, Shield, Users, BarChart3, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ─── Hero Section ──────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-300 mb-8 animate-fade-in">
              <Zap className="w-4 h-4" />
              Free to Play — No Real Money
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-white">Predict the</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Future of Events
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Trade on elections, sports, tech, and more using virtual PRED coins.
              Compete on leaderboards. Prove your prediction skills.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 animate-pulse-glow"
              >
                Start Predicting — It&apos;s Free
              </Link>
              <Link
                href="/markets"
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-2xl text-lg font-medium hover:bg-gray-800 hover:border-gray-600 transition-all"
              >
                Browse Markets
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div>
                <div className="text-3xl font-bold text-white">1,000</div>
                <div className="text-sm text-gray-500">Free PRED Coins</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">7+</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-500">Markets</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works ─────────────────────────── */}
        <section className="py-24 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Pick a Market',
                  description: 'Browse predictions across economy, sports, tech, climate, and more.',
                  icon: Globe,
                },
                {
                  step: '02',
                  title: 'Buy YES or NO',
                  description: 'Use your PRED coins to buy shares based on your prediction.',
                  icon: BarChart3,
                },
                {
                  step: '03',
                  title: 'Win & Climb',
                  description: 'When the event resolves, winners earn payouts and climb the leaderboard.',
                  icon: TrendingUp,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative p-8 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <span className="absolute top-6 right-6 text-5xl font-bold text-gray-800 group-hover:text-indigo-900/30 transition-colors">
                    {item.step}
                  </span>
                  <item.icon className="w-10 h-10 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features ─────────────────────────────── */}
        <section className="py-24 border-t border-gray-800 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              Why {APP_NAME}?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Free & Legal', desc: 'No real money. Classified as an online social game under Indian law.' },
                { icon: Zap, title: 'Instant Trading', desc: 'Automated market maker gives you instant liquidity. No waiting for counterparties.' },
                { icon: Users, title: 'Compete Globally', desc: 'Leaderboards ranked by prediction accuracy. Prove you\'re the best forecaster.' },
                { icon: BarChart3, title: 'Real-Time Prices', desc: 'Watch prices move in real-time as other traders make their predictions.' },
                { icon: TrendingUp, title: 'Daily Free Coins', desc: 'Get 50 free PRED coins every day. Plus bonus coins for referrals.' },
                { icon: Globe, title: 'Global Markets', desc: 'Predict events in India, USA, Europe, Asia — or global outcomes.' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-800/30 transition-colors"
                >
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────── */}
        <section className="py-24 border-t border-gray-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to test your predictions?
            </h2>
            <p className="text-gray-400 mb-8">
              Join {APP_NAME} today and get 1,000 free PRED coins to start trading.
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl shadow-indigo-500/20"
            >
              Get Started — Free Forever
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
