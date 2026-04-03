🚀 AI E-Book Creator

An AI-powered full-stack application that enables users to generate, manage, and export eBooks seamlessly using modern web technologies.

🔗 Live Demo: https://ai-powered-ebook-creator.netlify.app/

---

✨ Features

- 🔐 Secure Authentication (JWT-based Signup/Login)
- 📚 Create, edit, and manage eBooks
- 🤖 AI-generated book outlines and chapters
- 🖼️ Upload and update book cover images
- 📤 Export eBooks as PDF
- ⚡ Smooth UX with toast notifications
- 📱 Fully responsive UI

---

🛠️ Tech Stack

Frontend

- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)

Deployment

- Frontend: Netlify
- Backend: Render

---

🧠 System Overview

This application follows a client-server architecture:

- Frontend communicates with backend via REST APIs
- Backend handles authentication, business logic, and data persistence
- MongoDB stores user and book data
- Multer handles file uploads for book covers
- AI logic generates structured book content dynamically

---

## 📁 Project Structure

```bash
AI-EBOOK-CREATOR/
│
├── backend/                     # Express backend
│   ├── config/                  # Configuration files (DB, cloud, etc.)
│   ├── controllers/             # Route controllers (business logic)
│   ├── middlewares/             # Custom middlewares (auth, error handling)
│   ├── models/                  # Mongoose models
│   ├── routes/                  # API routes
│   ├── uploads/                 # Temporary/local uploads
│   ├── server.js                # Entry point of backend
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── AI-ebook-Creator/
│       ├── public/              # Static assets
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   ├── utils/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       │
│       ├── index.html
│       ├── package.json
│       ├── eslint.config.js
│       └── .gitignore
```
---

⚙️ Setup Instructions

1. Clone Repository

git clone https://github.com/anubhavsha45/AI-EBOOK-CREATOR.git
cd AI-EBOOK-CREATOR

---

2. Backend Setup

cd backend
npm install

Create ".env" file:

PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Run server:

npm start

---

3. Frontend Setup

cd frontend/AI-ebook-Creator
npm install
npm run dev

---

🌐 Environment Variables

Backend (.env)

- MONGO_URI
- JWT_SECRET
- PORT

---

🚀 Deployment

Frontend (Netlify)

- Build command: "npm run build"
- Publish directory: "dist"

Backend (Render)

- Start command: "node server.js"

---

🧠 Key Learnings

- Designing full-stack applications
- REST API development & integration
- JWT-based authentication
- File handling with Multer
- Deployment on Netlify & Render
- Debugging real-world production issues

---

👨‍💻 Author

Anubhav Sharma

- GitHub: https://github.com/anubhavsha45

---

⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

If you like this project, give it a ⭐ on GitHub!
