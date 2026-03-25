# 🚀 AI E-Book Creator

An AI-powered full-stack web application that allows users to generate, manage, and export eBooks effortlessly.

🔗 Live Demo: https://ai-powered-ebook-creator.netlify.app/

--- 
## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 📚 Create and manage eBooks
- 🤖 AI-generated book outlines and chapters
- 🖼️ Upload and update book cover images
- ✏️ Edit and delete books as per requirement
- 📤 Export eBooks (PDF)
- 📱 Fully responsive UI
- ⚡ Smooth user experience with toast notifications

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (for file uploads)

### Deployment
- Frontend: Netlify
- Backend: Render

---

## 📁 Project Structure

AI-EBOOK-CREATOR/
│
├── backend/          # Express server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
│
├── frontend/
│   └── AI-ebook-Creator/
│       ├── src/
│       ├── components/
│       ├── pages/
│       └── utils/

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/anubhavsha45/AI-EBOOK-CREATOR.git
cd AI-EBOOK-CREATOR

---

### 2. Setup Backend

cd backend
npm install

Create a .env file:

PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Run server:

npm start

---

### 3. Setup Frontend

cd frontend/AI-ebook-Creator
npm install
npm run dev

---

## 🌐 Environment Variables

### Backend (.env)

- MONGO_URI
- JWT_SECRET
- PORT

---

## 🚀 Deployment

### Frontend (Netlify)
- Build command: npm run build
- Publish directory: dist

### Backend (Render)
- Start command: node server.js

---

## 🧠 Key Learnings

- Full-stack application deployment
- REST API integration
- Authentication using JWT
- Handling file uploads
- Debugging production issues
- Client-side routing (React + Netlify fix)

---

## 👨‍💻 Author

Anubhav Sharma

- GitHub: https://github.com/anubhavsha45

---

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
