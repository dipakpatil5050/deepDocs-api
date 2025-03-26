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

## API Routes

### Authentication Routes (/auth)

### Register User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Authentication Required:** No
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```

### Login User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Login user and get authentication token.
- **Authentication Required:** No
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Logout User

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Description:** Logout user.
- **Authentication Required:** Yes

## User Routes (/users)

### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Get list of all users.
- **Authentication Required:** No

### Get User by ID

- **URL:** `/users/:id`
- **Method:** `GET`
- **Description:** Get user details by ID.
- **Authentication Required:** Yes

### Create User

- **URL:** `/users`
- **Method:** `POST`
- **Description:** Create a new user.
- **Authentication Required:** No
- **Status:** Not implemented (placeholder endpoint)

### Update User

- **URL:** `/users/:id`
- **Method:** `PUT`
- **Description:** Update user details.
- **Authentication Required:** Yes
- **Status:** Not implemented (placeholder endpoint)

### Delete User

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Description:** Delete a user.
- **Authentication Required:** Yes
- **Status:** Not implemented (placeholder endpoint)

## Card Routes (/cards)

### Create Card

- **URL:** `/cards`
- **Method:** `POST`
- **Description:** Create a new card/note.
- **Authentication Required:** Yes

### Get All Cards

- **URL:** `/cards`
- **Method:** `GET`
- **Description:** Get all cards for the authenticated user.
- **Authentication Required:** Yes

### Get Card by ID

- **URL:** `/cards/:id`
- **Method:** `GET`
- **Description:** Get specific card details.
- **Authentication Required:** Yes

### Update Card

- **URL:** `/cards/:id`
- **Method:** `PUT`
- **Description:** Update card details.
- **Authentication Required:** Yes

### Move Card to Trash

- **URL:** `/cards/:id`
- **Method:** `DELETE`
- **Description:** Move a card to trash.
- **Authentication Required:** Yes

### Restore Card from Trash

- **URL:** `/cards/:id/restore`
- **Method:** `PATCH`
- **Description:** Restore a card from trash.
- **Authentication Required:** Yes

### Empty Trash

- **URL:** `/cards/trash/empty`
- **Method:** `DELETE`
- **Description:** Permanently delete all cards in trash.
- **Authentication Required:** Yes

### Get Trash Cards

- **URL:** `/cards/trash`
- **Method:** `GET`
- **Description:** Get all cards in trash.
- **Authentication Required:** Yes

## Root Routes

### Welcome Message

- **URL:** `/`
- **Method:** `GET`
- **Description:** Get welcome message.
- **Authentication Required:** No

### 404 Not Found

- **URL:** `*`
- **Method:** `GET`
- **Description:** Handle undefined routes.
- **Authentication Required:** No
