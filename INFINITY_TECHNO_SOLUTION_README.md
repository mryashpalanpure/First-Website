# 🌐 INFINITY TECHNO SOLUTION – Full Stack Dynamic Website (PHP + MySQL)

A **fully responsive and dynamic multi-page website** built for **INFINITY TECHNO SOLUTION**,  
a technology company specializing in **licensed software** and **premium hardware** supplies.  
This project integrates a **modern frontend** with a **powerful backend** built using **PHP and MySQL**,  
providing real-time form handling and data storage.

---

## 🏗️ Project Overview

This website is designed to showcase products, services, and client information,  
along with a working contact/inquiry form that stores user data in a MySQL database.  
It demonstrates **frontend design**, **backend integration**, and **database management** —  
ideal for real-world business use.

---

## 🌟 Features

### 🎨 Frontend
- Clean and **modern UI** with gradient backgrounds and animations  
- **Responsive navigation bar** with infinity logo  
- **Multi-page design** (Home, About, Products, Clients, Contact)  
- **Smooth scroll and hover animations** using JavaScript  
- Optimized for **desktop, tablet, and mobile** screens  

### ⚙️ Backend (PHP)
- **Server-side scripting** for form processing and validation  
- Handles **user inquiries** and stores them securely in MySQL  
- **Success and error messages** dynamically displayed to users  
- Uses **POST method** for secure data transfer  

### 🧮 Database (MySQL)
- **Structured schema** for storing contact and inquiry data  
- **MySQLi** (or PDO) used for secure and fast database operations  
- **Prepared statements** to prevent SQL Injection  
- Sample tables:
  - `contacts` → stores inquiry details (name, email, phone, message)
  - `products` → stores product info and categories
  - `clients` → stores client logos and testimonials

---

## 🛠️ Tech Stack

| Layer | Technology |
|:--|:--|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Font Awesome, Google Fonts |
| **Backend** | PHP (v8.x Recommended) |
| **Database** | MySQL |
| **Server** | Apache (via XAMPP / WAMP) |
| **Version Control** | Git & GitHub |

---

## 📁 Project Folder Structure

```
infinity-techno-solution/
│
├── index.html
├── about.html
├── products.html
├── clients.html
├── contact.html
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
│
├── backend/
│   ├── db.php          # Database connection
│   ├── submit_inquiry.php     # Handles form submissions
│   
│
├── database/
│   └── inquiry_db.sql    # Database export file


## 💡 Functionality Overview

| Feature | Description |
|:--|:--|
| **Home Page** | Animated hero banner with features & CTA |
| **About Page** | Company info, mission, and statistics |
| **Products Page** | Product filtering (software/hardware) |
| **Clients Page** | Client showcase with brand logos |
| **Contact Page** | Working inquiry form (PHP + MySQL) |

---

## 🧠 Backend Workflow

1. User fills the **Contact Form**  
2. `submit_inquiry.php` validates the input  
3. Confirmation message is shown on the frontend  


## 🧰 Security & Best Practices

- Form validation (client + server)
- SQL Injection prevention using prepared statements
- Error handling for failed submissions
- `.env` file (optional) for storing credentials securely
- Sanitized user inputs before database insertion



Built with ❤️ using HTML, CSS, JavaScript, PHP, and MySQL
