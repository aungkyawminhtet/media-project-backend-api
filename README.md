# Media Backend API

### 📌 [Live Demo](https://media-project-backend-api.onrender.com/api-docs/)

### 🌐 Base URL (Production)

```
https://media-project-backend-api.onrender.com/
```

---

## 📋 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB or other supported database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nodejs-basic
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env_example .env
   ```

   Update the `.env` file with your database credentials and other configurations.

4. **Configure MongoDB/Database**
   Update your database connection string in the `.env` file.

### Running the Server

```bash
npm run dev
```

The server will start and listen on `http://localhost:3000`

### API Documentation

After starting the server, access the Swagger UI documentation at:

```
http://localhost:3000/api-docs/
```

---

## 📚 About the Project

_This is a learning-focused Backend mini project._

### Key Features

- **User Authentication**: Register and login functionality
- **Security**:
  - JWT (JSON Web Tokens) for authentication
  - Bcrypt for password hashing
  - Middleware token protection on secured routes
- **Database**: MongoDB integration with Mongoose ORM
- **File Upload**: Express file upload support
- **API Documentation**: Swagger UI integration
- **Input Validation**: Joi schema validation

### Project Structure

```
src/
├── index.ts                 # Main entry point
├── supabaseClient.ts        # Supabase configuration
├── controllers/             # Route handlers and business logic
│   ├── cats.ts
│   ├── commands.ts
│   ├── posts.ts
│   ├── tag.ts
│   └── users.ts
├── dbs/                     # Database models/schemas
│   ├── cats.ts
│   ├── commands.ts
│   ├── posts.ts
│   ├── tag.ts
│   └── users.ts
├── routes/                  # API routes
│   ├── cats.ts
│   ├── commands.ts
│   ├── posts.ts
│   ├── tag.ts
│   └── users.ts
└── utls/                    # Utilities
    ├── dbConnect.ts         # Database connection
    ├── helper.ts            # Helper functions
    ├── saveFiles.ts         # File saving utilities
    ├── schema.ts            # Joi validation schemas
    ├── swaggerUi.ts         # Swagger configuration
    └── validator.ts         # Validation middleware
```

---

## 📦 Dependencies

### Core Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ORM
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `joi` - Schema validation
- `express-fileupload` - File upload handling
- `swagger-ui-express` - API documentation UI
- `swagger-jsdoc` - Swagger/OpenAPI spec generation

### Development Dependencies

- `@types/express` - TypeScript types for Express
- `@types/express-fileupload` - TypeScript types for file upload
- `@types/jsonwebtoken` - TypeScript types for JWT
- `nodemon` - Development server auto-reload
- `typescript` - TypeScript compiler

---

## 🔗 Reference

**_Credit: Brighter Myanmar (Waiferkolar)_**
