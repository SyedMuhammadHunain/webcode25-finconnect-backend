# API Endpoints

## Auth
- POST   /api/auth/register
- POST   /api/auth/login
- POST   /api/auth/forgot-password
- POST   /api/auth/resend-otp
- PATCH  /api/auth/update-password

## Subscription
- POST   /api/subscriptions/subscribe
- POST   /api/subscriptions/cancel

## Stripe
- GET    /api/subscription/create-checkout-session

## Fintech
- GET    /api/balance
- POST   /api/transfer
- GET    /api/transactions
- GET    /api/invoice

## App
- GET    /
