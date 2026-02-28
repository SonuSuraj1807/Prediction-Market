# Project Setup Commands for Prediction Market (Eventix)

Follow these terminal commands in order to get the project running on your local machine.

## 1. Initial Setup
Run these commands in your terminal (PowerShell or Bash) from the project root:

```bash
# Install all required Node.js dependencies
npm install

# Create your local environment file from the example
# For Mac/Linux/PowerShell/Git Bash:
cp .env.example .env.local

# For Windows Command Prompt (CMD):
copy .env.example .env.local
```
*Note: After running `cp`, open `.env.local` and fill in your Supabase credentials provided by the team.*

## 2. Running the Web Application
```bash
# Start the development server
npm run dev
```
The app will be available at: http://localhost:3000

## 3. Database Setup (Supabase)
If you need to sync the local database schema with Supabase:

```bash
# Login to Supabase CLI
npx supabase login

# Link to the project (you'll need the project ref from Supabase dashboard)
npx supabase link --project-ref <your-project-ref>

# Push migrations to your database
npx supabase db push
```

## 4. Mobile Setup (Android/iOS)
If you are working on the mobile version (Capacitor):

```bash
# Sync web assets and plugins with mobile platforms
npx cap sync

# Open the project in Android Studio (for Android)
npx cap open android

# Open the project in Xcode (for iOS - Mac only)
npx cap open ios
```

## 5. Testing & Linting
```bash
# Run unit tests
npm test

# Run linting to check for code style issues
npm run lint

# Run Playwright End-to-End tests
npx playwright test
```

## Common Issues & Fixes
- **If `npm install` fails**: Try `npm ci` for a clean install based on the lockfile.
- **Environment variables not loading**: Ensure `.env.local` is in the root directory and you have restarted the dev server after changes.
