# <img src="./frontend/public/logo.png" alt="Logo" width="80" height="50" style="vertical-align: middle;" /> Kata Sweet management platform

## Overview

Kata Sweet helps buyers purchase sweets, allow admins to manage sweets and inventory. It utilizes a modern tech stack including Vite.js, TypeScript, Mongoose, MongoDB, js cookies, Mantine, and Tailwind CSS to deliver a robust and user-friendly experience.

## 🚀 Frontend - [Live Demo](https://kata.shobhittiwari.me)
## ⚙️ Backend - [Live Demo](https://kata-server.shobhittiwari.me)

## 📋 Table of Contents
- [Snapshots](#-snapshots)
- [Tests coverage](#-tests-coverage)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [My AI Usage](#-my-ai-usage)
- [File Structure](#-file-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Integration test](#-integration-test)

## 📷 Snapshots
<img width="1919" height="1001" alt="Screenshot 2025-09-21 000754" src="https://github.com/user-attachments/assets/4f6d7501-b13f-4c2f-95cd-25f743ae4d70" />
<img width="1911" height="1002" alt="Screenshot 2025-09-21 000803" src="https://github.com/user-attachments/assets/98238c46-526c-4c2a-b1a6-6b268e81a658" />
<img width="1918" height="996" alt="Screenshot 2025-09-21 000809" src="https://github.com/user-attachments/assets/75914cdb-1a9e-404e-91b1-0e037b2dee3c" />
<img width="1919" height="992" alt="Screenshot 2025-09-21 000824" src="https://github.com/user-attachments/assets/8aa664cb-d58d-4295-8679-9ba233de2a8c" />
<img width="1919" height="998" alt="Screenshot 2025-09-21 000837" src="https://github.com/user-attachments/assets/ed1123b0-cd69-4300-84a0-852d30a7c645" />
<img width="1919" height="989" alt="Screenshot 2025-09-21 000909" src="https://github.com/user-attachments/assets/a24b1adb-8cd0-480f-8dbf-187404f20a33" />
<img width="1919" height="997" alt="Screenshot 2025-09-21 000931" src="https://github.com/user-attachments/assets/d7ee8ad7-8c1f-41b5-8721-e8f892c3f8f2" />

## 🧪 Tests coverage
<img width="1919" height="1058" alt="Screenshot 2025-09-20 232153" src="https://github.com/user-attachments/assets/dc6ace4b-57a8-46d6-b646-eb5311ce4d4e" />


## 🧰 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=mantine&logoColor=white) ![Gemini](https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## ✨ My AI Usage

![GitHub Copilot](https://img.shields.io/badge/Copilot-181717?style=for-the-badge&logo=githubcopilot&logoColor=white) ![ChatGPT](https://img.shields.io/badge/ChatGPT-10A37F?style=for-the-badge&logo=openai&logoColor=white) ![Claude](https://img.shields.io/badge/Claude-FFD700?style=for-the-badge&logo=anthropic&logoColor=black) ![Gemini](https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

- **Inline Code Suggestion**: Used GitHub Copilot to generate boilerplate code and repetitive patterns, especially for inline suggestions and completing functions.
- **Code Review**: Used ChatGPT to review code snippets for potential bugs and improvements.
- **Frontend components**: Used Gemini + Claude to help generate React components and hooks.
- **Exploration and Debugging**: Used ChatGPT to help debug issues and explore alternative implementations/libraries.
- **Documentation**: Used Claude to help draft and format documentation sections in this README
- **Data Modeling**: Used GPT4.1 as model and Github copilot as agent to assist in designing database schemas and relationships.

## 🚀 Features

- **Auth with cookies**: Simple authentication using cookies
- **Type Safety**: Fully typed database operations
- **Sweets Management**: CRUD operations for managing sweets with filters
- **Admin/User Roles**: Different access levels for admins and users
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and Mantine
- **Quiz Functionality**: Interactive quizzes for users
- **SEO Optimization**: Improved search engine visibility
- **Error Boundaries**: Graceful error handling in components/pages.
- **Integration Testing**: Integration test setup with Jest.

## 📂 File Structure

```plaintext
esahayak/
backend/
├── src/
│   ├── controllers/    # Express route controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # API route definitions
│   ├── middleware/     # Express middleware
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files (DB, env)
│   ├── types/          # TypeScript type definitions
│   ├── services/       # gemini service integrations
│   └── app.ts          # Express app entry point
├── tests/              # Backend unit/integration tests
├── index.ts            # Backend entry point
├── .env                # Environment variables
├── package.json        # Backend dependencies and scripts

frontend/
├── src/
│   ├── pages/          # Vite pages
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers and hooks
│   ├── data/           # static data (e.g., quiz questions)
│   ├── api/            # API helper functions
│   ├── config/         # Configuration files (e.g., API URLs)
│   └── public/         # Static assets (images, fonts, etc.)
├── vite.config.js      # Vite configuration
├── package.json        # Frontend dependencies and scripts
```

## 🛠 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Git installed
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Shobhit141141/kata.git
cd kata
```

### 2. Move to the Backned Directory and Install Dependencies

```bash
cd backend
npm install
```

### 3. Set Up Environment Variables

Copy a `.env.sample` in `.env` file at the root of your project and configure the following environment variables:

```env
MONGO_URI="mongodb://localhost:27017/kata"
JWT_SECRET="your_jwt_secret"
CLIENT_URL="http://localhost:5173"
PORT=5000
NODE_ENV="dev"
MONGO_URI_TEST="mongodb://localhost:27017/kata_test" # for integration test

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

GEMINI_API_KEY="your_gemini_api_key"
```

#### Open your browser and navigate to `http://localhost:5000` to see the server in action.

---

### 4. Move to root and then move to the Frontend Directory and Install Dependencies

```bash
cd..
cd frontend
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

#### Open your browser and navigate to `http://localhost:5173` to see the frontend in action.

## 🧪 Integration Test

### 1. Tests are written in the `backend/tests/` directory

```bash
npm run jest # runs all tests once
npm run jest:watch # runs tests in watch mode
npm run jest:coverage # generates test coverage report
```
