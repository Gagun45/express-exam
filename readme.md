# 🚗 AutoRia Clone Backend

Backend API for a car marketplace platform inspired by AutoRia.  
Built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

The application provides authentication, role-based access control, ad management, view tracking, currency handling, and admin moderation features.

---

## ✨ Core Features

- 🔐 **Authentication** (Access + Refresh tokens)
- 👤 **Role-based permissions** (User / Seller / Manager / Admin)
- 💎 **Account types** (Basic / Premium)
- 🚘 **Car brand & model management**
- 📢 **Advertisement creation & moderation**
- 👁 **View tracking**
- 💱 **Multi-currency pricing** (UAH, USD, EUR)
- 📊 **Pagination**
- 🛑 **User banning system**
- 🐳 **Dockerized environment**
  https://github.com/Gagun45/express-exam.git

---

## 🧪 Preloaded / Mocked Data

The database contains pre-created mock data for easier testing.

### 🔑 Existing Users

- Multiple users with different:
    - Roles (User / Seller / Manager / Admin)
    - Account types (Basic / Premium)
    - Ban statuses

All existing users share the same password: P@ssword1

### 👑 Admin Access

You can sign in using:

- Email: admin@qwe.com
- Password: P@ssword1

After authentication:

- Visit `/users` to retrieve all existing users
- Select a user with the appropriate:
    - Role
    - Account type
    - Ban status

This allows easy testing of permission-based access control and business logic.

---

## 📧 Email Notification Testing

When an advertisement description is edited under specific conditions, **all Manager accounts are notified via email**.

⚠️ The preloaded manager accounts use mock email addresses.

If you want to test the email sending functionality, follow this flow:

1️⃣ Sign up a new user using a **real email address**

2️⃣ Log in as admin:

- Email: admin@qwe.com
- Password: P@ssword1

3️⃣ Change the newly created user's role to **Manager**

4️⃣ Trigger the advertisement description edit flow

The notification email will be sent to all Manager accounts, including the one with the real email address.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Gagun45/express-exam.git
cd express-exam

```

### 2️⃣ Environment Variables

The .env file is provided separately for security reasons.

Download the environment configuration file and place it in the root directory of the project.

### 3️⃣ Run with Docker

Make sure Docker is installed and running.

```bash
docker compose up --build
```

The API will be available at: http://localhost:5555
