# Ludo Router

A game backlog tracker (games by platform: status, completion type, links) built with React Router 8 (framework mode, SSR disabled) + Vite + Tailwind CSS 4. Deployed to Netlify as a static SPA that proxies API calls.

## Commands

```bash
npm run dev        # dev server (react-router dev)
npm run build      # production build -> build/client, build/server
npm run start      # serve build/server/index.js (react-router-serve)
npm run typecheck  # react-router typegen && tsc
```

No test suite or lint script is configured.

## Architecture

- `app/routes.ts` — route table: `index` -> `routes/home.tsx`, `:id` -> `routes/platform.tsx` (`:id` is a platform slug).
- `app/routes/platform.tsx` — fetches `/api/games/:id` via `useAPI`, renders `GameSection`/`GameSectionSkeleton`/`BottomNavigation`/`Error`.
- `app/hooks/use-api.ts` — `useAPI<T>(url)` hook: plain `fetch` + `useState`, expects FastAPI-style error bodies (`{ detail: string }`) and surfaces `error` as `"{status} | {detail}"` or `"NetworkError | {message}"`.
- `app/lib/data-types.ts` — shared types: `Game`, `Games`, `GameStatus` (`Completed | Played | Playing | Backlog | Wishlist`), `CompletionType` (`Story | Full | Endless`).
- `app/components/` — `game-section.tsx`, `bottom-navigation.tsx`, `error.tsx`, `header-showcase.tsx`.
- `react-router.config.ts` — `ssr: false` (client-rendered/SPA mode).

## API / deployment

- The app calls a relative `/api/*` and expects the *backend* (a separate FastAPI service, currently `gula-data.vercel.app`) to be reachable via Netlify redirects — see `netlify.toml`.
- `netlify.toml`'s build command requires `VITE_GAMES_API_ENDPOINT` to be set in the Netlify environment; it fails the build otherwise and substitutes the value into the `{{env.VITE_GAMES_API_ENDPOINT}}` placeholders in `netlify.toml` before building. Locally, `.env` sets the same var for `npm run dev`.
- `/api/*` and `/static/ludo-router/*` are proxied (redirected) to that backend; everything else falls through to `/index.html` (client-side routing).

## Gotchas

- Since `ssr: false`, don't rely on server-only React Router APIs (loaders run client-side effectively as SPA).
- `useAPI` silently no-ops if `url` is undefined/falsy — check call sites before assuming a fetch fires.
