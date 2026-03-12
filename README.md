<div align="center">

  <img src="./banner.png" alt="Project Banner" width="100%" />

  <br/>
  <br/>

  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=ffffff&center=true&vCenter=true&width=800&lines=FinConnect+Backend+API;Powered+by+NestJS+%26+MongoDB;Secure,+Scalable,+Fintech+Portal" alt="Typing SVG" />
  </a>

  <br/>

  <p>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  </p>

</div>

---

<div align="center"> 

## 🛠️ Tech Stack & Tools

</div>

<div align="center">
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nest_js.png" alt="Nest.js" title="Nest.js"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mongodb.png" alt="mongoDB" title="mongoDB"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postman.png" alt="Postman" title="Postman"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/git.png" alt="Git" title="Git"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/github.png" alt="GitHub" title="GitHub"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/rest.png" alt="REST" title="REST"/></code>
    <code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/visual_studio_code.png" alt="Visual Studio Code" title="Visual Studio Code"/></code>
</div>

<br/>

## 📖 Introduction

Welcome to **FinConnect**! This project is a robust, full-stack sandbox portal where developers can register, subscribe to a plan, and access a suite of mock financial APIs. The system is secured with **JWT (JSON Web Tokens)** and **RBAC (Role-Based Access Control)**, ensuring enterprise-grade security.

Built with the **NestJS** framework and powered by **MongoDB**, it provides modular, service-oriented operations representing real-world fintech features.

<br/>

---

## 📺 Project Demo

Watch the full project overview and demo to see FinConnect in action.

<div align="center">
https://github.com/user-attachments/assets/88105980-efda-4d14-81ac-92e934498b46
</div>

<br/>

---

## 🌟 Key Features

Click on the sections below to expand and view details about the core modules.

<details>
<summary><b>🔐 Authentication & Security</b></summary>
<br/>

- **JWT Auth & RBAC:** Secure JSON Web Token-based login with Role-Based Access Control.
- **OTP Verification:** Robust email OTP system for registration and recovery.
- **Password Recovery:** Secure password reset functionalities.
- **Guards & Decorators:** Custom shared guards, decorators, and interfaces for modular security checks.

</details>

<details>
<summary><b>💸 Fintech Core Operations</b></summary>
<br/>

| Module | Functionality |
| :--- | :--- |
| **Balance** | Manage and track user financial balances. |
| **Transfers** | Execute mock financial transfers between accounts securely. |
| **Transactions** | Complete transaction logging and history retrieval. |
| **Invoices** | Generation and management of simulated invoices. |

</details>

<details>
<summary><b>💳 Subscriptions & Payments</b></summary>
<br/>

- **Stripe Integration:** Seamless payment processing for platform subscription plans.
- **Subscription Management:** Subscribe, upgrade, or manage sandbox API plans natively.

</details>

<details>
<summary><b>🏗️ Architecture & Code Quality</b></summary>
<br/>

- **Modular Design:** Highly organized NestJS architecture separating components (Emails, Auth, Stripe, Fintech, etc.).
- **Validation:** Strict request validation using DTOs (Data Transfer Objects).
- **Scalable Data Models:** Mongoose schemas designed for flexibility and extensive data relations.

</details>

<br/>

---

<div align="center">

## 🚀 Setup Guide

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=22&pause=1000&color=34D399&center=true&vCenter=true&width=600&lines=Initializing+Environment...;Loading+Prerequisites...;follow+the+steps+below+to+launch!+🚀" alt="Setup Animation" />
</a>

<p>Follow the steps to get your local backend instance running.</p>

</div>

<br/>

<details open>
<summary>
  <h3 style="display:inline-block">🔹 Step 1: Engine Check (Prerequisites)</h3>
  <p>Ensure your machine has the necessary core components installed.</p>
</summary>

<div align="center">

| Component | Requirement | Status Check Command |
| :--- | :--- | :--- |
| **Node.js** | `v18.x` or higher | `node -v` |
| **npm** | `v9.x` or higher | `npm -v` |
| **MongoDB** | Running Locally or Atlas URI | `mongod --version` |

<br>

