# SDA Metadata Portal

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 📌 Overview

The **SDA Metadata Portal** is a full-stack web application built for the State Data Authority (UP).  
It enables government departments to:

- Register datasets
- Discover datasets
- Filter and search metadata efficiently

This project demonstrates a complete **frontend + backend integration using REST APIs**.

---

## 🚀 Features

### 📊 Dataset Discovery Portal
- Search datasets by title and description
- Filter by sector, classification, department, and status
- View dataset cards with key metadata
- Click to view full dataset details
- Live count of filtered results

### 📝 Dataset Registration
- Create new dataset entries
- Multi-select data formats (CSV, JSON, XLSX, etc.)
- Tag input (comma-separated)
- Form validation before submission
- Success and error alerts
- Reset form after successful submission

### ⚙️ Backend API
- REST API built using Express.js
- JSON file used as in-memory database
- Filtering support (sector, classification, status, search, department)
- Dataset creation endpoint (POST)
- Single dataset fetch by ID

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- CORS middleware

### Data Storage
- Static JSON file (`seed_datasets.json`)

---

## 📁 Project Structure
sda-metadata-portal/
│
├── backend/
│ ├── src/
│ │ ├── server.js
│ │ ├── routes/
│ │ ├── controllers/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── App.jsx
│
├── data/
│ └── seed_datasets.json
│
└── README.md


---

## ⚙️ How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/sda-metadata-portal.git
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs at:http://localhost:5050

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:http://localhost:5173

### 🔌 API Reference
Get All Datasets
```bash
GET /api/datasets
```

| Param          | Description                        |
| -------------- | ---------------------------------- |
| sector         | Filter by sector                   |
| classification | Public / Restricted / Confidential |
| search         | Search in title + description      |
| department     | Filter by department               |

Get Dataset by ID
```bash
GET /api/datasets/:id
```

Create Dataset
```bash
POST /api/datasets
```

Required fields:
```bash
{
  "title": "",
  "department": "",
  "sector": "",
  "formats": [],
  "update_frequency": "",
  "description": "",
  "classification": ""
}
```

### 🧠 Design Decisions
Used in-memory JSON file instead of database to keep setup simple,
Built separate API layer (controllers/routes) for scalability,
Used React state filtering + backend filtering together,
Added form validation both frontend + backend,
Used query params instead of multiple endpoints for filtering

### 🚀 Improvements (If More Time)
Add database (MongoDB/PostgreSQL),
Add authentication (admin vs user roles),
Pagination for large datasets,
Better UI (charts + analytics dashboard),
File upload support for datasets,
Deploy backend + frontend separately

### 📌 Status
✔ Backend API completed
✔ Frontend completed
✔ Filtering + search working
✔ Dataset registration working
✔ Ready for submission


