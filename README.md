# Empleability Management Client

Web client for SENA's employability management. Modern application built with React, TypeScript, and Vite to provide an intuitive and responsive interface for managing candidates, vacancies, and applications.

## 🎯 Project Description

Employability management system that facilitates:
- **Authentication**: Secure user login
- **Vacancy Management**: Create, list, and manage job vacancies
- **Applications**: Track candidate applications for vacancies
- **User Management**: Manage system users
- **Dashboard**: Control panel with statistics and relevant information

## Features

- ✅ Modern and responsive interface with Tailwind CSS
- ✅ Strong typing with TypeScript
- ✅ Secure routing with protected routes
- ✅ JWT-based authentication
- ✅ Component-based and reusable design
- ✅ Optimized build with Vite
- ✅ Automatic linting with ESLint
- ✅ Dockerized for easy deployment
- ✅ Hot Module Replacement (HMR) in development

## 📋 Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** 9+ (included in Node.js)
- **Docker & Docker Compose** (optional, for containerization)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <your-repo>
cd empleability_management_client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 💻 Development

To start the development server with HMR:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint and fix automatically |

## 📦 Production Build

To compile the application for production:

```bash
npm run build
```

This generates:
- Optimized files in the `dist/` folder
- Minified JavaScript
- Bundled and optimized CSS
- Automatic JS/CSS imports analysis

## 🐳 Docker

### Requirements
- Docker Desktop installed

### Run with Docker Compose

```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:3000`

### Run manually with Docker

```bash
# Build image
docker build -t empleability-client:latest .

# Run container
docker run -d \
  --name empleability-client \
  -p 3000:3000 \
  -e NODE_ENV=production \
  empleability-client:latest
```

For more information about Docker, see [DOCKER.md](DOCKER.md)

## 📁 Project Structure

```
src/
├── api/                      # API services
│   ├── applications.ts      # Applications endpoints
│   ├── auth.ts              # Authentication endpoints
│   ├── axiosClient.ts       # Configured HTTP client
│   ├── users.ts             # Users endpoints
│   └── vacancies.ts         # Vacancies endpoints
├── components/              # Reusable React components
│   ├── Button.tsx           # Generic button
│   ├── Layout.tsx           # Main layout
│   ├── LoadingSpinner.tsx   # Loading spinner
│   ├── ProtectedRoute.tsx   # Protected route
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── VacancyCard.tsx      # Vacancy card
│   └── VacancyForm.tsx      # Vacancy form
├── context/                 # React Context (global state)
├── hooks/                   # Custom hooks
├── pages/                   # Pages/Views
│   ├── ApplicationsPage.tsx
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── UsersPage.tsx
│   └── VacanciesPage.tsx
├── App.tsx                  # Main component
├── main.tsx                 # Entry point
└── App.css                  # Global styles
```

## 🔐 Authentication

The project uses JWT authentication. Tokens are stored locally and automatically sent with each API request through Axios.

**Protected routes configuration:**
- `ProtectedRoute.tsx` verifies authentication before allowing access
- Redirects to login if the user is not authenticated

## 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI Framework |
| TypeScript | ~5.9.3 | Static typing |
| Vite | 8.0.1 | Bundler and dev server |
| Tailwind CSS | 4.2.2 | CSS Styling |
| React Router | 7.13.2 | Routing |
| Axios | 1.14.0 | HTTP Client |

## 🔗 Backend API

This client connects to a backend API. Make sure:

1. The backend server is running
2. The base URL is correctly configured in `.env.local`
3. CORS is enabled on the backend

## 📝 Code Conventions

- **Components**: PascalCase (e.g., `UserCard.tsx`)
- **Files**: kebab-case or PascalCase depending on type
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with `I` prefix for interfaces

## 🐛 Troubleshooting

### Port 3000/5173 already in use

**Development:**
```bash
npm run dev -- --port 5174
```

**Docker:**
Modify in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"
```



