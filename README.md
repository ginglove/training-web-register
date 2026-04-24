# TrainIQ - Corporate Training and Examination System

TrainIQ is a premium, glassmorphic web application designed for corporate training and examination management. Built with Next.js 14, Prisma, and PostgreSQL.

## 🚀 Features

- **Standardized UI**: Clean, modern interface matching SRS requirements.
- **Role-based Access**: Admin, Manager, and Member roles.
- **Exam Management**: Create, edit, and organize exam papers with a question bank.
- **Session Control**: Schedule and manage exam sessions with unique access codes.
- **Reports & Analytics**: Real-time statistics on training performance.
- **Responsive Design**: Optimized for all devices.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Styling**: Vanilla CSS (Premium Custom Design)
- **Authentication**: JWT-based Secure Auth

---

## 🏗 Deployment Guide (Vercel + Neon)

### 1. Database Setup (Neon)

1. Sign up at [Neon.tech](https://neon.tech).
2. Create a new project and a database (e.g., `trainiq`).
3. Copy the **Connection String** (it should look like `postgresql://user:password@host/dbname?sslmode=require`).

### 2. Deployment Setup (Vercel)

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New"** -> **"Project"**.
3. Import your repository.
4. In the **Environment Variables** section, add the following:

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `DIRECT_URL` | Same as `DATABASE_URL` (if needed for migrations) |
| `JWT_SECRET` | A random secure string (e.g., `openssl rand -base64 32`) |

5. Click **"Deploy"**.

### 3. Initialize Database (Post-Deployment)

Once the deployment is finished, you need to push your schema and seed data to the production database. You can do this from your local machine:

```bash
# Push schema to Neon
npx prisma db push

# (Optional) Seed initial data (Admin accounts, categories, etc.)
node prisma/seed.js
```

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd demo_web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/trainiq"
   JWT_SECRET="your-local-secret"
   ```

4. **Run Migrations**:
   ```bash
   npx prisma db push
   ```

5. **Start Dev Server**:
   ```bash
   npm run dev
   ```

---

## 📖 System Localization
The system is localized in **Vietnamese** to match corporate requirements. Key terminology:
- **Kỳ thi**: Exam Sessions
- **Đề thi**: Exam Papers
- **Câu hỏi**: Questions
- **Danh mục**: Categories
- **Báo cáo**: Reports

---

## ⚖️ License
Internal Use Only - TrainIQ Training System.