<img src="https://img.shields.io/badge/Node.js-Requires_v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS Version" />
<img src="https://img.shields.io/badge/MongoDB-Database_Ready-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Ready" />

</div>
<br>
</details>

<details>
<summary>
  <h3 style="display:inline-block">🔹 Step 2: Acquire Target (Clone & Install)</h3>
  <p>Clone the codebase and install dependencies.</p>
</summary>

```bash
# 1. Clone the repository
git clone https://github.com/SyedMuhammadHunain/webcode25-finconnect-backend

# 2. Navigate into the backend directory
cd webcode25-finconnect-backend

# 3. Install dependencies via npm
npm install
```
</details>

<details> 
<summary> 
  <h3 style="display:inline-block">🔹 Step 3: Environmental Controls (Config Secrets)</h3> 
  <p>⚠️ Crucial Step: Set up your environment variables.</p> 
</summary>

**1. Create the file:**
Copy `.env.example` to `.env` (if exists) or create a fresh `.env` file in the root directory.

**2. Fill in the required secrets:**

```bash
# ==============================================
# 🔐 APP SECRETS & CONFIGURATION
# ==============================================

# --- Database ---
DATABASE_URL=mongodb://localhost:27017/finconnect_db

# --- Authentication ---
JWT_SECRET=your_jwt_secret_super_secure_key

# --- Stripe Integration ---
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx

# --- Email / OTP Service ---
MAIL_USER=your_mail_smtp_username
MAIL_PASS=your_mail_smtp_password
```
</details>

<details>
<summary><h3 style="display:inline-block">🔹 Step 4: Run Application</h3></summary>

Choose your desired mode to start the server.

| Mode         | Command                         | Description                                                                 |
|--------------|----------------------------------|-----------------------------------------------------------------------------|
| 🟢 Development | `npm run start:dev`              | Recommended. Watches for file changes and auto-restarts.                   |
| 🟡 Standard    | `npm run start`                  | Runs the app once without watching for changes.                             |
| 🔴 Production  | `npm run start:prod`             | Runs optimized production code.     |

</details>

<br/>

---

## 📑 API Endpoints & Testing

<details>
<summary><b>View API Documentation Reference</b></summary>
<br/>

Available API Endpoints can be heavily detailed. Please refer to [`ENDPOINTS.md`](./ENDPOINTS.md) for a full list of available API endpoints, grouped by module/feature.

### 🧪 Running Tests
You can run the extensive test suites included using the following commands:
```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```
</details>

<br/>

---

## 📁 Project Structure

<details open>
<summary><strong>src/</strong> — Core application source</summary>

```text
backend/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── 📂 auth/           # 🔐 Authentication & registration logic
│   ├── 📂 common/         # 🛡️ Shared code (guards, enums, decorators, interfaces)
│   ├── 📂 config/         # ⚙️ Configuration files (JWT, mailer)
│   ├── 📂 dtos/           # 📄 Data transfer objects (request/response validation schemas)
│   ├── 📂 email/          # ✉️ Email/OTP logic
│   ├── 📂 fintech/        # 💸 Fintech operations (balance, transfer, transactions, invoice)
│   ├── 📂 schemas/        # 🗄️ Mongoose schemas defining DB structure
│   ├── 📂 stripe/         # 💳 Stripe payment integration
│   ├── 📂 subscription/   # 🔄 User subscription management
│   ├── 📂 transaction/    # 🧾 General transaction logic
│   └── 📂 user/           # 👤 User management and roles
├── 📂 test/               # 🧪 Test files (e2e and unit)
├── 📜 .env                # 🔐 Environment variables
├── 📜 package.json        # 📦 Project metadata and scripts
├── 📜 tsconfig.json       # 📐 TypeScript configuration
└── 📜 README.md           # 📖 Project documentation
```
</details>


<br/>

---

<div align="center">

## 🤝 Connect & Support

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="200" alt="Coding Gif" />

<p>Feel free to fork, collaborate, open issues, or submit pull requests! Contributions and edits are welcome to make this project even better.</p>

<br/>

<p>Copyright © 2025 <b>MetaStacker Team – WebCode25 Challenge</b>.</p>

</div>
