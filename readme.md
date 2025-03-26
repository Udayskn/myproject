# MyProject

Detailed Doc : https://docs.google.com/document/d/1V9L88cr22HUJLLwWED997NdkmIDA9OfixUgOvrKO3oM/edit?usp=sharing
## Overview
This project consists of a **Django REST API backend** and a **React (Vite) frontend** for managing student details and CGPA.

## Prerequisites
Ensure you have the following installed:
- **Python 3.x**
- **Node.js & npm**
- **PostgreSQL** (for Django database)

---

## Backend Setup (Django)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Udayskn/myproject.git
cd myproject
```

### 2️⃣ Set Up a Virtual Environment
```sh
python -m venv venv
source venv/bin/activate   # On Windows use: venv\Scripts\activate
```

### 3️⃣ Install Dependencies
```sh
pip install -r backend\requirements.txt
```

### 4️⃣ Configure PostgreSQL Database
1. **Ensure PostgreSQL is running**.
2. Create a database and update `settings.py`:(Or you can use existing database credintials)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 5️⃣ Apply Migrations & Create Superuser
```sh
python manage.py makemigrations
python manage.py migrate
```

### 6️⃣ Run the Django Server
```sh
python manage.py runserver
```
Backend should now be running at **http://127.0.0.1:8000/**.

---

## Frontend Setup (React + Vite)

### 1️⃣ Navigate to the Frontend Directory
```sh
cd frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure API Proxy (Vite)
Modify `vite.config.js` to forward API requests to Django:
```javascript
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### 4️⃣ Start the Frontend Server
```sh
npm run dev
```
Frontend will be available at **http://localhost:5173/**.

---



## API Endpoints
| Method | Endpoint         | Description          |
|--------|----------------|---------------------|
| GET    | `/api/students/` | List all students  |
| POST   | `/api/students/` | Create a student   |
| PUT    | `/api/students/{id}/` | Update a student  |
| DELETE | `/api/students/{id}/` | Delete a student  |

---

## Troubleshooting
- **Database errors?** Ensure PostgreSQL is running.
- **CORS issues?** Use the proxy in `vite.config.js`.
- **Frontend not updating?** Restart `npm run dev`.

---


---

**🚀 Now you’re ready to go!** If you have any issues, feel free to contribute or report an issue. 😊

