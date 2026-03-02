import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/constants';
import { TrendingUp, Users, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ─── Hero Section: Focused on Product ──────────────── */}
        <section className="relative py-12 border-b border-border bg-gradient-to-b from-surface to-surface-raised/30">
          <div className="container-polymarket border-x border-border/50">
            <div className="max-w-4xl py-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[11px] font-bold text-primary uppercase tracking-widest mb-6">
                <Zap className="w-3.5 h-3.5" />
                Purely Virtual • 100% Free
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text mb-6 leading-[1.1]">
                Indian & Global Events <br />
                <span className="text-text-muted italic">Prediction Market</span>
              </h1>

              <p className="text-lg text-text-muted max-w-2xl mb-10 leading-relaxed font-medium">
                The world&apos;s most accurate forecasting platform using virtual <span className="text-text font-bold">PRED</span> coins. Trade on outcomes you understand.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/markets"
                  className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  Trade Now
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3 bg-surface-raised border border-border text-text-muted rounded-xl text-sm font-bold hover:bg-surface-higher transition-all"
                >
                  Join the Community
                </Link>
              </div>
            </div>

            {/* Top Market Quick Grid (Row of dense cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-12 border-t border-border/50">
              {[
                { label: 'Total Volume', value: '1.2M PRED', icon: TrendingUp, color: 'text-rose-500' },
                { label: 'Active Traders', value: '12.4k', icon: Users, color: 'text-primary' },
                { label: 'Open Markets', value: '450+', icon: Globe, color: 'text-emerald-500' },
                { label: 'Last Resolution', value: '2h ago', icon: Zap, color: 'text-amber-500' },
              ].map((stat) => (
                <div key={stat.label} className="card-modern p-4 flex items-center gap-3 bg-surface/50">
                  <div className={`p-2 rounded-lg bg-surface-raised border border-border ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
                    <div className="text-sm font-bold text-text">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Markets Discovery ─────────────────────── */}
        <section className="py-16 bg-surface">
          <div className="container-polymarket">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Featured Markets Section */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-text tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Featured Markets
                  </h2>
                  <Link href="/markets" className="text-sm font-bold text-primary hover:underline">
                    View All Markets →
                  </Link>
                </div>

                {/* Note: In a real app we'd fetch these, but for the landing we can show the top ones from the grid */}
                <div className="bg-surface-raised/30 rounded-3xl p-6 border border-border/50">
                  {/* Empty state or list would go here, using specialized compact cards for Landing */}
                  <div className="text-center py-12 space-y-4">
                    <p className="text-sm text-text-muted font-medium">Loading live liquidity data...</p>
                    <Link href="/markets" className="inline-block px-6 py-2 bg-surface text-xs font-bold uppercase tracking-widest border border-border rounded-lg hover:border-primary transition-all">
                      Browse Full List
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar Feature: Why PRED? */}
              <aside className="w-full lg:w-80 space-y-6">
                <div className="card-modern p-6 space-y-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                  <h3 className="text-sm font-bold text-text uppercase tracking-wider">The PRED Advantage</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Purely Virtual', desc: 'No financial risk. Earn PRED by being right.' },
                      { title: 'Indian Focus', desc: 'Localized markets for Indian events & sports.' },
                      { title: 'Global Outlook', desc: 'Trade on global macro and tech trends.' },
                    ].map((f) => (
                      <div key={f.title} className="space-y-1">
                        <div className="text-xs font-bold text-primary">{f.title}</div>
                        <p className="text-[11px] text-text-muted leading-relaxed font-medium">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full text-xs py-2 h-auto" variant="secondary">Learn More</Button>
                </div>

                <div className="card-modern p-6 space-y-3">
                  <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Global Stats</h3>
                  <div className="flex justify-between items-center text-xs font-bold px-1">
                    <span className="text-text-muted">Stability</span>
                    <span className="text-emerald-400">99.9%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-higher rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99.9%] shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ─── Footer CTA ───────────────────────────── */}
        <section className="py-24 border-t border-border bg-surface-raised/20">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl font-bold text-text tracking-tight">
              Ready to challenge the consensus?
            </h2>
            <p className="text-text-muted font-medium leading-relaxed">
              Join {APP_NAME} today and get 1,000 free PRED coins to start trading on the events you care about. No real money required, ever.
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 bg-primary text-white rounded-2xl text-lg font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
