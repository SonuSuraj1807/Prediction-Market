# Google Cloud Console Setup Guide

This guide will help you create a Google Cloud project and set up the OAuth 2.0 credentials required for Google Login in your Supabase project.

## 1. Create a New Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the **Project Dropdown** at the top left (next to "Google Cloud") and select **New Project**.
3. Enter a **Project Name** (e.g., `Eventix-Auth`) and click **Create**.
4. Once created, ensure your new project is selected in the top dropdown.

## 2. Configure OAuth Consent Screen
Before creating credentials, you must configure the consent screen your users will see.
1. Go to **APIs & Services** > **OAuth consent screen** via the sidebar.
2. Select **External** as the User Type and click **Create**.
3. Fill in the **App Information**:
   - **App name**: `Eventix` (or your chosen name)
   - **User support email**: Your email address
   - **Developer contact info**: Your email address
4. Click **Save and Continue** (you can skip Scopes and Test Users for now by clicking "Save and Continue" on those screens too).
5. On the Summary screen, click **Back to Dashboard**.
6. **IMPORTANT**: Click **Publish App** under "Testing" and confirm. This moves the app to production mode so logins work for everyone.

## 3. Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials** via the sidebar.
2. Click **+ Create Credentials** at the top and select **OAuth client ID**.
3. Select **Web application** as the Application type.
4. Name it (e.g., `Eventix Supabase Client`).
5. **Authorized JavaScript origins**:
   - Add your local URL: `http://localhost:3000`
6. **Authorized redirect URIs**:
   - Add the **Callback URL** provided by Supabase. You can find this in your Supabase Dashboard under **Authentication** > **Providers** > **Google**.
   - It will look like: `https://your-project.supabase.co/auth/v1/callback`
7. Click **Create**.

## 4. Get Your Credentials
1. A dialog will appear with your **Client ID** and **Client Secret**.
2. Copy these values.
3. Go to your **Supabase Dashboard** > **Authentication** > **Providers** > **Google**.
4. Paste the **Client ID** and **Client Secret**.
5. Click **Save**.

Your Google Authentication should now be active!
