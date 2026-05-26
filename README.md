# 🕊️ LegacyCare – Dignified End-of-Life & Funeral Planning Platform

A secure, respectful, and structured digital platform that allows individuals to pre-plan funeral arrangements and last rites.

---

## 🚀 How to Run the Project

### Step 1: Clone or Extract the Project
```bash
cd legacycare
```

---

### Step 2: Setup Backend (Server)

```bash
cd server
npm install
```

Create `.env` file in `/server`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=legacycare_super_secret_key_2025
```

Run server:
```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

### Step 3: Setup Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 📁 Project Structure

```
legacycare/
├── client/                  # React.js Frontend
│   ├── src/
│   │   ├── components/      # Navbar, Footer, Loader
│   │   ├── pages/           # All pages
│   │   ├── context/         # AuthContext
│   │   ├── services/        # API calls
│   │   └── utils/           # ProtectedRoute
│   └── package.json
│
├── server/                  # Node.js Backend
│   ├── config/              # MongoDB connection
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & Role middleware
│   └── server.js
│
└── README.md
```

---

## 🔑 User Roles

| Role | Access |
|------|--------|
| `user` | Create & manage funeral plan, add nominee |
| `provider` | Register as service provider |
| `nominee` | Access plan via access code |
| `admin` | Verify providers, manage users, view stats |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| File Upload | Multer |
| Deployment | Vercel (client) + Render (server) |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile |
| PUT | `/api/auth/profile` | Update profile |

### Plans
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/plans` | Create plan |
| GET | `/api/plans/my` | Get my plan |
| PUT | `/api/plans/:id` | Update plan |
| DELETE | `/api/plans/:id` | Delete plan |

### Providers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/providers` | Get all providers |
| POST | `/api/providers` | Register as provider |
| PUT | `/api/providers/:id` | Update provider |

### Nominees
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/nominees` | Add nominee |
| GET | `/api/nominees/my` | Get my nominee |
| POST | `/api/nominees/access` | Access via code |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform stats |
| GET | `/api/admin/users` | All users |
| DELETE | `/api/admin/users/:id` | Delete user |
| PUT | `/api/admin/providers/:id/verify` | Verify provider |

---

## ✅ Features Implemented

- [x] User Registration & Login (JWT)
- [x] Role-based Access Control
- [x] Create & Update Funeral Plan
- [x] Service Provider Listings
- [x] Nominee Assignment & Access Code
- [x] Admin Dashboard with Stats
- [x] Provider Verification by Admin
- [x] Responsive UI with Tailwind CSS

---

**Built with ❤️ for LegacyCare – Unified Mentor Internship Project**
