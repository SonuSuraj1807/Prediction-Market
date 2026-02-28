
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const MKT = [
    // --- SPORTS ---
    { id: 1, cat: "Tennis", t: "Australian Open 2026 Winner", y: 100, v: 820, tr: 31e3, tag: "AUS OPEN", h: 0, i: "🎾", s: "resolved_yes", pk: "Sinner ✅", ph: "past", ex: "Feb 2026", reg: "global" },
    { id: 2, cat: "Cricket", t: "Did CSK win IPL 2025?", y: 100, v: 890, tr: 92e3, tag: "IPL 2025", h: 0, i: "🏏", s: "resolved_yes", pk: "CSK ✅", ph: "past", ex: "2025", reg: "india" },
    { id: 3, cat: "Football", t: "Did Real Madrid win UCL 2024-25?", y: 0, v: 1200, tr: 54e3, tag: "UCL", h: 0, i: "⚽", s: "resolved_no", pk: "No — Barca won", ph: "past", ex: "2025", reg: "global" },
    { id: 4, cat: "F1", t: "F1 2025 Champion", y: 100, v: 680, tr: 28e3, tag: "F1", h: 0, i: "🏎️", s: "resolved_yes", pk: "Norris ✅", ph: "past", ex: "2025", reg: "global" },
    { id: 5, cat: "Cricket", t: "India Women T20 WC 2025?", y: 100, v: 340, tr: 45e3, tag: "CRICKET", h: 0, i: "🏏", s: "resolved_yes", pk: "India W ✅", ph: "past", ex: "2025", reg: "india" },
    { id: 20, cat: "Olympics", t: "Winter Olympics 2026 — Most Golds", y: 28, v: 920, tr: 52e3, tag: "OLYMPICS", h: 1, i: "🥇", s: "active", pk: "Norway 28%", ph: "now", ex: "22 Feb 2026", reg: "global" },
    { id: 21, cat: "Cricket", t: "ICC T20 World Cup 2026 Winner", y: 32, v: 1850, tr: 128e3, tag: "T20 WC", h: 1, i: "🏏", s: "active", pk: "India 32%", ph: "now", ex: "8 Mar 2026", reg: "global" },
    { id: 22, cat: "Cricket", t: "Will India win T20 WC 2026?", y: 32, v: 2100, tr: 185e3, tag: "T20 WC", h: 1, i: "🏏", s: "active", pk: "Yes 32%", ph: "now", ex: "8 Mar 2026", reg: "india" },
    { id: 23, cat: "Football", t: "EPL Winner 2025-26", y: 59, v: 1490, tr: 48e3, tag: "EPL", h: 1, i: "⚽", s: "active", pk: "Arsenal 59%", ph: "now", ex: "May 2026", reg: "global" },
    { id: 24, cat: "Basketball", t: "2026 NBA Champion", y: 46, v: 1160, tr: 62e3, tag: "NBA", h: 1, i: "🏀", s: "active", pk: "OKC Thunder 46%", ph: "now", ex: "Jun 2026", reg: "usa" },
    { id: 25, cat: "NFL", t: "Super Bowl LX Champion", y: 14, v: 6410, tr: 89e3, tag: "NFL", h: 1, i: "🏈", s: "active", pk: "Seattle 14%", ph: "now", ex: "Mar 2026", reg: "usa" },
    { id: 26, cat: "Football", t: "UCL Winner 2025-26", y: 19, v: 1560, tr: 42e3, tag: "UCL", h: 1, i: "🏆", s: "active", pk: "Arsenal 19%", ph: "now", ex: "May 2026", reg: "global" },
    { id: 27, cat: "Cricket", t: "Will Kohli retire from T20Is?", y: 35, v: 125, tr: 28e3, tag: "CRICKET", h: 1, i: "🏏", s: "active", pk: "Yes 35%", ph: "now", ex: "Dec 2026", reg: "india" },
    { id: 50, cat: "Cricket", t: "IPL 2026 Winner", y: 22, v: 520, tr: 78e3, tag: "IPL 2026", h: 1, i: "🏏", s: "active", pk: "CSK 22%", ph: "up", ex: "May 2026", reg: "india" },
    { id: 51, cat: "Cricket", t: "IPL 2026 Top Scorer", y: 18, v: 95, tr: 22e3, tag: "IPL 2026", h: 0, i: "🏏", s: "active", pk: "Kohli 18%", ph: "up", ex: "May 2026", reg: "india" },
    { id: 52, cat: "F1", t: "F1 2026 Championship Winner", y: 28, v: 85, tr: 12e3, tag: "F1 2026", h: 0, i: "🏎️", s: "active", pk: "Norris 28%", ph: "up", ex: "Dec 2026", reg: "global" },
    { id: 53, cat: "F1", t: "Will Hamilton win a race for Ferrari?", y: 42, v: 65, tr: 15e3, tag: "F1", h: 1, i: "🏎️", s: "active", pk: "Yes 42%", ph: "up", ex: "Dec 2026", reg: "global" },
    { id: 54, cat: "Football", t: "2026 FIFA World Cup Winner", y: 16, v: 3900, tr: 134e3, tag: "FIFA WC", h: 1, i: "🌍", s: "active", pk: "Spain 16%", ph: "up", ex: "Jul 2026", reg: "global" },
    { id: 55, cat: "Football", t: "Will Messi play in FIFA WC 2026?", y: 52, v: 420, tr: 65e3, tag: "FIFA WC", h: 1, i: "⚽", s: "active", pk: "Yes 52%", ph: "up", ex: "Jul 2026", reg: "global" },
    { id: 56, cat: "Tennis", t: "French Open 2026 Winner", y: 28, v: 52, tr: 9200, tag: "TENNIS", h: 0, i: "🎾", s: "active", pk: "Alcaraz 28%", ph: "up", ex: "Jun 2026", reg: "global" },
    { id: 57, cat: "Tennis", t: "Wimbledon 2026 Winner", y: 30, v: 48, tr: 8100, tag: "TENNIS", h: 0, i: "🎾", s: "active", pk: "Sinner 30%", ph: "up", ex: "Jul 2026", reg: "global" },
    { id: 58, cat: "Cricket", t: "Women's T20 WC 2026 Winner", y: 24, v: 180, tr: 21e3, tag: "W T20 WC", h: 0, i: "🏏", s: "active", pk: "India W 24%", ph: "up", ex: "Jul 2026", reg: "global" },
    { id: 59, cat: "Multi-Sport", t: "CWG 2026 — India Top 4?", y: 45, v: 95, tr: 18e3, tag: "CWG", h: 0, i: "🏅", s: "active", pk: "Yes 45%", ph: "up", ex: "Aug 2026", reg: "india" },
    { id: 60, cat: "Multi-Sport", t: "Asian Games 2026 — India 20+ Golds?", y: 40, v: 110, tr: 15e3, tag: "ASIAN GAMES", h: 0, i: "🏅", s: "active", pk: "Yes 40%", ph: "up", ex: "Oct 2026", reg: "india" },
    { id: 61, cat: "UFC", t: "UFC Bantamweight Champ end 2026", y: 39, v: 45, tr: 8900, tag: "UFC", h: 0, i: "🥊", s: "active", pk: "Yan 39%", ph: "up", ex: "Dec 2026", reg: "global" },
    { id: 62, cat: "Kabaddi", t: "PKL Season 11 Winner", y: 24, v: 45, tr: 12e3, tag: "PKL", h: 0, i: "💪", s: "active", pk: "Puneri 24%", ph: "up", ex: "Mar 2026", reg: "india" },
    { id: 63, cat: "Esports", t: "Valorant Champions 2026", y: 20, v: 18, tr: 4500, tag: "ESPORTS", h: 0, i: "🎮", s: "active", pk: "Sentinels 20%", ph: "up", ex: "Aug 2026", reg: "global" },

    // --- ECONOMY ---
    { id: 100, cat: "Economy", t: "Will Nifty 50 cross 30,000 by end of 2026?", y: 65, v: 4500, tr: 85e3, tag: "STOCKS", h: 1, i: "📈", s: "active", pk: "Yes 65%", ph: "now", ex: "Dec 2026", reg: "india" },
    { id: 101, cat: "Economy", t: "Will RBI cut Interest Rates in Next Meeting?", y: 42, v: 1200, tr: 22e3, tag: "FINANCE", h: 0, i: "🏦", s: "active", pk: "Yes 42%", ph: "now", ex: "Apr 2026", reg: "india" },
    { id: 102, cat: "Economy", t: "Will India's GDP growth exceed 7% in FY26?", y: 72, v: 3800, tr: 65e3, tag: "GDP", h: 1, i: "🇮🇳", s: "active", pk: "Yes 72%", ph: "now", ex: "Mar 2026", reg: "india" },

    // --- TECH ---
    { id: 103, cat: "Tech", t: "Will GPT-5 be released before December 2026?", y: 78, v: 8200, tr: 120e3, tag: "AI", h: 1, i: "🤖", s: "active", pk: "Yes 78%", ph: "now", ex: "Dec 2026", reg: "global" },
    { id: 104, cat: "Tech", t: "Will Apple release Vision Pro 2 in 2026?", y: 35, v: 2500, tr: 45e3, tag: "APPLE", h: 0, i: "👓", s: "active", pk: "Yes 35%", ph: "now", ex: "Sep 2026", reg: "global" },
    { id: 105, cat: "Tech", t: "Will SpaceX Land Starship on Mars by end of 2026?", y: 12, v: 15000, tr: 250e3, tag: "SPACE", h: 1, i: "🚀", s: "active", pk: "Yes 12%", ph: "now", ex: "Dec 2026", reg: "global" },

    // --- CLIMATE ---
    { id: 106, cat: "Climate", t: "Will 2026 be the Hottest Year on Record?", y: 82, v: 5400, tr: 95e3, tag: "CLIMATE", h: 1, i: "🌡️", s: "active", pk: "Yes 82%", ph: "now", ex: "Dec 2026", reg: "global" },
    { id: 107, cat: "Climate", t: "Will COP31 be hosted in Australia?", y: 55, v: 1800, tr: 12e3, tag: "COP31", h: 0, i: "🌏", s: "active", pk: "Yes 55%", ph: "now", ex: "Nov 2026", reg: "global" },

    // --- POLICY ---
    { id: 108, cat: "Policy", t: "Will India implement One Nation One Election in 2026?", y: 25, v: 6800, tr: 150e3, tag: "POLITICS", h: 1, i: "🗳️", s: "active", pk: "Yes 25%", ph: "now", ex: "Dec 2026", reg: "india" },
    { id: 109, cat: "Policy", t: "Will the US pass a major AI Regulation bill in 2026?", y: 68, v: 4200, tr: 75e3, tag: "US POLICY", h: 0, i: "🇺🇸", s: "active", pk: "Yes 68%", ph: "now", ex: "Dec 2026", reg: "usa" },

    // --- GLOBAL ---
    { id: 110, cat: "Global", t: "Will a ceasefire be reached in Ukraine by end of 2026?", y: 15, v: 9200, tr: 210e3, tag: "GLOBAL", h: 1, i: "🕊️", s: "active", pk: "Yes 15%", ph: "now", ex: "Dec 2026", reg: "global" },
    { id: 111, cat: "Global", t: "Will a G20 member country declare a sovereign default in 2026?", y: 8, v: 3400, tr: 42e3, tag: "INTERNATIONAL", h: 0, i: "🏳️‍🌈", s: "active", pk: "Yes 8%", ph: "now", ex: "Dec 2026", reg: "global" },

    // --- ENTERTAINMENT ---
    { id: 112, cat: "Entertainment", t: "Will GTA VI be delayed to 2027?", y: 45, v: 12000, tr: 350e3, tag: "GAMING", h: 1, i: "🎮", s: "active", pk: "Yes 45%", ph: "now", ex: "Late 2026", reg: "global" },
    { id: 113, cat: "Entertainment", t: "Who will win Best Picture at Oscars 2026?", y: 12, v: 4200, tr: 89e3, tag: "MOVIES", h: 0, i: "🎬", s: "active", pk: "Dune: Part 3 12%", ph: "now", ex: "Mar 2026", reg: "global" },
    { id: 114, cat: "Entertainment", t: "Will Taylor Swift announce a new Eras-style tour in 2026?", y: 62, v: 9500, tr: 180e3, tag: "MUSIC", h: 1, i: "🎤", s: "active", pk: "Yes 62%", ph: "now", ex: "Dec 2026", reg: "global" },
];

