import { createServiceClient } from './src/lib/supabase/server';

async function test() {
    try {
        const supabase = createServiceClient();
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase.from('markets').select('*').limit(1);
        if (error) {
            console.error('Supabase Error:', error);
        } else {
            console.log('Supabase Success! Data:', data);
        }
    } catch (e) {
        console.error('Thrown Error:', e);
    }
}

test();
