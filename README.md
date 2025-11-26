# 📘 CashBook App

A simple CashBook application to manage income and expenses.  
Built using **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**.

## 🚀 Features
- Add / Edit / Delete entries  
- Income & Expense tracking  
- Category management  
- JWT authentication  
- Pagination  
- Responsive UI  

## 🛠 Setup

### Backend

```bash
cd server
npm install
```

Install & start MongoDB (https://www.mongodb.com/try/download/community)

Create .env with:

```bash
PORT=4003
MONGO_URI=mongodb://127.0.0.1:27017/cashbook
JWT_SECRET=your-secret-key
```

```bash
npm run dev
```

### Frontend

```bash
cd ../client
npm install
npm run dev
```