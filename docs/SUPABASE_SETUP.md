# Supabase Setup Guide for Eventix

Follow these steps to set up your Supabase project and connect it to the Eventix application.

## 1. Create a Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project** and select your organization.
3. Enter a project name (e.g., `Eventix`) and a strong database password.
4. Select the region closest to your users (e.g., `South Asia (Mumbai)` for India).
5. Click **Create new project**.

## 2. Configure Environment Variables
1. Once the project is ready, go to **Project Settings** > **API**.
2. Copy the following values and paste them into a new file named `.env.local` in the root of your project:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` (Project API Key) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to **Project Settings** > **API** and find the `service_role` key (keep this secret!).
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

Example `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Run Database Migrations
You need to apply the schema and functions to your database.
1. Go to the **SQL Editor** in the Supabase Dashboard.
2. Click **New query**.
3. Open the files in your local `supabase/migrations/` folder in order (`001`, `002`, etc.).
4. Copy the content of each file and run it in the SQL Editor.
   - *Alternately*, if you have the [Supabase CLI](https://supabase.com/docs/guides/cli) installed:
     ```bash
     supabase login
     supabase link --project-ref your-project-id
     supabase db push
     ```

## 4. Set Up Authentication
1. Go to **Authentication** > **Providers**.
2. **Email**: Ensure it is enabled.
3. **Google**:
   - Toggle to **Enabled**.
   - You will need a **Client ID** and **Client Secret**. Follow the **[Google Cloud Setup Guide](./GOOGLE_CLOUD_SETUP.md)** to get these.
   - In Google Cloud Console, add the **Callback URL** provided by Supabase (it looks like `https://your-project.supabase.co/auth/v1/callback`).
4. **URL Configuration**:
   - Under **Authentication** > **URL Configuration**, set the `Site URL` to `http://localhost:3000`.
   - Add `http://localhost:3000/**` to the **Redirect URLs** list.

## 5. Start Development
Now that the database is ready and connected, you can run the app locally:
```bash
npm install
npm run dev
```

The app should now be able to communicate with your Supabase backend!
