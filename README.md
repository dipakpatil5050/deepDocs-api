# DeepDocs 📝

A minimal and powerful note-taking app, inspired by Google Keep. Easily manage your to-do lists and notes with a clean UI, auto-saving, and organization features.

## 🚀 Features

✔ **Authentication** - Secure login/signup with JWT  
✔ **Create, Read, Update, Delete (CRUD) Notes**  
✔ **Archive & Trash System** - Restore or auto-delete notes after 7 days  
✔ **Dark Mode** - Toggle light/dark themes

## 🚀 Upcoming features

✔ **Drag & Drop** - Reorder notes for better organization  
✔ **Pinned Notes** - Keep important notes at the top  
✔ **Background Colors** - Customize note appearance  
✔ **Auto-Save Notes** - Edits are saved automatically  
✔ **Search & Filtering** - Find notes quickly  
✔ **Responsive Design** - Works on all devices

---

## 🔧 Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT, Passport.js
- **Deployment:** Frontend (Vercel), Backend (Render)

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/dipakpatil5050/deepdocs.git
cd deepdocs

```

### **2️⃣ Backend Setup**

```bash
cd backend
npm install
```

### **3️⃣ Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### **Auth Routes**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get logged-in user details

### **Card (Note) Routes**

- `POST /api/cards` - Create a new note
- `GET /api/cards` - Get all active & archived notes
- `GET /api/cards/:id` - Get a single note
- `PUT /api/cards/:id` - Update a note
- `DELETE /api/cards/:id` - Move a note to Trash
- `GET /api/cards/trash` - Get all trashed notes
- `PUT /api/cards/restore/:id` - Restore a note from Trash
- `DELETE /api/cards/empty-trash` - Permanently delete all trashed notes

---

## 🎨 UI Screenshots

> Coming soon after launch!

---

## 🤝 Contributing

Feel free to fork this repo and contribute! 🎉

---

## 📢 Contact & Support

Follow the project updates on [Twitter](https://twitter.com/thedipakpatil) & [LinkedIn](https://linkedin.com/in/dipakpatil5050)
