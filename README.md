# google_oa_auth

Next.js template with Google OAuth 2.0 sign-in via [NextAuth.js](https://next-auth.js.org/).

## Using this template

Use this repo as the starting point for any new app that needs Google sign-in.

### Create a new project from the template

1. On GitHub, open this repository.
2. Click **Use this template** → **Create a new repository**.
3. Clone your new repo and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
cd YOUR_NEW_REPO
npm install
```

4. Copy the environment file and fill in your values:

```bash
cp .env.example .env.local
```

5. In [Google Cloud Console](https://console.cloud.google.com/), add this app’s redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

6. Start the dev server:

```bash
npm run dev
```

7. Open [http://localhost:3000/login](http://localhost:3000/login) and sign in with Google.

### Checklist for each new app

| Step | Action |
|------|--------|
| Env | Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and a new `NEXTAUTH_SECRET` in `.env.local` |
| Google Cloud | Add this app’s redirect URI and authorized origin |
| Routes | Update `middleware.ts` `matcher` for pages that require sign-in |
| UI | Customize `src/app/login/page.tsx` and your protected pages |
| Production | Set `NEXTAUTH_URL` to your live URL and add production redirect URIs |

### Google OAuth: reuse or create new credentials

**Reuse one OAuth client (good for local dev):** Add each app’s callback URL to the same Google OAuth client. Useful when running multiple apps on different localhost ports or domains.

**Create a new OAuth client (recommended for production):** Gives each app its own Client ID/Secret and consent screen branding.

### Files to keep when reusing the auth setup

These files contain the Google login mechanism. Copy or keep them when starting from this template:

- `src/lib/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/components/providers.tsx`
- `src/components/google-sign-in-button.tsx`
- `src/components/sign-out-button.tsx`
- `src/app/login/page.tsx`
- `middleware.ts`
- `.env.example`

### Enable template mode on GitHub (one-time)

To make **Use this template** available on GitHub:

1. Push this repo to GitHub.
2. Go to **Settings → General → Template repository**.
3. Check **Template repository**.

## Quick start

### 1. Google Cloud Console

1. Create a project at [Google Cloud Console](https://console.cloud.google.com/).
2. Configure **OAuth consent screen** (APIs & Services → OAuth consent screen).
3. Create **OAuth client ID** (Web application) under Credentials.
4. Add authorized origins and redirect URI:

| Setting | Value |
|---------|-------|
| JavaScript origins | `http://localhost:3000` |
| Redirect URI | `http://localhost:3000/api/auth/callback/google` |

5. Copy the **Client ID** and **Client Secret**.

### 2. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
```

Generate a secret:

```bash
openssl rand -base64 32
```

### 3. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) and click **Sign in with Google**.

## Routes

| Route | Description |
|-------|-------------|
| `/login` | Login screen with Google button |
| `/` | Protected home page (requires sign-in) |
| `/api/auth/*` | NextAuth handlers |

## Project structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # OAuth callback handlers
│   ├── login/page.tsx                   # Login screen
│   └── page.tsx                         # Protected dashboard
├── components/
│   ├── google-sign-in-button.tsx
│   ├── providers.tsx                    # SessionProvider wrapper
│   └── sign-out-button.tsx
├── lib/auth.ts                          # NextAuth config
middleware.ts                            # Protects /
```

## Production

- Set `NEXTAUTH_URL` to your production URL.
- Add production origins and redirect URIs in Google Cloud Console.
- Publish the OAuth consent screen if using external users.
