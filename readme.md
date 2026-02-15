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
- 📊 **Filtering & pagination**
- 🛑 **User banning system**
- 🐳 **Dockerized environment**
  https://github.com/Gagun45/express-exam.git

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
