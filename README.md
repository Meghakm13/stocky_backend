# 📈 Stocky Backend

Stocky is a hypothetical company where users can earn **shares of Indian stocks** (e.g., Reliance, TCS, Infosys) as incentives for actions like onboarding, referrals, or trading milestones.

This project is a backend system built with **Node.js + Express + Prisma + SQLite**.

---

## 🚀 Features
- REST APIs for:
  - `POST /reward` → Record stock rewards for a user
  - `GET /today-stocks/{userId}` → Get today’s stock rewards
  - `GET /historical-inr/{userId}` → Get INR valuation of past rewards (up to yesterday)
  - `GET /stats/{userId}` → Get today’s shares & current INR value
  - `GET /portfolio/{userId}` → Get current holdings by stock
- **SQLite Database** via Prisma ORM
- **Double-entry ledger** tracking company outflows & fees
- **Random price service** (mocked stock price fetcher)
- **Swagger Docs** at `/docs`
- **Seeding** with 10 realistic records for testing

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** SQLite (via Prisma ORM)
- **Docs:** Swagger (swagger-ui-express + swagger-jsdoc)
- **Dev tools:** Nodemon, Prisma Studio

---

## ⚡ Getting Started

### 1. Clone Repo
```bash
git clone <your-repo-url>
cd stocky_backend
