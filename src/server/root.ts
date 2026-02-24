import { router } from './trpc';
import { authRouter } from './routers/auth';
import { marketRouter } from './routers/market';
import { tradeRouter } from './routers/trade';

/**
 * Root tRPC router — combines all sub-routers.
 * Add new routers here as they're created.
 */
export const appRouter = router({
    auth: authRouter,
    market: marketRouter,
    trade: tradeRouter,
});

export type AppRouter = typeof appRouter;
