# Repository Guidelines

Any responses are **NOT** allowed unless the user has given permission. Modification of files is prohibited, only answering questions and planning projects.

# Description

1. All responses must be in Traditional Chinese unless specific terms or tool names require their original language.
2. Code comments and Git commit messages must be in English.
3. If the user provides input in another language, translate the response into Traditional Chinese unless explicitly asked otherwise.
4. Always follow the user's requested tools and development environment.

## Project Structure & Module Organization

- `frontend/`: React 19 + TypeScript + Vite app
  - `src/pages/`: feature pages (`recharts/`, `chartJs/`, `dose/`)
  - `src/serve/`: data fetching (React Query hooks, provider)
  - `src/components/`: UI and chart wrappers
  - Tests colocated with source (e.g., `src/components/Button.test.tsx`)
- `backend/`: FastAPI app
  - `app/main.py`: API entry (`/`, `/marketing`, `/dose`)
  - JSON fixtures in `app/`
- `docs/`: additional documentation

## Build, Test, and Development Commands

- Frontend
  - `pnpm dev`: start Vite dev server
  - `pnpm build`: type-check and build
  - `pnpm test` / `pnpm test:unit`: run Vitest; `pnpm coverage` for coverage
  - `pnpm lint` / `pnpm lint:fix`: ESLint check/fix
- Backend
  - Python 3.13 (see `backend/.python-version`). Create venv and run:
    - `uvicorn app.main:app --reload --port 8001`

## Coding Style & Naming Conventions

- Frontend: TypeScript, 2-space indent. Components `PascalCase` (`MyChart.tsx`), variables/functions `camelCase`, files generally `kebab-case`.
- Linting: ESLint v9 with `@antfu/eslint-config` (sorted imports, dangling commas, stylistic rules). Vite eslint plugin runs during dev/build.
- CSS: TailwindCSS. Prefer utility classes; keep component styles local.
- Backend: Python type hints where practical; small, focused endpoints.

## Testing Guidelines

- Unit tests: Vitest + React Testing Library. Place tests next to source (`.test.tsx`/`.test.ts`).
- Coverage: run `pnpm coverage` and keep meaningful assertions (avoid shallow render-only tests).
- Mock API with MSW when testing frontend data flows.

## Commit & Pull Request Guidelines

- Commits: clear, imperative subject; group related changes. Conventional style encouraged, e.g., `feat(recharts): add domain spacing ticks`.
- PRs: include concise description, screenshots/GIFs for UI changes, reproduction/verification steps, and linked issues. Keep PRs scoped and reviewable.

## Security & Configuration Tips

- Frontend env: `frontend/.env.local` controls `VITE_API_BASE_URL` and `VITE_BASE_PATH`.
- CORS is wide open for development in `backend/app/main.py`; restrict `allow_origins` in production.
- Avoid committing secrets; do not store sensitive data in JSON fixtures.


## Git
- When responding with a PR, the description must be concise and adhere to the Angular Team Commit Specification, **keeping the subject and summary under 35 characters** . All PR descriptions must be in English, and comments on the PR should explain code refactoring for cleaner code when necessary.
- Requiring the following format: <type>: <subject> where the subject must be under 35 characters. 
- If asked to 'Clean Code' or refactor, rewrite the code in a simpler, more maintainable way and explain the reasons for the refactor in the PR message.

### The <type> descriptor options are:

1. feat: A new feature
2. fix: A bug fix
3. docs: Documentation only changes
4. style: Changes that do not affect code meaning (formatting, white-space)
5. refactor: Code changes that are neither bug fixes nor features
6. perf: Code improvements for performance
7. test: Adding or correcting tests
8. chore: Build process or auxiliary tools changes

Branch naming conventions must follow: '<type>/<component_name>/<feature_name>' format. If there's no specific component, omit the middle section. 

Type prefixes include:
1. feat or feature: New feature development
2. bugfix or bug: Fix a bug
3. hotfix: Immediate fixes to production
4. test or experimental: Experimental or test branches
5. release: Version release branch
6. merge: Temporary branch for conflict resolution
7. modify: Adjustments or optimizations
8. refactor: Code refactoring
