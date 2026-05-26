# 🕊️ LegacyCare – Dignified End-of-Life & Funeral Planning Platform

<div align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### 🌐 [Live Demo](https://legacycare-frontend.vercel.app) | ⚙️ [Backend API](https://legacycare-alpha.vercel.app) | 📁 [GitHub](https://github.com/Sarika-stack23/legacycare)

</div>

---

## 📌 About The Project

**LegacyCare** is a secure, respectful, and structured digital platform that allows individuals to **pre-plan funeral arrangements and last rites** according to their personal, cultural, and religious preferences — ensuring dignity, clarity, and peace of mind for both the individual and their loved ones.

> 🏆 **Unified Mentor Internship Project** | Domain: MERN Stack | Sub Domain: Family & Care Management

---

## 🖥️ Live Links

| Service | URL |
|---------|-----|
| 🌐 Frontend | [legacycare-frontend.vercel.app](https://legacycare-frontend.vercel.app) |
| ⚙️ Backend API | [legacycare-alpha.vercel.app](https://legacycare-alpha.vercel.app) |
| 📁 GitHub | [Sarika-stack23/legacycare](https://github.com/Sarika-stack23/legacycare) |

---

## ✨ Features

### 👤 User Features
- Secure Registration and Login with JWT Authentication
- Create and Update Funeral Plan
- Select Ritual Type (Religious / Non-Religious / Custom)
- Add Ceremony Instructions (Music, Prayers, Customs)
- Budget Estimation
- Upload Important Documents (Will, Insurance, Photos)
- Assign Nominee with Unique Access Code
- Edit Profile and Change Password

### 🤝 Service Provider Features
- Register as Service Provider
- List Services with Pricing
- Manage Availability
- Admin Verification System

### 👨‍👩‍👧 Nominee Features
- Access Funeral Plan via Unique Code
- View Complete Plan Details
- Contact Service Providers

### 🛡️ Admin Features
- View Platform Statistics
- Manage All Users
- Verify Service Providers
- Monitor Platform Usage

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| File Upload | Multer |
| State Management | React Context API |
| Deployment | Vercel |

---

## 📁 Project Structure

```
legacycare/
├── client/                          # React.js Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreatePlan.jsx
│   │   │   ├── ServiceProviders.jsx
│   │   │   ├── NomineeAccess.jsx
│   │   │   ├── DocumentUpload.jsx
│   │   │   ├── ProviderRegister.jsx
│   │   │   ├── ViewPlan.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── utils/
│   │       └── ProtectedRoute.jsx
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── FuneralPlan.js
│   │   ├── ServiceProvider.js
│   │   ├── Nominee.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── planRoutes.js
│   │   ├── providerRoutes.js
│   │   ├── nomineeRoutes.js
│   │   ├── documentRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── seed.js
│   ├── createAdmin.js
│   ├── vercel.json
│   └── server.js
│
└── README.md
```

---

## 🔑 User Roles

| Role | Access |
|------|--------|
| `user` | Create and manage funeral plan, add nominee, upload documents |
| `provider` | Register as service provider, manage listings |
| `nominee` | Access plan via unique access code |
| `admin` | Verify providers, manage users, view platform stats |

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
| POST | `/api/providers` | Register provider |
| PUT | `/api/providers/:id` | Update provider |

### Nominees
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/nominees` | Add nominee |
| GET | `/api/nominees/my` | Get my nominee |
| POST | `/api/nominees/access` | Access via code |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/documents` | Get my documents |
| POST | `/api/documents` | Upload document |
| DELETE | `/api/documents/:id` | Delete document |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform stats |
| GET | `/api/admin/users` | All users |
| DELETE | `/api/admin/users/:id` | Delete user |
| PUT | `/api/admin/providers/:id/verify` | Verify provider |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/Sarika-stack23/legacycare.git
cd legacycare
```

### Step 2: Setup Backend
```bash
cd server
npm install
```

Create `.env` in `/server`:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=legacycare_super_secret_key_2025
```

```bash
npm run dev
```

### Step 3: Setup Frontend
```bash
cd client
npm install
```

Create `.env` in `/client`:
```env
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

### Step 4: Add Seed Data
```bash
cd server
node seed.js
node createAdmin.js
```

---

## 🧪 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@legacycare.com | Admin@123 |

---

## 🌟 Key Highlights

- 🔒 **Secure** — JWT + Role-based access control
- 🎯 **Unique** — Only platform for dignified end-of-life planning
- 📱 **Responsive** — Works on all devices
- 🌏 **Cultural** — Supports all religions and customs
- 💰 **Budget Clarity** — Transparent pricing
- 🔑 **Nominee System** — Unique access code for family

---

## 👩‍💻 Developer

**Sarika Jivrajika**
- GitHub: [@Sarika-stack23](https://github.com/Sarika-stack23)

---

<div align="center">

**Built with ❤️ for LegacyCare – Unified Mentor Internship Project**

🕊️ *Helping families plan with dignity and peace of mind*

</div>