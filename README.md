# Bistro Boss Restaurant

A modern, full-stack restaurant management system that allows users to browse menus, place orders, and manage reservations. Built with React for the frontend and Node.js for the backend, featuring secure authentication, payment integration, and an intuitive admin dashboard.

## 🚀 Live Demo

Experience the application live at: [https://stro-boss-3b7c5.web.app/](https://stro-boss-3b7c5.web.app/)

## ✨ Features

- **User Authentication**: Secure login and signup with Firebase Authentication
- **Menu Management**: Browse categorized menu items (salads, pizzas, soups, desserts, etc.)
- **Shopping Cart**: Add, update, and remove items from cart
- **Secure Payments**: Integrated with SSLCommerce for safe transactions
- **User Dashboard**: View order history, payment details, and manage profile
- **Admin Dashboard**: Manage users, menu items, orders, and analytics
- **Responsive Design**: Optimized for desktop and mobile devices using Tailwind CSS
- **Real-time Updates**: Dynamic menu and order status updates

## 🛠️ Tech Stack

### Frontend

- **React** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Hosting and authentication services

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage

### Additional Tools

- **Stripe/SSLCommerce** - Payment processing
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **ESLint** - Code linting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bistro-boss.git
   cd bistro-boss
   ```

2. **Install client dependencies**

   ```bash
   cd bistro-boss-client
   npm install
   ```

3. **Install server dependencies**

   ```bash
   cd ../bistro-boss-server
   npm install
   ```

4. **Environment Setup**

   - Create `.env` files in both `bistro-boss-client` and `bistro-boss-server` directories
   - Add necessary environment variables (API keys, database URLs, etc.)

5. **Start the backend server**

   ```bash
   cd bistro-boss-server
   npm start
   ```

6. **Start the frontend development server**

   ```bash
   cd ../bistro-boss-client
   npm run dev
   ```

7. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port specified by Vite)

## 📖 Usage

1. **For Customers**:

   - Register or log in to your account
   - Browse the menu and add items to your cart
   - Proceed to checkout and complete payment
   - View your order history in the dashboard

2. **For Admins**:
   - Log in with admin credentials
   - Access the admin dashboard to manage menu items, users, and orders
   - Monitor analytics and handle reservations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please reach out to the development team.

---

**Note**: This is a full-stack application with separate client and server components. Ensure both are running for full functionality.
