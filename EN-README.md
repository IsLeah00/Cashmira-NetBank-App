#                           Cashmira NetBank

## 1. System Specification

### Task Overview
**Cashmira NetBank** is a modern, responsive online banking application that provides functionality for:
- User registration and authentication
- Bank card management (e.g., setting limits, blocking, renaming)
- Secure financial transactions
- Administrator-level permission management

### Developer Tools
- **Visual Studio Code**, Postman, MongoDB Compass
- **Yarn** (as an npm replacement), Docker, Git
- Recommended VS Code extensions: Angular Language Service, ESLint, Prettier

### Environment
- **Frontend**: Angular 17 + Angular Material
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (running in a Docker container)
- **Platform**: Linux (Ubuntu), Windows 10+, or macOS

## 2. Requirements Specification

### Vision of the Ideal System
The system supports user registration with a secure PIN code, automatic card generation, and strong authentication. During transactions, any obscene words are automatically filtered and replaced with alternative terms. Administrators can approve, restrict, or delete users, as well as log system events.

### Required Business Processes
- Full-featured user financial management via web interface:
        - account status overview
        - account management
        - transaction handling
        - profile management

- Administrative capabilities:
        - approval of new registrations
        - restricting existing accounts
        - suspending user accounts
        - monitoring transactions
        - reviewing transaction details

### Prerequisites
- Installation of Docker and Docker Compose
- Environment setup with Git, Yarn, and Node.js
- Recommended operating systems: Ubuntu 20.04+, Windows 10+, macOS

## 3. Functional Specification

### Program Objective
The goal is to develop a fast, secure, and transparent web-based banking system that provides a minimalist yet feature-rich user interface for both end users and administrators.

### List of Features
- User registration (with PIN and password policy enforcement)
- Login (JWT-based authentication)
- Card management (rename, block/unblock, set limits for ATM, purchases, and transfers)
- Transaction processing (amount, recipient, message with automatic profanity filtering and replacement)
- Automatic card creation upon registration
- Transaction statistics and history
- Admin interface: user management, access control, activity logging

### Testing
- All application features were manually tested during development (UI, validations, status responses, error handling, etc.)
- Backend endpoints were tested using Postman and through the frontend UI
- Angular unit testing with Karma can be configured if needed

## 4. Installation and Execution

### Installing Dependencies

```sh
cd cashmira-app
yarn install
```

This command installs all backend and frontend dependencies (based on the `yarn.lock` file, not `node_modules`).

### Starting the Application

```sh
yarn start
```

This will simultaneously launch the database in a Docker container, as well as start the backend and frontend servers.

## 5. Available Endpoints

A full list of API endpoints can be found in the following `.md` files:

```
backend/controllers/EN-helpers/
├── admin-endpoints.md
├── auth-endpoints.md
├── card-endpoints.md
├── transaction-endpoints.md
└── user-endpoints.md
```

## 6. Git and File Management

- `.gitignore` includes `node_modules/`, `dist/`, and `.env` files.
- Yarn is used instead of `npm`.
- Version control: Git & GitHub

## 7. License

**UNLICENSED**

This project was developed for educational/demo purposes. Additional security, auditing, and compliance measures are required before deploying it in a production environment.
