
--- Repository Documentation ---

# Food Regulation Analysis Project Documentation

## Overview

This project analyzes and visualizes food safety regulations, comparing the United States and the European Union. It explores the potential health implications of regulatory differences using data visualization techniques.

## Quick Start

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  Install backend and frontend dependencies:

    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```

3.  Configure the backend:
    *   Create a `.env` file in the `server` directory.
    *   Add your MongoDB URI and JWT secret to `.env`:

        ```env
        MONGODB_URI=mongodb://localhost:27017/food-regulation-db
        PORT=5000
        JWT_SECRET=your_jwt_secret
        ```

4.  Start the development servers:

    ```bash
    # In one terminal, start the backend:
    cd server
    npm run dev

    # In another terminal, start the frontend:
    cd ../client
    npm run dev
    ```

    The frontend application will be accessible at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## Configuration

### Backend Configuration (`server`)

The backend server is configured using environment variables.

*   **`MONGODB_URI`**:  MongoDB connection string. Set this in the `.env` file to connect to your MongoDB database.
*   **`PORT`**:  Port for the backend server to listen on. Default is `5000`.
*   **`JWT_SECRET`**: Secret key for JWT (JSON Web Token) signing.  While this project does not implement authentication, this variable is present in the default `.env` file.

### Frontend Configuration (`client`)

The frontend is configured via Vite.
*   **Proxy**:  The `client/vite.config.js` file configures a proxy to forward API requests from the frontend to the backend server running on `http://localhost:5000`. This is set up for development.

    ```javascript
    server: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            secure: false,
          },
          '/health': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            secure: false,
          }
        }
      },
    ```

## Package: Client (`client`)

### Summary

The `client` package is a React application built with Vite. It provides a user interface for visualizing and comparing food regulation data between the US and EU, as well as data from WHO.

### Installation

To install dependencies, navigate to the `client` directory and run:

```bash
cd client
npm install
```

### Components

#### `EUVisualization`

*   **Summary**:  Displays a pie chart visualizing EU food additives categorized by type.
*   **Usage**: Import and use the `EUVisualization` component in your React application.

    ```jsx
    import EUVisualization from './components/visualizations/EUVisualization';

    function MyComponent() {
      return (
        <div>
          <EUVisualization />
        </div>
      );
    }
    ```

*   **Features**:
    *   Fetches EU food additive data from `/data/raw/eu/food-additives.json`.
    *   Transforms data to count additives per category.
    *   Renders a pie chart using `react-chartjs-2`.
    *   Displays loading and error states.

#### `USVisualization`

*   **Summary**: Displays a bar chart visualizing US food additives categorized by regulatory status (Allowed/Prohibited).
*   **Usage**: Import and use the `USVisualization` component.

    ```jsx
    import USVisualization from './components/visualizations/USVisualization';

    function MyComponent() {
      return (
        <div>
          <USVisualization />
        </div>
      );
    }
    ```

*   **Features**:
    *   Fetches US food additive data from `/data/raw/us/IndirectAdditives.csv`.
    *   Parses CSV data using `papaparse`.
    *   Transforms data to count additives by regulatory status.
    *   Renders a bar chart using `react-chartjs-2`.
    *   Displays loading and error states.

#### `WHOVisualization`

*   **Summary**: Displays a line chart showing WHO food regulations over time, categorized by region.
*   **Usage**: Import and use the `WHOVisualization` component.

    ```jsx
    import WHOVisualization from './components/visualizations/WHOVisualization';

    function MyComponent() {
      return (
        <div>
          <WHOVisualization />
        </div>
      );
    }
    ```

*   **Features**:
    *   Fetches WHO data from `/data/raw/who/food-regulations.json`, `/data/raw/who/foodborne-illness.json`, and `/data/raw/who/food-safety.json`.
    *   Transforms data to represent regulation counts per region over years.
    *   Renders a line chart using `react-chartjs-2`.
    *   Displays loading and error states.

#### `VisualizationDashboard`

*   **Summary**:  Combines `EUVisualization`, `USVisualization`, and `WHOVisualization` components into a dashboard layout.
*   **Usage**: Import and use the `VisualizationDashboard` component to display all visualizations together.

    ```jsx
    import VisualizationDashboard from './components/visualizations/VisualizationDashboard';

    function MyComponent() {
      return (
        <div>
          <VisualizationDashboard />
        </div>
      );
    }
    ```

