# Webrain Backend (Sanity CMS)

Headless content backend for **[Webrain](https://webbrain.vercel.app)** — a web development agency site. This repository is a [Sanity](https://www.sanity.io/) Content Studio that defines document schemas and manages content consumed by the Next.js frontend.

> Not an Express/REST API server. The “API” is Sanity’s Content Lake (GROQ queries from the frontend against project `rkvjq0qa` / dataset `production`).

## Related links

| Resource      | URL                                          |
| ------------- | -------------------------------------------- |
| Live site     | https://webbrain.vercel.app                  |
| Frontend repo | https://github.com/sohan9542/webrain         |
| This CMS repo | https://github.com/sohan9542/webrain-backend |

## Tech stack

- **Sanity Studio v3** — content editing UI and schema definitions
- **React 18** — Studio UI runtime
- **GROQ / Sanity Content Lake** — queried by the frontend (`next-sanity`)
- **Node.js 18+**, **Yarn**
- **ESLint** (`@sanity/eslint-config-studio`) + **Prettier**

## Content model (document types)

These `_type` names are queried by the frontend — do not rename them without updating [sohan9542/webrain](https://github.com/sohan9542/webrain).

| Type           | Purpose                            | Key fields                                                                                         |
| -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `post`         | Blog posts                         | `title`, `slug`, `author`, `mainImage`, `categories`, `publishedAt`, `metadesc`, `content`, `meta` |
| `author`       | Post authors                       | `name`, `slug`, `image`, `bio`                                                                     |
| `category`     | Post categories                    | `title`, `description`                                                                             |
| `projects`     | Portfolio items                    | `name`, `mainImage`, `publishedAt`, `view`, `desc`, `live`                                         |
| `reviews`      | Client testimonials                | `name`, `position`, `review`, `link`, `mainImage`, `logo`                                          |
| `blockContent` | Reusable Portable Text object type | rich text + images                                                                                 |

### How the frontend reads content

The Next.js app uses `next-sanity` + GROQ (see `sanity/api.js` in the frontend), for example:

- `*[_type == "post"]` — blog listing / detail
- `*[_type == "projects"]` — portfolio section
- `*[_type == "reviews"]` — testimonials
- `*[_type == "category"]` — categories

Public dataset reads go through Sanity’s hosted API (`*.api.sanity.io`). Studio write access requires Sanity authentication.

## Architecture

```
┌─────────────────────┐     GROQ      ┌──────────────────────┐
│  webrain (Next.js)  │ ───────────▶  │  Sanity Content Lake │
│  webbrain.vercel.app│               │  project + dataset    │
└─────────────────────┘               └──────────▲───────────┘
                                                 │ edit / publish
                                      ┌──────────┴───────────┐
                                      │  webrain-backend     │
                                      │  (this Sanity Studio)│
                                      └──────────────────────┘
```

## Project structure

```
.
├── sanity.config.js      # Studio config (project, dataset, plugins, schemas)
├── sanity.cli.js         # Sanity CLI project binding
├── schemas/              # Document & object type definitions
│   ├── index.js          # Schema registry
│   ├── post.js
│   ├── author.js
│   ├── category.js
│   ├── projects.js
│   ├── reviews.js
│   └── blockContent.js
├── static/               # Static assets for the Studio
├── tests/                # Schema smoke tests
├── .env.example          # Environment variable names
└── .github/workflows/    # CI (install, lint, format, test)
```

## Local setup

### Prerequisites

- Node.js 18 or newer
- Yarn
- A [Sanity](https://www.sanity.io/) account with access to the Webrain project (for write/deploy)

### Install & run Studio

```bash
yarn install
yarn dev
```

Studio defaults to project ID `rkvjq0qa` and dataset `production`. Override with env vars if needed (see below).

### Deploy Studio

```bash
yarn deploy
```

Requires Sanity login or `SANITY_AUTH_TOKEN`.

## Environment variables

Copy `.env.example` to `.env` and fill in values as needed. **Names only are documented here** — never commit real tokens.

| Variable                   | Required                   | Description                                   |
| -------------------------- | -------------------------- | --------------------------------------------- |
| `SANITY_STUDIO_PROJECT_ID` | No                         | Defaults to the Webrain production project ID |
| `SANITY_STUDIO_DATASET`    | No                         | Defaults to `production`                      |
| `SANITY_AUTH_TOKEN`        | For non-interactive deploy | Sanity API token for CLI deploy               |

Sanity **project IDs are public** (they appear in client-side frontend config). Treat `SANITY_AUTH_TOKEN` as a secret.

## Scripts

| Script                              | Description                     |
| ----------------------------------- | ------------------------------- |
| `yarn dev`                          | Start Sanity Studio locally     |
| `yarn start`                        | Start the built Studio          |
| `yarn build`                        | Build the Studio for deployment |
| `yarn deploy`                       | Deploy Studio to Sanity hosting |
| `yarn deploy-graphql`               | Deploy GraphQL API (Sanity)     |
| `yarn lint`                         | Run ESLint                      |
| `yarn format` / `yarn format:check` | Prettier write / check          |
| `yarn test`                         | Schema registry smoke tests     |

## Author

**Sohanur Rahman** ([@sohan9542](https://github.com/sohan9542))
