# AssetVerse

**Corporate Asset Management System**

---

## Live Demo
[Live Site URL](#)  

## Project Overview
AssetVerse is a B2B HR & Asset Management platform that helps companies efficiently manage their physical assets and track which employee has which equipment. It streamlines asset assignment, returns, employee management, and subscription-based package upgrades.

---

## Key Features
- HR Manager & Employee role-based access
- HR can add, edit, delete, and assign assets
- Employees can request and return assets (if returnable)
- Automatic employee-company affiliation on first approved request
- Package management with Stripe payment integration
- Analytics: Returnable vs Non-returnable assets, Top requested assets
- Employee dashboard: My Assets, My Team, Profile
- Pagination support for asset listing
- JWT authentication and role-based middleware

---

## Tech Stack
- **Frontend:** React, DaisyUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Payment Integration:** Stripe
- **Hosting:** Vercel
- **Others:** CORS, dotenv

---

## Setup Instructions
1. Clone the repositories (client & server)
2. Run `npm install` in both directories
3. Create `.env` files for backend:
    ```
    PORT=5000
    MONGO_URI=<your_mongo_connection_string>
    JWT_SECRET=<your_jwt_secret>
    STRIPE_SECRET_KEY=<your_stripe_secret_key>
    ```




