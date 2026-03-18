<div align="center">
  <img src="banner.png" alt="FinConnect Logo" width="100%" />
  <h1>FinConnect Platform</h1>
  <br/>
  
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=ffffff&center=true&vCenter=true&width=800&lines=FinConnect+Full-Stack+Portal;Powered+by+Angular+21,+NestJS+11+%26+MongoDB;Secure,+Scalable,+Fintech+Platform" alt="Typing SVG" />
  </a>
  <br/>

  <p>
    <img src="https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
    <img src="https://img.shields.io/badge/PrimeNG-E0234E?style=for-the-badge&logo=primeng&logoColor=white" alt="PrimeNG">
    <img src="https://img.shields.io/badge/NestJS_11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
    <img src="https://img.shields.io/badge/Antigravity-000000?style=for-the-badge&logo=python&logoColor=white" alt="Antigravity">
  </p>
</div>

---

<div align="center"> 
  <h2>🛠️ Tech Stack & Tools</h2>
</div>

<div align="center">
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/angular.png" alt="Angular" title="Angular"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nest_js.png" alt="Nest.js" title="Nest.js"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mongodb.png" alt="mongoDB" title="mongoDB"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postman.png" alt="Postman" title="Postman"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/git.png" alt="Git" title="Git"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/github.png" alt="GitHub" title="GitHub"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/rest.png" alt="REST" title="REST"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/python.png" alt="Antigravity" title="Antigravity"/></code>
</div>
<br/>

<div align="center">
  <a href="#-introduction"><img alt="Intro" src="https://img.shields.io/badge/Intro-Read%20Me-22c55e?style=for-the-badge" /></a>
  <a href="#-key-features"><img alt="Features" src="https://img.shields.io/badge/Features-What%20You%20Get-0ea5e9?style=for-the-badge" /></a>
  <a href="#-api-reference"><img alt="API" src="https://img.shields.io/badge/API-Endpoints-f97316?style=for-the-badge" /></a>
  <a href="#-run-locally"><img alt="Run" src="https://img.shields.io/badge/Run-Local%20Setup-a855f7?style=for-the-badge" /></a>
  <a href="#-folder-structure"><img alt="Structure" src="https://img.shields.io/badge/Structure-Folders-ef4444?style=for-the-badge" /></a>
</div>

## 📌 Table of Contents

