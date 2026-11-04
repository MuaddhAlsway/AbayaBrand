# ABAYA Server

Express + TypeScript + MongoDB backend scaffold for ABAYA.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`
3. Run dev: `npm run dev`
4. Build: `npm run build`
5. Start: `npm start`

## Structure

See `src/` for modules, middleware, config, utils, types, and routes.

## Notes

- Clerk handles authentication; this server verifies Clerk tokens.
- MongoDB models are defined under each module.
- Frontend calls `/api/*` endpoints.