const CATEGORY_MAP: Record<string, string> = {
    "Economy": "economy",
    "Tech": "tech",
    "Climate": "climate",
    "Policy": "policy",
    "Global": "global",
    "Entertainment": "entertainment",
    // Sports sub-categories
    "Tennis": "sports",
    "Cricket": "sports",
    "Football": "sports",
    "F1": "sports",
    "Olympics": "sports",
    "Basketball": "sports",
    "NFL": "sports",
    "Multi-Sport": "sports",
    "UFC": "sports",
    "Kabaddi": "sports",
    "Esports": "sports"
};

async function seed() {
    console.log('Starting seed...');

    // 1. Get or Create Admin User
    let { data: admin, error: adminError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'admin')
        .limit(1)
        .single();

    if (adminError || !admin) {
        console.log('No admin found, creating mock admin...');
        const { data: newAdmin, error: createError } = await supabase
            .from('users')
            .insert({
                display_name: 'System Admin',
                email: 'admin@eventix.in',
                role: 'admin',
                balance: 1000000
            })
            .select('id')
            .single();

        if (createError) {
            console.error('Failed to create admin:', createError);
            return;
        }
        admin = newAdmin;
    }

    console.log('Using Admin ID:', admin.id);

    // 2. Prepare Markets
    const marketsToInsert = MKT.map(m => ({
        title: m.t,
        category: CATEGORY_MAP[m.cat] || 'global',
        region: (m as any).reg || 'global',
        tag: m.tag,
        flag: m.i,
        yes_pool: m.v * 50,
        no_pool: (m.v * 100) - (m.v * 50),
        yes_price: Math.max(1, Math.min(99, m.y || 50)),
        total_volume: m.v * 100,
        trader_count: Math.floor(m.tr / 10),
        status: m.s === 'active' ? 'open' : 'resolved',
        resolution: m.s === 'resolved_yes' ? 'YES' : m.s === 'resolved_no' ? 'NO' : null,
        resolves_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: admin!.id,
        is_featured: m.h === 1
    }));

    // 3. Clear existing mock markets (optional, but good for re-runs)
    console.log('Clearing old mock markets...');
    await supabase.from('markets').delete().eq('created_by', admin.id);

    // 4. Insert Markets
    const { data, error } = await supabase
        .from('markets')
        .insert(marketsToInsert)
        .select();

    if (error) {
        console.error('Error inserting markets:', error);
    } else {
        console.log(`Successfully seeded ${data.length} markets!`);
    }
}

seed();
