# 🎨 Crimson Marketplace - Premium MERN eCommerce

Crimson Marketplace is a state-of-the-art, multi-vendor eCommerce platform built with the **MERN stack (MongoDB, Express, React, Node.js)** and **Next.js 15**. It features a stunning **Glassmorphism Dark Theme** designed for premium user experiences.

---

## 🚀 Key Features

### 👤 User Roles & Authentication

- **Multi-Vendor Support**: Dedicated dashboards for Vendors to manage products and orders.
- **Admin Command Center**: Full control over users, categories, analytics, and global orders.
- **Secure Auth**: Stateless session management using **httpOnly Cookies** for maximum security.

### 💳 Payments & Transactions

- **Stripe Integration**: Secure checkout flow with Stripe API.
- **Real-time Webhooks**: Automatic order status updates via Stripe webhooks.
- **Transaction Tracking**: Persistent payment models to track revenue and success rates.

### 📈 Data Visualization

- **Rich Analytics**: Interactive charts (Line, Bar, Area, Pie) powered by **Recharts**.
- **Real-time Metrics**: Track sales performance, category distribution, and user growth.

### 🖼️ Cloud & Media

- **Cloudinary Integration**: Blazing fast image uploads and optimized delivery.
- **Auto-Optimization**: Images are automatically resized and compressed on the fly.

### 📧 Communication

- **Resend Integration**: Automated, high-fidelity HTML email notifications for every order stage.

---

## 🛠️ Tech Stack

| Layer        | Technology                                                   |
| :----------- | :----------------------------------------------------------- |
| **Frontend** | Next.js 15, Tailwind CSS, Shadcn/UI, Recharts, Framer Motion |
| **Backend**  | Node.js, Express.js, JWT (Cookie-based auth)                 |
| **Database** | MongoDB + Mongoose                                           |
| **Media**    | Cloudinary API                                               |
| **Payments** | Stripe API                                                   |
| **Emails**   | Resend API                                                   |

---

## 💻 Setup & Installation

### 1. Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary, Stripe, and Resend API keys

### 2. Clone the Repository

```bash
git clone https://github.com/evaalduminy/ecommerce-project.git
cd ecommerce-project
```

### 3. Backend Setup

```bash
cd backend
npm install
# Create a .env file based on the provided template
npm run dev
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### 5. Seed Initial Data

```bash
cd ../backend
node seedProducts.js
```

---

## 🎨 Design System

The project follows a **Premium Dark Aesthetic**:

- **Primary Color**: `#d80000` (Crimson Red)
- **Background**: `#0a0a0a`
- **UI Utilities**: Custom glassmorphism cards, blurred overlays, and Inter typography.

---

## 📄 License

This project is for educational and showcase purposes. Developed with ❤️ by Antigravity.
