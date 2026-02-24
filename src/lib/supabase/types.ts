/**
 * Auto-generated database types.
 * In production, regenerate with: npx supabase gen types typescript --linked > src/lib/supabase/types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    phone: string | null;
                    email: string | null;
                    display_name: string;
                    avatar_url: string | null;
                    balance: number;
                    accuracy_score: number;
                    total_trades: number;
                    total_profit: number;
                    rank: number | null;
                    role: 'user' | 'admin' | 'moderator';
                    is_banned: boolean;
                    last_daily_topup: string | null;
                    referral_code: string;
                    referred_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at' | 'referral_code'> & {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    referral_code?: string;
                };
                Update: Partial<Database['public']['Tables']['users']['Insert']>;
            };
            markets: {
                Row: {
                    id: string;
                    title: string;
                    description: string | null;
                    category: 'economy' | 'sports' | 'tech' | 'climate' | 'policy' | 'global' | 'entertainment';
                    region: 'india' | 'usa' | 'europe' | 'asia' | 'global';
                    flag: string | null;
                    tag: string | null;
                    resolution_source: string | null;
                    yes_pool: number;
                    no_pool: number;
                    yes_price: number;
                    total_volume: number;
                    trader_count: number;
                    created_by: string;
                    resolves_at: string;
                    resolved_at: string | null;
                    resolution: 'YES' | 'NO' | 'CANCELLED' | null;
                    status: 'open' | 'closed' | 'resolved';
                    is_featured: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['markets']['Row'], 'id' | 'created_at' | 'updated_at'> & {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database['public']['Tables']['markets']['Insert']>;
            };
            positions: {
                Row: {
                    id: string;
                    user_id: string;
                    market_id: string;
                    side: 'YES' | 'NO';
                    shares: number;
                    avg_price: number;
                    total_cost: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['positions']['Row'], 'id' | 'created_at' | 'updated_at'> & {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database['public']['Tables']['positions']['Insert']>;
            };
            trades: {
                Row: {
                    id: string;
                    user_id: string;
                    market_id: string;
                    side: 'YES' | 'NO';
                    action: 'buy' | 'sell';
                    shares: number;
                    price: number;
                    cost: number;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['trades']['Row'], 'id' | 'created_at'> & {
                    id?: string;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['trades']['Insert']>;
            };
            comments: {
                Row: {
                    id: string;
                    market_id: string;
                    user_id: string;
                    body: string;
                    is_flagged: boolean;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at'> & {
                    id?: string;
                    created_at?: string;
                };
                Update: Partial<Database['public']['Tables']['comments']['Insert']>;
            };
        };
        Views: {
            leaderboard: {
                Row: {
                    user_id: string;
                    display_name: string;
                    avatar_url: string | null;
                    accuracy_score: number;
                    total_profit: number;
                    total_trades: number;
                    rank: number;
                };
            };
        };
        Functions: {
            execute_trade: {
                Args: {
                    p_user_id: string;
                    p_market_id: string;
                    p_side: string;
                    p_amount: number;
                };
                Returns: Json;
            };
            execute_sell: {
                Args: {
                    p_user_id: string;
                    p_market_id: string;
                    p_side: string;
                    p_shares: number;
                };
                Returns: Json;
            };
            resolve_market: {
                Args: {
                    p_market_id: string;
                    p_resolution: string;
                    p_admin_id: string;
                };
                Returns: Json;
            };
            refresh_leaderboard: {
                Args: Record<string, never>;
                Returns: void;
            };
        };
    };
}
