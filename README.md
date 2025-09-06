# Fly Away - Flight Booking API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A comprehensive flight booking system built with NestJS, TypeScript, and PostgreSQL. This API provides complete functionality for managing flights, airlines, airports, locations, users, and ticket bookings.

## 🚀 Features

### Core Modules

- **Authentication System** - JWT-based authentication with role-based access control
- **User Management** - User registration, login, and profile management
- **Location Management** - Cities and countries management
- **Airline Management** - Airline companies and their information
- **Airport Management** - Airport details with location associations
- **Flight Management** - Flight scheduling, search, and management
- **Ticket Booking** - Flight ticket booking and management

### Technical Features

- **RESTful API** with comprehensive Swagger documentation
- **Database Integration** with TypeORM and PostgreSQL
- **Input Validation** using class-validator and class-transformer
- **Global Response Interceptor** for consistent API responses
- **Pagination Support** for all list endpoints
- **Search Functionality** across relevant entities
- **Role-based Authorization** (User, Admin, Manager, Super Admin)
- **Environment Configuration** with validation
- **Error Handling** with custom exceptions

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Yarn package manager

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd fly-away
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_DATABASE=fly_away

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

Make sure PostgreSQL is running and create a database named `fly_away` (or update the environment variable).

### 5. Run the application

```bash
# Development mode
yarn run start:dev

# Production mode
yarn run start:prod
```

The API will be available at `http://localhost:3000/api`

## 📚 API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

- **Swagger UI**: `http://localhost:3000/docs`

## 🏗️ Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── decorators/         # Auth decorators
│   ├── dto/               # Auth DTOs
│   ├── enums/             # Auth enums
│   ├── guards/            # Authentication guards
│   ├── interface/         # Auth interfaces
│   └── providers/         # Auth services
├── airline/               # Airline management
├── airport/               # Airport management
├── configs/               # Configuration files
├── decorators/            # Custom decorators
├── enums/                 # Application enums
├── flight/                # Flight management
├── interceptors/          # Global interceptors
├── location/              # Location management
├── ticket/                # Ticket booking
├── user/                  # User management
├── utils/                 # Utility functions
└── validations/           # Environment validation
```

## 🔐 Authentication

The API uses JWT-based authentication with the following endpoints:

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/refresh-token` - Token refresh

### User Roles

- **USER** - Basic user access
- **ADMIN** - Administrative access
- **MANAGER** - Management access
- **SUPER_ADMIN** - Full system access

## 📊 API Response Format

### Success Response

```json
{
  "data": <response_data>,
  "message": "Success message"
}
```

### Error Response

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

## 🔍 Key Endpoints

### Authentication

- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/refresh-token` - Refresh access token

### Locations

- `GET /api/location` - Get all locations (with pagination & search)
- `POST /api/location` - Create new location

### Airlines

- `GET /api/airline` - Get all airlines (with pagination & search)
- `POST /api/airline` - Create new airline

### Airports

- `GET /api/airport` - Get all airports (with pagination & search)
- `POST /api/airport` - Create new airport

### Flights

- `GET /api/flight` - Get all flights (with pagination & search)
- `POST /api/flight` - Create new flight
- `GET /api/flight/:id` - Get flight by ID

### Tickets

- `GET /api/ticket` - Get user tickets (with pagination)
- `POST /api/ticket` - Book new ticket
- `GET /api/ticket/:id` - Get ticket by ID

## 🧪 Testing

```bash
# Unit tests
yarn run test

# E2E tests
yarn run test:e2e

# Test coverage
yarn run test:cov
```

## 🚀 Deployment

The application is configured for easy deployment with environment-specific configurations. Make sure to:

1. Set up production environment variables
2. Configure your PostgreSQL database
3. Update the `NODE_ENV` to `production`
4. Run `yarn run start:prod`

## 📝 Development

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Format code
yarn run format

# Lint code
yarn run lint
```

### Database Migrations

The application uses TypeORM with auto-synchronization in development mode. For production, consider using proper migrations.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ using NestJS
