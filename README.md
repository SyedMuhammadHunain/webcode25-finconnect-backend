<div align="center">
  <img src="banner.png" alt="FinConnect Logo" width="100%" />
  
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
</div>
<br/>

## 📖 Introduction

Welcome to **FinConnect**! This project is a robust, full-stack sandbox portal where developers can register, subscribe to a plan, and access a suite of mock financial APIs. The system is secured with **JWT (JSON Web Tokens)** and **RBAC (Role-Based Access Control)**, ensuring enterprise-grade security.

Key infrastructure pillars include:
*   **Secure Authentication:** Utilizes JWT and OTP-based login (2FA) verification via email modules.
*   **Fintech Dashboard:** View transactions, manage transfers, check invoices, and user overview.
*   **Monetization / Subscriptions:** Tightly integrated **Stripe API** handles checkout, payments, subscription validation, and robust route guards.
*   **Mailers:** Embedded NodeJS Nodemailer engine sending fully templated OTP codes and updates securely.

## 🚀 Key Features

*   **User Security:** Complete user registration flow with bcrypt encryptions, reset links, and OTP confirmation emails.
*   **Stripe Power:** Tiered subscription upgrades logic ensuring users can unlock Pro memberships via seamless checkout flow. 
*   **Modern UI:** Re-usable modern component inputs ensuring consistent aesthetic form groups using PrimeNG logic.
*   **Money Movement:** Account ID internal validation checking for logical internal currency transfers across dynamic mock accounts. 
*   **MongoDB Architecture:** Mongoose ORM models guaranteeing database schema safety for Transactions, Users, and secure Roles.

---

## 🛠️ Installation & Setup

### 1. Backend (NestJS 11) Setup

Navigate to the \`backend\` directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` root with your necessary tokens (MongoDB URI, JWT Secret, NodeMailer credentials, and Stripe tokens). Make sure the required MongoDB instance is running, then start the server:
```bash
# Development mode
npm run start:dev
```

### 2. Frontend (Angular 21) Setup

Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```

Start the Angular development server:
```bash
npm run start
# Now available at http://localhost:4200
```

---

## 📂 Project Architecture

### Backend (`./backend/src/`)
*   `auth/`: Authentication controllers, JWT validations, guarding strategies, and 2FA.
*   `fintech/`: Transfer ledgers and mock balance modules.
*   `stripe/`: Payment gateways mapping and Stripe webhook endpoints.
*   `email/`: Mailer Service templates mapping SMTP outbounds.
*   `subscription/`: Premium membership tier restriction tools.
*   `transaction/`: Broad financial logs indexing and aggregation endpoints.

### Frontend (`./frontend/src/app/pages/`)
*   `auth/`: Dynamic Authentication screens (Login, Signup, OTP Verification, Password Resets).
*   `dashboard/`: Core Member Area (Sidebar Layouts, Transfers, Overviews, Transactions, Invoices).
*   `subscription/`: Tiered pricing plans layout interacting with generic payment checkout models.
*   `payment-success/` & `payment-cancelled/`: Dedicated views tracking transaction feedback after external portal redirects.

---
