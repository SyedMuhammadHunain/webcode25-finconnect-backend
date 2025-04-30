# 🚀 FinConnect - Full-Stack Application

Welcome to **FinConnect**! This project is a backend sandbox portal where developers can register, subscribe to a plan, and access a suite of mock financial APIs. The system is secured with JWT and RBAC, and is designed for extensibility, clean code, and modern developer experience.

---

## ✨ Features
- 🔐 User authentication & registration
- ✉️ Password reset and OTP
- 🛡️ JWT-based authorization
- 💳 Subscription management (Stripe integration)
- 💸 Fintech operations: balance, transfers, transactions, invoices
- 🧩 Modular, service-oriented architecture

---

## 📦 Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## ⚙️ Installation

```bash
npm install
```

---

## ▶️ Running the App

```bash
# Development
npm run start

# Watch mode (auto-reload)
npm run start:dev

# Production
npm run start:prod
```

---

## 📑 API Endpoints
See [`ENDPOINTS.md`](./ENDPOINTS.md) for a full list of available API endpoints, grouped by module/feature.

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🔑 Environment Variables
- Copy `.env.example` to `.env` (if exists) or create a `.env` file in the root directory.
- Fill in all required variables (database, JWT, Stripe, etc). Example:

```
DATABASE_URL=mongodb://localhost:27017/your-db
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
MAIL_USER=your_email_user
MAIL_PASS=your_email_pass
```

Refer to the codebase and `.env` for the full list of required variables.

---

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── auth/           # Authentication logic
│   ├── common/         # Shared code (guards, enums, decorators, interfaces)
│   ├── config/         # Configuration files (JWT, mailer)
│   ├── dtos/           # Data transfer objects (request/response schemas)
│   ├── email/          # Email/OTP logic
│   ├── fintech/        # Fintech operations (balance, transfer, transactions, invoice)
│   ├── schemas/        # Mongoose schemas
│   ├── stripe/         # Stripe payment integration
│   ├── subscription/   # Subscription management
│   ├── transaction/    # Transaction logic
│   └── user/           # User management
├── test/               # Test files
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md          # Project documentation
```

---

## 🤝 Contributing
Feel free to fork, collaborate, open issues, or submit pull requests! Contributions and edits are welcome to make this project even better.

---

## 👥 Contributors
- Shahzaim: Full-Stack Developer - [GitHub Profile](https://github.com/Shahzaim84/webkode-backend)

---

## 📄 License
© MetaStacker Team – WebCode25 Challenge 2024