- [📖 Introduction](#-introduction)
- [🚀 Key Features](#-key-features)
- [🧭 Architecture](#-architecture)
- [🔌 API Reference](#-api-reference)
- [🔐 Environment Variables](#-environment-variables)
- [🛠️ Run Locally](#-run-locally)
- [📜 Scripts](#-scripts)
- [📂 Folder Structure](#-folder-structure)
- [🛡️ Security Notes](#-security-notes)
- [🧰 Troubleshooting](#-troubleshooting)

---

## 📖 Introduction

Welcome to **FinConnect**! This project is a robust, full-stack sandbox portal where developers can register, subscribe to a plan, and access a suite of mock financial APIs. The system is secured with **JWT (JSON Web Tokens)** and **RBAC (Role-Based Access Control)**, ensuring enterprise-grade security.

**At a glance**
- **Frontend:** Angular 21 + PrimeNG UI + route guards + HTTP interceptor
- **Backend:** NestJS 11 + MongoDB (Mongoose) + JWT + OTP Email + Stripe checkout
- **Core flows:** Register → OTP verify → Login → Dashboard → Subscribe → Access premium routes

---

## 🚀 Key Features

### ✅ Authentication & Accounts
- **Register** with bcrypt-hashed passwords and unique email/username
- **OTP-based verification** (email) with expiry + cleanup job
- **Login without OTP** for previously-verified users
- **Forgot password** generates a reset token and sends a reset link

### 💳 Subscription & Payments
- **Stripe Checkout Sessions** for monthly recurring plans
- **Plan tiers:** Basic / Standard / Premium
- **Subscription flagging** (persisted on user profile)

### 🧾 Fintech Sandbox APIs
- **Balance lookup**
- **Transfers** between mock account IDs
- **Transactions listing** with pagination
- **Invoice generation** by date range

### 🧱 Platform Foundations
- **ValidationPipe** for DTO validation
- **Helmet** security headers + **compression**
- **Throttling** via Nest Throttler
- **CacheModule** enabled globally

---

## 🧭 Architecture

```mermaid
flowchart LR
  A[Angular 21 SPA] -->|HTTP JSON| B[NestJS 11 API]
  B --> C[(MongoDB)]
  B --> D[SMTP (Gmail)\nNodemailer/MailerModule]
  B --> E[Stripe API]
  A -->|Redirect| E
```

<details>
  <summary><strong>Frontend routing map (click to expand)</strong></summary>

  - Public pages:
    - `/login`, `/login-verified`, `/signup`, `/forgot-password`, `/resend-otp`, `/update-password`
    - `/subscription`, `/payment-success`, `/payment-cancelled`
  - Protected routes:
    - `/dashboard` (with children: `overview`, `transactions`, `invoices`, `transfer`)
</details>

<details>
  <summary><strong>Backend modules overview (click to expand)</strong></summary>

  - `auth/` → registration, login, OTP verified login, password reset, password update
  - `email/` → OTP issuance + resend + HTML email templates (MailerModule)
  - `stripe/` + `subscription/` → checkout session + subscription actions
  - `fintech/` → balance, transfer, invoice, transactions
  - `common/` → guards (JWT / roles / subscription), decorators, enums
</details>

---

## 🔌 API Reference

Base URL (frontend config): `http://localhost:3000/api`

> Auth protection: the backend uses a global JWT guard for non-public endpoints.

### Auth (`/api/auth`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create user + send OTP email |
| POST | `/auth/login` | Public | Login + OTP check (except test accounts) |
| POST | `/auth/login-verified` | Public | Login without OTP if already verified |
| POST | `/auth/forgot-password` | Public | Create password reset token + email link |
| POST | `/auth/resend-otp` | Public | Re-issue OTP to email |
| PATCH | `/auth/update-password` | JWT | Update password for logged-in user |

### Fintech (`/api`)

| Method | Path | Auth | Query | Description |
|---|---|---|---|---|
| GET | `/balance` | JWT | — | Fetch user balance |
| POST | `/transfer` | JWT | — | Transfer funds between accounts |
| GET | `/transactions` | JWT | `page`, `pageSize` | List transactions (paginated) |
| GET | `/invoice` | JWT | `start`, `end` | Generate invoice for date range |

### Subscriptions (`/api/subscriptions`)

| Method | Path | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/subscriptions/subscribe` | JWT | `{ subscriptionType, amount }` | Create checkout session URL |
| POST | `/subscriptions/cancel` | JWT | — | Cancel subscription (flag) |

### Stripe helper (`/api/subscription`)

| Method | Path | Auth | Query | Description |
|---|---|---|---|---|
| GET | `/subscription/create-checkout-session` | JWT | `amount`, `planName` | Returns Stripe checkout URL |

> Note: Some controller modules exist as placeholders (e.g. `user`, `transaction`, `email`) and may be expanded later.

---

## 🔐 Environment Variables

Create `backend/.env`:

```bash
# Server
PORT=3000

# Database
DATABASE_URL=mongodb://127.0.0.1:27017/finconnect

# JWT
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d

# Email (Gmail SMTP)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_SUCCESS_URL=http://localhost:4200/
STRIPE_CANCEL_URL=http://localhost:4200/subscription
```

---

## 🛠️ Run Locally

<details>
  <summary><strong>Backend (NestJS 11)</strong></summary>

```bash
cd backend
npm install
npm run start:dev
```

API will start on `http://localhost:3000`.
</details>

<details>
  <summary><strong>Frontend (Angular 21)</strong></summary>

```bash
cd frontend
npm install
npm run start
```

App will start on `http://localhost:4200`.
</details>

---

## 📜 Scripts

### Backend (`backend/package.json`)

- `npm run start:dev` — dev server (watch)
- `npm run build` — build
- `npm run start:prod` — run compiled output
- `npm run lint` — ESLint
- `npm run test` / `npm run test:e2e` — unit + e2e

### Frontend (`frontend/package.json`)

- `npm run start` — dev server
- `npm run build` — production build
- `npm run watch` — dev build watch
- `npm run test` — unit tests

---

## 📂 Folder Structure

<details>
  <summary><strong>Backend (click to expand)</strong></summary>

```text
backend/
  src/
    auth/                # auth.controller.ts, auth.service.ts
    common/
      constants/
      decorators/
      enums/
      guards/
      interfaces/
      log/
    config/              # jwt.config.ts, mailer.config.ts
    dtos/                # request DTOs
    email/               # email.module.ts, email.service.ts
    fintech/             # balance/transfer/invoice/transactions
    schemas/             # user/auth/transaction schemas
    stripe/              # stripe.controller.ts, stripe.service.ts
    subscription/        # subscription.controller.ts, subscription.service.ts
    transaction/         # placeholder module/controller
    user/                # placeholder module/controller
    main.ts              # helmet, cors, compression, pipes
```
</details>

<details>
  <summary><strong>Frontend (click to expand)</strong></summary>

```text
frontend/
  public/                # app icons (favicon, manifest, etc.)
  src/
    app/
      core/
        guards/          # auth.guard
        interceptors/    # auth.interceptor
        services/        # auth, fintech, subscription, stripe, local-storage
      pages/
        auth/            # login/signup/otp/password flows
        dashboard/       # layout + overview/transactions/invoices/transfer
        subscription/    # pricing + subscribe/cancel
        payment-success/
        payment-cancelled/
    environments/        # environment.ts + environment.development.ts
```
</details>

---

## 🛡️ Security Notes

- **HTTP Hardening:** `helmet()` enabled in `backend/src/main.ts`
- **CORS:** configured for `http://localhost:4200`
- **Validation:** `ValidationPipe()` enabled globally
- **Throttling:** `ThrottlerGuard` configured (short + medium windows)
- **RBAC scaffolding:** `RolesGuard` + `@Roles()` decorator are present (add `@Roles(Role.ADMIN)` on routes to enforce)
- **Subscription gating scaffolding:** `SubscriptionGuard` reads metadata key `subscription` (add metadata to protected routes to enforce)

---

## 🧰 Troubleshooting

- **MongoDB connection fails:** verify `DATABASE_URL` and that MongoDB is running.
- **Emails not sending:** if using Gmail, use an App Password and set `MAIL_USER`/`MAIL_PASS`.
- **Stripe errors:** confirm `STRIPE_SECRET_KEY` and success/cancel URLs.
- **401 errors:** check that the frontend stored `accessToken` and the interceptor is enabled.
