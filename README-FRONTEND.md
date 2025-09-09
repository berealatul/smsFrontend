# SMS Frontend - Student Monitoring System

A modern React frontend application built with **Magic UI (ShadCN)** components, Tailwind CSS, and TypeScript for the Student Monitoring System.

## 🚀 Features

-   **Modern Authentication Flow** - JWT-based login with role-based access control
-   **Magic UI Components** - Beautiful animated components from ShadCN/UI ecosystem
-   **Role-Based Dashboard** - Different views for Admin, HOD, Faculty, Staff, and Students
-   **Responsive Design** - Mobile-first responsive design with Tailwind CSS
-   **Type Safety** - Full TypeScript support for better development experience
-   **Form Validation** - React Hook Form with Zod schema validation

## 🛠️ Tech Stack

-   **React 19** - Latest React with concurrent features
-   **TypeScript** - Type-safe development
-   **Vite** - Fast build tool and dev server
-   **Tailwind CSS** - Utility-first CSS framework
-   **ShadCN/UI** - Re-usable components built on Radix UI
-   **Magic UI** - Enhanced animated components
-   **React Router** - Client-side routing
-   **React Hook Form** - Performant forms with easy validation
-   **Zod** - TypeScript-first schema validation

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd smsFrontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication

The application includes a complete authentication system with the following features:

### Test Credentials

| Role    | Email                 | Password  |
| ------- | --------------------- | --------- |
| Admin   | admin@gmail.com       | adminpass |
| HOD     | hod.cse@gmail.com     | adminpass |
| Faculty | faculty.cse@gmail.com | adminpass |

### Login Page Features

-   **Animated Gradient Text** - Magic UI animated title
-   **Form Validation** - Real-time validation with error messages
-   **Test Credential Buttons** - Quick-fill buttons for different user roles
-   **Rainbow Button** - Magic UI rainbow submit button
-   **Responsive Design** - Beautiful on all screen sizes

## 🎯 User Roles & Access

| Role        | Dashboard Access   | Features                                                |
| ----------- | ------------------ | ------------------------------------------------------- |
| **ADMIN**   | Full system access | Department management, User management, System overview |
| **HOD**     | Department level   | User management within department, Programmes, Batches  |
| **FACULTY** | Limited access     | View department info, Basic dashboard                   |
| **STAFF**   | Limited access     | View department info, Basic dashboard                   |
| **STUDENT** | Limited access     | View department info, Basic dashboard                   |

## 🎨 Magic UI Components Used

### Core Components

-   **Button** - Enhanced buttons with animations
-   **RainbowButton** - Animated rainbow gradient button
-   **InteractiveHoverButton** - Interactive hover effects
-   **Globe** - 3D interactive globe visualization
-   **AnimatedGradientText** - Animated gradient text component
-   **MagicSpinner** - Custom loading spinner with gradient

### UI Components

-   **Card** - Container components with backdrop blur
-   **Input** - Form input components
-   **Form** - Form handling with validation
-   **Label** - Accessible form labels

## 🌐 API Integration

The frontend integrates with the SMS API running on `http://localhost/sms/api/`.

### API Services

-   **authAPI** - Authentication operations (login, user info, profile updates)
-   **departmentAPI** - Department CRUD operations (Admin only)
-   **userAPI** - User management operations (HOD/Admin)

### Error Handling

-   Comprehensive error handling for all API calls
-   User-friendly error messages
-   Automatic token refresh and logout on authentication errors

## 📱 Responsive Features

-   **Mobile-First Design** - Optimized for mobile devices
-   **Backdrop Blur Effects** - Modern glassmorphism design
-   **Gradient Backgrounds** - Beautiful animated gradients
-   **Loading States** - Magic UI spinners for better UX
-   **Toast Notifications** - Error and success messages

## 🚀 Build & Deployment

### Development

```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
```

### Production

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # ShadCN UI components
│   ├── magicui/        # Magic UI components
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities and API
│   ├── api.ts         # API service functions
│   └── utils.ts       # Utility functions
├── pages/             # Page components
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## 🎯 Features Showcase

### Login Page

-   Animated gradient title with Magic UI
-   Form validation with Zod schemas
-   Test credential quick-fill buttons
-   Rainbow button submit with loading states
-   Responsive card layout with backdrop blur

### Dashboard

-   Role-specific content and statistics
-   Interactive Magic UI components
-   3D Globe visualization
-   Real-time data from API
-   Responsive grid layouts
-   Quick action buttons with animations

### Authentication Flow

-   JWT token management
-   Protected routes
-   Role-based access control
-   Automatic redirects
-   Persistent login state

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with custom animations and gradients configured in `src/index.css`.

### ShadCN/UI

Components are configured in `components.json` with the "new-york" style variant and custom aliases.

### TypeScript

Full TypeScript configuration with strict type checking enabled.

## 📞 Support

For backend API documentation, refer to the `FRONTEND-README.md` file which contains detailed API endpoints and integration examples.

## 🎉 Getting Started

1. Make sure the SMS API backend is running on `http://localhost/sms/api/`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open `http://localhost:5173` in your browser
5. Use test credentials to login and explore the features

The application will automatically redirect to the login page if not authenticated, and to the dashboard once logged in successfully.
