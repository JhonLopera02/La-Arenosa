#  CinePolis - Cinema Management System

CinePolis is a modern web application (SPA - Single Page Application) designed for the comprehensive management of a cinema chain. It allows for the administration of films, theaters, and showtimes, as well as a real-time booking system for end users, all within a premium aesthetic with support for dark and light modes.

---

## 🌟 Main Features

### 🍿 For Users (Customers)
* **Dynamic Features:** Display of available screenings with posters, genres, and showtimes.

* **Real-Time Booking:** Seat selection system with automatic assignment.

* **Booking Management:** Purchase history, seat modification, or cancellation (before the show starts).

* **Dark/Light Mode:** Adaptive interface with browser preference persistence.

### 🏛️ For Administrators (Staff)
* **Administrative Panel:** Quick metrics and user/role management.

* **Movie Catalog:** Complete CRUD functionality for movies with synopses, runtimes, and ratings.

* **Room Management:** Room configuration and seating capacity.

* **Function Control:** Scheduling, pricing, and cancellations.

---

## 🛠️ Technologies Used

* **Frontend:** Vanilla JavaScript (ES6+), Vite, Tailwind CSS v4 (Component-based architecture).

* **Backend:** `json-server` (REST API simulation for data persistence).

* **Routing:** Custom SPA routing system with support for protected routes and roles.

* **Persistence:** LocalStorage for sessions and themes, `db.json` for master data.

---

## 🚀 Installation and Use

### 📋 Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn

### 🔧 Configuration Steps

1. **Clone the project:**
```bash
git clone <repository-url>
cd CinePolis
```

2. **Install Frontend dependencies:**
```bash
cd client
npm install
```

3. **Start the API server (Backend):**
Open a new terminal in the project root and run:
```bash
cd api
npx json-server --watch database/db.json --port 3000
```

4. **Start the development environment (Frontend):**
In the terminal that You opened the `client` folder and ran:

``bash

`npm run dev`

``

5. **Accessing the application:**

Open your browser and go to `http://localhost:5173`.

---

## 🔒 Test Credentials

| Role | Email | Password |

| :--- | :--- | :--- |

| **Administrator** | `cesarvega@gmail.com` | `123456` |

| **Standard User** | `cesar10@gmail.com` | `123456` |


---

## 📁 Project Structure

```text
├── api/
│ └── database/
│ └── db.json # Master JSON database
├── client/
│ ├── src/
│ │ ├── services/ # API connection logic (Auth, Movies, Reservations)
│ │ ├── views/ # UI components and view logic
│ │ ├── utils/ # Utilities (Themes, Validations)
│ │ ├── router/ # Route and security configuration
│ │ └── styles/ # Global Styles and Tailwind
│ └── index.html # Main Entry Point
```

---

## ✨ Credits
Developed as a comprehensive solution for modernizing film management systems.