# BlogApp 📝

A full-stack production-grade blog application built with **Node.js**, **Next.js**, **PostgreSQL**, and **TypeScript**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20+-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)

---

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| Frontend | Coming soon |
| Backend API | Coming soon |
| API Docs (Swagger) | Coming soon |

---

## 📸 Preview

> Screenshots will be added after deployment.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API Server |
| TypeScript | Type Safety |
| PostgreSQL + Prisma | Database & ORM |
| JWT + httpOnly Cookies | Authentication |
| Bcrypt | Password Hashing |
| SHA256 | Refresh Token Hashing |
| Cloudinary | Image Storage |
| Resend | Email Service (OTP, Alerts) |
| Winston + Morgan | Logging |
| Docker | Containerization |
| Swagger UI | API Documentation |
| Vitest | Unit Testing |
| Zod | Request Validation |
| express-rate-limit | Rate Limiting |

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI Component Library |
| Axios + Interceptors | HTTP Client & Token Refresh |
| next-themes | Dark / Light Mode |
| react-hot-toast | Toast Notifications |

---

## ✨ Features

### 🔐 Authentication & Security
- Email OTP **Two-Factor Authentication (2FA)**
- JWT Access Token (15 min) + Refresh Token (7 days)
- **Token Rotation** — new refresh token on every use
- **Reuse Detection** — force logout if stolen token is used
- **httpOnly Cookies** — protected from XSS attacks
- **Rate Limiting** — brute force protection on auth routes
- Suspicious login **email alerts**
- **Activity log** with IP address and device tracking
- Logout single device or all devices

### 📝 Blog
- Create, Read, Update, Delete posts
- **Image upload** via Cloudinary with automatic cleanup on delete
- **Comments** system with owner validation
- **Pagination** and **Search** on posts
- Owner-only edit and delete buttons

### 🎨 Frontend
- Modern, fully **responsive** UI (mobile + desktop)
- **Dark / Light mode** with system preference detection
- **Loading skeletons** for better UX
- **Toast notifications** for success and error feedback
- **SEO** meta tags and OpenGraph support
- **Protected routes** via Next.js middleware
- **Auto token refresh** via Axios interceptor
- Custom **404** and **500** error pages
- Profile page with activity log and stats

---

## 📁 Project Structure

```
blogapp/
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
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── vitest.config.ts
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
- Docker (optional)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/blogapp
JWT_ACCESS_TOKEN_SECRET=your_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
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

## 🐳 Docker Setup

```bash
cd backend
docker-compose up --build
```

This will start:
- **App** on port `5000`
- **PostgreSQL** on port `5432`

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

---

## 📖 API Documentation

After running the backend, visit:

```
http://localhost:5000/api-docs
```

---

## 🔒 Security Highlights

| Feature | Implementation |
|---------|---------------|
| Password Storage | bcrypt (10 rounds) |
| Refresh Token Storage | SHA256 hashed in DB |
| OTP Storage | SHA256 hashed in DB |
| Cookie Security | httpOnly + Secure + SameSite |
| Token Strategy | Rotation + Reuse Detection |
| Brute Force | Rate limiting (5 attempts / 15 min) |
| XSS | httpOnly cookies |
| CSRF | SameSite cookie policy |

---

## 📄 License

MIT License — feel free to use this project for learning or building upon it.

---

## 👨‍💻 Author

**Muhammad Moiz**  
BSCS Student — Sindh Madressatul Islam University (SMIU), Karachi  
GitHub: [@moizmalik13588](https://github.com/moizmalik13588)
