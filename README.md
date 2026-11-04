# ✨ ABAYA

![HeroAbaya](client/public/AbayaImage/HeroAbaya.png)

ABAYA is a full-stack modest-fashion e-commerce platform with a React/Vite storefront, Clerk authentication, MongoDB product data, and a protected admin workspace.

## 🗂️ Project structure

```text
abaya/
├── client/              React + Vite frontend
│   ├── public/          Static brand and page imagery
│   ├── src/pages/       Store, account, auth, and admin pages
│   ├── src/components/  Reusable UI and product components
│   └── vercel.json      Vercel SPA and API proxy configuration
├── server/              Express + TypeScript backend
│   ├── src/modules/     Products, customers, orders, media, admin, etc.
│   ├── src/seedProducts.ts
│   └── render.yaml      Render deployment configuration
└── vercel.json          Optional repository-root Vercel configuration
```

## 🛍️ Features

- Product catalog backed by MongoDB
- Product detail pages with color variants
- Cart, wishlist, checkout, orders, addresses, and customer account pages
- Clerk sign-in and sign-up flows
- MongoDB-backed customer synchronization
- Protected admin dashboard
- Admin product creation and editing
- Five-color product limit
- MongoDB-backed media library and image selection
- Admin product deletion with confirmation modal
- Responsive layouts and lazy-loaded imagery
- Vercel frontend with Render API deployment

## 🧰 Requirements

- Node.js 20+
- npm
- MongoDB Atlas or a local MongoDB instance
- Clerk application

## 🚀 Local setup

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/abaya
CLIENT_URL=http://localhost:5173
CLERK_SECRET_KEY=sk_test_your_key
CLERK_PUBLISHABLE_KEY=pk_test_your_key
ADMIN_EMAIL_ALLOWLIST=admin@example.com
```

Create `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
VITE_API_URL=http://localhost:5000/api
```

Never commit real keys. Use Vercel and Render environment settings for production secrets.

## ▶️ Run locally

Start the API:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The storefront runs at `http://localhost:5173` and the API at `http://localhost:5000`.

## 🌱 Database seeding

The server seeds the catalog when the products collection is empty. To seed manually, configure `MONGODB_URI` first and run:

```bash
cd server
npm run seed
```

The admin allowlist is synchronized into the MongoDB `admins` collection when the server starts. Product image references are synchronized into the `media` collection as well.

## 🔌 API overview

```text
GET    /health
GET    /api/products
GET    /api/products/:slug
GET    /api/admin/dashboard
GET    /api/admin/products
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
GET    /api/media
POST   /api/media
DELETE /api/media/:id
```

Admin endpoints require a valid Clerk bearer token and an active record in MongoDB's `admins` collection.

## ☁️ Deployment

### 🌐 Frontend — Vercel

Set the Vercel project root to `client` and use:

```text
Build command: npm run build
Output directory: dist
```

Configure `VITE_CLERK_PUBLISHABLE_KEY`. The client proxies `/api/*` requests to the Render API using `client/vercel.json`.

### 🖥️ Backend — Render

Set the Render service root to `server` and use:

```text
Build command: npm install && npm run build
Start command: npm start
```

Configure `MONGODB_URI`, `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `CLIENT_URL`, and `ADMIN_EMAIL_ALLOWLIST` in Render environment variables.

## ✅ Verification

```bash
cd client
npm run build

cd ../server
npx tsc -p tsconfig.json --noEmit
```

## 📸 Screenshots

Additional page screenshots are available in [`client/public/AbayaImage`](client/public/AbayaImage), including Home, Shop, Product, Our Story, and HeroAbaya imagery.
