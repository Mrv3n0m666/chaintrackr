# 🧠 ChainTrackr

ChainTrackr is a lightweight, extensible backend service that allows users to register, log in, and manage their crypto wallet addresses securely. It provides a clean and modern RESTful API for user authentication and address management, built with TypeScript, Express, and TypeORM.

## Features

- 🔐 User authentication (register & login)
- 🏦 Address CRUD (create, read, update, delete) tied to authenticated users
- 📄 Input validation with Zod
- 📚 Interactive API documentation using Swagger UI
- 🔄 Clean and modular codebase using service-controller architecture
- 🌍 Ready to scale with support for future integrations

## Technologies Used

- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- Zod (for validation)
- Bcrypt (for password hashing)
- JWT (for authentication)
- Swagger (for API docs)

## 📂 Struktur Folder

## Directory Structure

- `chaintrackr/`
  - `src/`
    - `controllers/` - Request handlers (address, auth, etc.)
    - `entities/` - TypeORM entity definitions (User, Address)
    - `routes/` - API route definitions
    - `services/` - Business logic services
    - `middlewares/` - Express middlewares (e.g., auth)
    - `validators/` - Zod validation schemas
    - `docs/` - Swagger configuration
    - `data-source.ts` - Database configuration (TypeORM)
    - `index.ts` - Entry point of the app
  - `.env` - Environment variables
  - `docker-compose.yml` - Docker setup (Postgres + App)
  - `tea.yaml` - Metadata for Tea.xyz open-source registry
  - `README.md`
  - `tsconfig.json` - TypeScript config

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chaintrackr.git
cd chaintrackr/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3001
DATABASE_URL=postgres://user:password@localhost:5432/chaintrackr
JWT_SECRET=your_jwt_secret
```

### 4. Run the Development Server

```bash
npm run dev
```

The server should be running on `http://localhost:3001`.

### 5. API Documentation

Access Swagger UI at:

```
http://localhost:3001/api-docs
```


## 🛠️ Development Plan

- 🔐 Email verification

- 🧩 Tracking token balances

- 📈 Balance change notifications (future)


## Contributing to Tea.xyz Ecosystem

ChainTrackr is built to be flexible and ready for integration into the [Tea.xyz](https://tea.xyz) ecosystem. If you're interested in contributing to a decentralized package registry and supporting the next generation of web3 infrastructure, feel free to:

- Fork this repository
- Improve or extend functionality
- Submit a pull request
- Add your name to the list of contributors in `tea.yaml` (coming soon)

Together, we can make the blockchain world more accessible and developer-friendly.

## License

MIT License