*   **Features**:
    *   Provides a container to display all three visualization components.
    *   Uses Bootstrap grid layout for responsive design.

#### `FoodRegulationTable`

*   **Summary**:  Displays a sortable and filterable table comparing food regulations in the US and EU.
*   **Usage**: Import and use the `FoodRegulationTable` component.

    ```jsx
    import FoodRegulationTable from './components/FoodRegulationTable';

    function MyComponent() {
      return (
        <div>
          <FoodRegulationTable />
        </div>
      );
    }
    ```

*   **Features**:
    *   Fetches and processes EU and US food regulation data from local JSON and CSV files.
    *   Normalizes and combines data for comparison.
    *   Provides filtering by ingredient, category, and regulatory status.
    *   Displays data in a Bootstrap table with status badges.
    *   Displays loading and error states.

### Services

#### `api.js`

*   **Summary**:  Provides an API service for fetching data from the backend server.
*   **Usage**: Import the `api` object and use its methods to fetch data.

    ```jsx
    import api from './services/api';

    async function fetchData() {
      try {
        const regulatoryData = await api.getRegulatoryData();
        console.log(regulatoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    ```

*   **Public Interfaces**:

    *   **`api.getRegulatoryData()`**:
        *   Fetches and processes regulatory data for both US and EU from backend endpoints `/us-additives` and `/eu-additives`.
        *   Returns a Promise that resolves to an array of combined and processed regulation data.

    *   **`api.getObesityData()`**:
        *   Fetches and processes WHO obesity data from backend endpoint `/obesity-data`.
        *   Returns a Promise that resolves to an array of processed obesity trend data.

    *   **`api.getFoodborneIllnessData()`**:
        *   Fetches and processes foodborne illness data from backend endpoint `/foodborne-illness`.
        *   Returns a Promise that resolves to an array of processed foodborne illness data.

### Utils - Data Transformers

#### `dataTransformers.js`

*   **Summary**:  Contains utility functions for transforming raw data into formats suitable for visualizations.
*   **Public Interfaces**:

    *   **`transformEUData(data)`**:
        *   Transforms raw EU food additives data into a format for pie charts.
        *   Groups additives by category and counts them.
        *   Returns an array of objects with `category` and `count` properties.

    *   **`transformUSData(data)`**:
        *   Transforms raw US food additives CSV data into a format for bar charts.
        *   Groups additives by regulatory status ('Allowed', 'Prohibited') and counts them.
        *   Returns an array of objects with `status` and `count` properties.

    *   **`transformWHOData(regulations, foodborne, safety)`**:
        *   Transforms WHO food safety and regulation data for line charts.
        *   Processes regulations data to count regulations per region and year.
        *   Returns an object with `years`, `regions`, and `data` properties, structured for time-series visualization.

### Utils - Data Processing

#### `dataProcessing.js`

*   **Summary**: Contains utility functions for processing raw data from local files, including parsing CSV and JSON, and categorizing data.
*   **Public Interfaces**:

    *   **`getUSData()`**:
        *   Processes US additive data from local CSV files (`/data/raw/us/IndirectAdditives.csv` and optionally `/data/raw/us/direct-additives.csv`).
        *   Categorizes additives into `preservatives`, `colorants`, `sweeteners`, `emulsifiers`, `flavorEnhancers`, and `others`.
        *   Returns a Promise that resolves to an object containing category counts.

    *   **`getEUData()`**:
        *   Processes EU additive data from local JSON file (`/data/raw/eu/food-additives.json`).
        *   Categorizes additives based on E-number ranges and descriptions into the same categories as `getUSData()`.
        *   Returns a Promise that resolves to an object containing category counts.

    *   **`getCombinedRegulationData()`**:
        *   Combines processed US and EU data obtained from `getUSData()` and `getEUData()`.
        *   Returns a Promise that resolves to an array of objects, each containing category counts for both US and EU.

    *   **`getObesityData()`**:
        *   Processes WHO obesity data from `/data/raw/who/obesity/adult-obesity.json`.
        *   Transforms data into an array of objects with `year`, `US`, and `EU` properties, sorted by year.
        *   Returns a Promise that resolves to an array of processed obesity trend data.

    *   **`getFoodborneIllnessData()`**:
        *   Processes foodborne illness data from `/data/raw/who/foodborne-illness.json`.
        *   Transforms data into an array of objects with `region`, `illnessRate`, and `year` properties.
        *   Returns a Promise that resolves to an array of processed foodborne illness data.

