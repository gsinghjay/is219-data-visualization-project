#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up MERN Stack Project...${NC}"

# Create main project directory structure
mkdir -p client/src/{components,pages,assets,utils,services,hooks} \
      client/public \
      server/{config,controllers,models,routes,middleware,utils} \
      local-research \
      local-docs

# Initialize backend
echo -e "${BLUE}Initializing Backend...${NC}"
cd server
npm init -y

# Install backend dependencies
echo -e "${GREEN}Installing Backend Dependencies...${NC}"
npm install express mongoose dotenv cors morgan helmet express-validator jsonwebtoken bcryptjs

# Create basic backend files
echo "require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Food Regulation Analysis API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});" > server.js

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/food-regulation-db
PORT=5000
JWT_SECRET=your_jwt_secret" > .env

# Create .gitignore
echo "node_modules
.env
*.log" > .gitignore

cd ..

# Initialize frontend
echo -e "${BLUE}Initializing Frontend...${NC}"
cd client
npm create vite@latest . -- --template react
npm install

# Install frontend dependencies
echo -e "${GREEN}Installing Frontend Dependencies...${NC}"
npm install axios bootstrap react-bootstrap react-router-dom @tanstack/react-query chart.js react-chartjs-2 d3

# Update package.json proxy
echo -e "${BLUE}Updating package.json...${NC}"
sed -i '/"private": true,/a\  "proxy": "http://localhost:5000",' package.json

# Create basic frontend files
echo "import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<h1>Food Regulation Analysis</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;" > src/App.jsx

# Create basic CSS
echo ".App {
  text-align: center;
  padding: 20px;
}

/* Add your custom styles here */
" > src/App.css

cd ..

# Initialize git repository
echo -e "${BLUE}Initializing Git Repository...${NC}"
git init
echo "node_modules
.env
*.log
.DS_Store" > .gitignore

# Create README.md
echo "# Food Regulation Analysis Project

## Overview
This project analyzes and visualizes the differences in food regulations and health outcomes between the US and EU.

## Setup
1. Clone the repository
2. Install dependencies:
   - Backend: \`cd server && npm install\`
   - Frontend: \`cd client && npm install\`
3. Create .env file in server directory
4. Start development servers:
   - Backend: \`cd server && npm run dev\`
   - Frontend: \`cd client && npm run dev\`

## Tech Stack
- MongoDB
- Express.js
- React
- Node.js
- Bootstrap
- Chart.js/D3.js

## Project Structure
\`\`\`
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets
│   │   ├── utils/        # Utility functions
│   │   ├── services/     # API services
│   │   └── hooks/        # Custom hooks
├── server/                # Backend Express application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
├── local-research/       # Research documentation
└── local-docs/          # Project documentation
\`\`\`" > README.md

echo -e "${GREEN}MERN Stack project setup complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. cd server && npm install"
echo "2. cd client && npm install"
echo "3. Update .env file with your MongoDB URI"
echo "4. Start development servers:"
echo "   - Backend: cd server && npm run dev"
echo "   - Frontend: cd client && npm run dev" 