# Food Regulation Analysis Project

## Overview
This project analyzes and visualizes the differences in food regulations and health outcomes between the US and EU.

## Setup
1. Clone the repository
2. Install dependencies:
   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`
3. Create .env file in server directory
4. Start development servers:
   - Backend: `cd server && npm run dev`
   - Frontend: `cd client && npm run dev`

## Tech Stack
- MongoDB
- Express.js
- React
- Node.js
- Bootstrap
- Chart.js/D3.js

## Project Structure
```
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
```