### Dependencies and Requirements (Client)

*   `react`: JavaScript library for building user interfaces.
*   `react-dom`:  Provides DOM-specific methods for React.
*   `react-router-dom`:  Provides routing functionalities for React applications.
*   `axios`:  Promise-based HTTP client for making API requests.
*   `bootstrap`:  CSS framework for responsive and mobile-first web development.
*   `react-bootstrap`:  React components for Bootstrap.
*   `chart.js`:  JavaScript charting library.
*   `react-chartjs-2`: React wrapper for Chart.js.
*   `d3`: JavaScript library for data visualization.
*   `papaparse`:  Fast and powerful CSV parser for JavaScript.

## Package: Server (`server`)

### Summary

The `server` package is an Express.js backend application. It provides a REST API to serve food regulation data and related information.

### Installation

To install dependencies, navigate to the `server` directory and run:

```bash
cd server
npm install
```

### Controllers

#### `foodRegulationController.js`

*   **Summary**:  Contains controller functions for handling requests related to food regulation data.
*   **Public Interfaces (exports)**:

    *   **`getAllRegulations(req, res)`**:
        *   Retrieves all food regulations from the database.
        *   Supports optional filtering by `category`, `status` (banned-in-eu, banned-in-us), and `ingredient` (using case-insensitive regex).
        *   Responds with a JSON array of regulations.

    *   **`getRegulationByIngredient(req, res)`**:
        *   Retrieves a specific food regulation by ingredient name.
        *   Ingredient name is passed as a parameter in the request URL (`req.params.ingredient`).
        *   Responds with a JSON object of the regulation if found, or a 404 error if not found.

    *   **`compareRegulations(req, res)`**:
        *   Aggregates food regulations to compare US and EU regulatory statuses.
        *   Groups regulations by `us_allowed` and `eu_allowed` statuses.
        *   Responds with a JSON array of aggregated regulation comparison data.

    *   **`getHealthImpactStats(req, res)`**:
        *   Aggregates health impact statistics based on severity levels from the `healthConcerns` field of regulations.
        *   Groups regulations by `severityLevel` from health concerns.
        *   Responds with a JSON array of aggregated health impact statistics.

    *   **`addRegulation(req, res)`**:
        *   Adds a new food regulation to the database.
        *   Regulation data is expected in the request body (`req.body`).
        *   Responds with the saved regulation object and a 201 status on success, or a 400 error on validation failure.

    *   **`updateRegulation(req, res)`**:
        *   Updates an existing food regulation.
        *   Identifies the regulation to update by `ingredient` name in the request parameters (`req.params.ingredient`).
        *   Updated regulation data is expected in the request body (`req.body`).
        *   Responds with the updated regulation object on success, or a 404 error if the ingredient is not found, or a 400 error on validation failure.

### Server Endpoints

*   **`/health`**:
    *   **Method**: `GET`
    *   **Summary**:  Health check endpoint to verify server status.
    *   **Response**: JSON object with `status: 'healthy'`, `timestamp`, and `uptime`.

### Dependencies and Requirements (Server)

*   `express`:  Fast, unopinionated, minimalist web framework for Node.js.
*   `cors`:  Middleware for enabling Cross-Origin Resource Sharing.
*   `helmet`:  Middleware for securing Express apps by setting HTTP headers.
*   `morgan`: HTTP request logger middleware for Node.js.
*   `dotenv`:  Loads environment variables from a `.env` file.
*   `nodemon`: Utility that monitors for any changes in your node.js application and automatically restarts the server - useful for development.

This documentation provides a comprehensive guide to the Food Regulation Analysis project, covering setup, configuration, and usage of both the client and server components.

--- End of Documentation ---
