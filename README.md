# PenCraft 📝

> A full-stack production-grade blog platform built with Next.js, Node.js, PostgreSQL, and TypeScript — deployed on AWS.

[![Live](https://img.shields.io/badge/Live-pencraft.site-blue?style=flat-square)](https://pencraft.site)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/Tests-5%20passing-brightgreen?style=flat-square)](https://github.com/moizmalik13588/blog-app)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

## 🚀 Live Demo

| Service               | URL                                                              |
| --------------------- | ---------------------------------------------------------------- |
| 🌐 Frontend           | [pencraft.site](https://pencraft.site)                           |
| ⚙️ Backend API        | [api.pencraft.site](https://api.pencraft.site)                   |
| 📖 API Docs (Swagger) | [api.pencraft.site/api-docs](https://api.pencraft.site/api-docs) |

---

## 🏗️ Architecture

```
User
 │
 ├── pencraft.site (Vercel — Next.js 15)
 │         │
 │         ▼
 └── api.pencraft.site (AWS EC2 — Express + Nginx + SSL)
               │
               ▼
        AWS RDS PostgreSQL
               │
               ▼
          Cloudinary (Images)
          Resend (Emails)
```

---

## 🛠️ Tech Stack

### Backend

| Technology             | Purpose                     |
| ---------------------- | --------------------------- |
| Node.js + Express      | REST API Server             |
| TypeScript             | Type Safety                 |
| PostgreSQL + Prisma    | Database & ORM              |
| JWT + httpOnly Cookies | Authentication              |
| Bcrypt                 | Password Hashing            |
| SHA256                 | Refresh Token & OTP Hashing |
| Cloudinary             | Image Storage & CDN         |
| Resend                 | Email Service (OTP, Alerts) |
| Winston + Morgan       | Structured Logging          |
| Swagger UI             | API Documentation           |
| Zod                    | Request Validation          |
| express-rate-limit     | Rate Limiting               |
| Vitest                 | Unit Testing                |
| PM2                    | Process Management          |

### Frontend

| Technology              | Purpose                     |
| ----------------------- | --------------------------- |
| Next.js 15 (App Router) | React Framework             |
| TypeScript              | Type Safety                 |
| Tailwind CSS v4         | Styling                     |
| shadcn/ui               | UI Component Library        |
| Axios + Interceptors    | HTTP Client & Token Refresh |
| next-themes             | Dark / Light Mode           |
| react-hot-toast         | Toast Notifications         |

### Infrastructure

| Service       | Purpose              |
| ------------- | -------------------- |
| AWS EC2       | Backend Server       |
| AWS RDS       | PostgreSQL Database  |
| Vercel        | Frontend Hosting     |
| Nginx         | Reverse Proxy        |
| Let's Encrypt | Free SSL Certificate |
| Namecheap     | Custom Domain        |

---

## ✨ Features

### 🔐 Authentication & Security

- Email OTP Two-Factor Authentication (2FA)
- JWT Access Token + Refresh Token with rotation
- Reuse Detection — force logout if stolen token is used
- httpOnly Cookies — protected from XSS attacks
- Rate Limiting — brute force protection on auth routes
- Suspicious login email alerts
- Activity log with IP address and device tracking
- Logout single device or all devices

### 📝 Blog

- Create, Read, Update, Delete posts
- Image upload via Cloudinary with automatic cleanup on delete
- Comments system with ownership validation
- Pagination and Search on posts
- Owner-only edit and delete buttons
- Author info on every post

### 🎨 Frontend

- Modern, fully responsive UI (mobile + desktop)
- Dark / Light mode with system preference detection
- Loading skeletons for better UX
- Toast notifications for feedback
- SEO meta tags and OpenGraph support
- Protected routes via Next.js middleware
- Auto token refresh via Axios interceptor
- Profile page with activity log and stats

---

## 📁 Project Structure

```
pencraft/
├── backend/                      # Express REST API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/             # Register, Login, OTP, Logout
│   │   │   ├── post/             # CRUD + Image Upload
│   │   │   └── comment/          # CRUD with ownership
│   │   ├── middlewares/          # Auth, Validation, Rate Limit
│   │   ├── utils/                # JWT, Bcrypt, Email, OTP helpers
│   │   ├── lib/                  # Prisma client, Cloudinary, Logger
│   │   └── config/               # Env config, Swagger setup
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Migration history
│   ├── prisma.config.ts
│   └── app.ts
│
└── frontend/                     # Next.js App
    ├── app/
    │   ├── (auth)/               # Login, Register, Verify OTP
    │   ├── posts/                # Blog listing, detail, create, edit
    │   ├── profile/              # User profile + activity
    │   └── api/                  # Next.js API routes
    ├── components/               # Navbar, Skeleton, ThemeToggle
    ├── context/                  # Auth context (global user state)
    ├── lib/                      # Axios API client
    └── middleware.ts             # Route protection
```

---

## 🏃 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pencraft
JWT_ACCESS_TOKEN_SECRET=your_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRES_IN=24h
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
RESEND_API_KEY=your_resend_key
FROM_EMAIL=onboarding@resend.dev
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=5000
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

```
✓ AuthService (5)
  ✓ registerUser (2)
    ✓ should throw error if username already exists
    ✓ should throw error if email already exists
  ✓ loginUser (2)
    ✓ should throw error if user not found
    ✓ should throw error if password is wrong
  ✓ logout (1)
    ✓ should throw error if refresh token not found

Test Files  1 passed (1)
Tests       5 passed (5)
```

---

## ☁️ Production Deployment

### Backend (AWS EC2 + Nginx + SSL)

```bash
# EC2 pe SSH karo
ssh -i key.pem ubuntu@your-ec2-ip

# Repo clone karo
git clone https://github.com/moizmalik13588/blog-app.git
cd blog-app/backend

# Dependencies install karo
npm install

# Build karo
npm run build
cp -r generated dist/generated

# PM2 se start karo
pm2 start dist/index.js --name "pencraft-backend"
pm2 startup
pm2 save

# Nginx + SSL setup
sudo apt install nginx certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Frontend (Vercel)

1. GitHub repo connect karo Vercel pe
2. Root Directory: `frontend` set karo
3. Environment Variables add karo:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```
4. Deploy!

---

## 🔒 Security Highlights

| Feature                | Implementation                      |
| ---------------------- | ----------------------------------- |
| Password Storage       | bcrypt (10 rounds)                  |
| Refresh Token Storage  | SHA256 hashed in DB                 |
| OTP Storage            | SHA256 hashed in DB                 |
| Cookie Security        | httpOnly + Secure + SameSite=None   |
| Token Strategy         | Rotation + Reuse Detection          |
| Brute Force Protection | Rate limiting (5 attempts / 15 min) |
| XSS Protection         | httpOnly cookies                    |
| CSRF Protection        | SameSite cookie policy              |
| HTTPS                  | Let's Encrypt SSL                   |

---

## 📖 API Documentation

After running the backend, visit:

```
http://localhost:5000/api-docs
```

Or in production:

```
https://api.pencraft.site/api-docs
```

---

## 📄 License

MIT License — feel free to use this project for learning or building upon it.

---

## 👨‍💻 Author

**Muhammad Moiz**  
BSCS Student — Sindh Madressatul Islam University (SMIU), Karachi  
GitHub: [@moizmalik13588](https://github.com/moizmalik13588)  
Live: [pencraft.site](https://pencraft.site)
