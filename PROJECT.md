## Overview

This project analyzes and visualizes food safety regulations. It compares regulations between the US and EU. The project explores potential health implications using data visualizations.

## Quick Start

1. Clone the repository.
2. Navigate to the `client` directory: `cd client`.
3. Install frontend dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. The frontend application will be accessible at `http://localhost:5173`.

## Configuration

### Frontend Configuration (`client`)

The frontend is configured using Vite. Configuration files are located in the `client` directory.  `vite.config.js` allows customization of build and development server options.

## Package: Client (`client`)

### Summary

The `client` package is a React application. It uses Vite for build and development. This application provides a user interface. It visualizes and compares food regulation data from the US, EU, and WHO.

### Installation

To install dependencies, navigate to the `client` directory and run:

```bash
cd client
npm install
```

### Components

#### `EUVisualization`

*   **Summary**: Displays a pie chart of EU food additives by category.
*   **Usage**: Import `EUVisualization` component into your React components.
*   **Features**:
    *   Fetches EU food additive data from `/data/raw/eu/food-additives.json`.
    *   Transforms and categorizes data for pie chart display.
    *   Uses `react-chartjs-2` to render the pie chart.
    *   Shows loading and error states.

#### `USVisualization`

*   **Summary**: Displays a bar chart of US food additives by regulatory status.
*   **Usage**: Import `USVisualization` component into your React components.
*   **Features**:
    *   Fetches US food additive data from `/data/raw/us/IndirectAdditives.csv`.
    *   Parses CSV data using `papaparse`.
    *   Transforms data to categorize additives by regulatory status.
    *   Uses `react-chartjs-2` to render the bar chart.
    *   Shows loading and error states.

#### `WHOVisualization`

*   **Summary**: Displays a line chart of WHO food regulations over time by region.
*   **Usage**: Import `WHOVisualization` component into your React components.
*   **Features**:
    *   Fetches WHO regulation data from `/data/raw/who/food-regulations.json` and `/data/raw/who/foodborne-illness.json`.
    *   Transforms data to show regulations per region over years.
    *   Uses `react-chartjs-2` to render the line chart.
    *   Shows loading and error states.

#### `VisualizationDashboard`

*   **Summary**: Combines `EUVisualization`, `USVisualization`, and `WHOVisualization` into a dashboard.
*   **Usage**: Import `VisualizationDashboard` component to display all visualizations.
*   **Features**:
    *   Arranges visualization components in a grid layout.
    *   Provides a central dashboard view for all visualizations.
    *   Includes key research questions and findings.

#### `FoodRegulationTable`

*   **Summary**: Displays a filterable table comparing food regulations in the US and EU.
*   **Usage**: Import `FoodRegulationTable` component to show the regulation table.
*   **Features**:
    *   Fetches and processes EU and US food regulation data.
    *   Normalizes and combines data for comparison.
    *   Allows filtering by ingredient, category, and regulatory status.
    *   Uses a Bootstrap table to display data with status badges.
    *   Shows loading and error states.

### Services

#### `api.js`

*   **Summary**: Provides API service functions for fetching data.

##### `api.getRegulatoryData()`

*   Fetches and processes regulatory data for US and EU.
*   Returns combined regulation data.

##### `api.getObesityData()`

*   Fetches and processes WHO obesity data.
*   Returns processed obesity trend data.

##### `api.getFoodborneIllnessData()`

*   Fetches and processes foodborne illness data.
*   Returns processed foodborne illness data.

### Utils - Data Transformers

#### `dataTransformers.js`

*   **Summary**: Contains functions to transform raw data for visualizations.

##### `transformEUData(data)`

*   Transforms raw EU food additives data.
*   Groups additives by category and counts them.
*   Returns data formatted for pie charts.

##### `transformUSData(data)`

*   Transforms raw US food additives CSV data.
*   Groups additives by regulatory status and counts them.
*   Returns data formatted for bar charts.

##### `transformWHOData(regulations, foodborne)`

*   Transforms WHO food safety and regulation data.
*   Processes regulations data to count regulations per region and year.
*   Returns data formatted for line charts.

### Utils - Data Processing

#### `dataProcessing.js`

*   **Summary**: Contains functions for processing raw data from local files.

##### `getUSData()`

*   Processes US additive data from CSV files.
*   Categorizes additives into predefined categories.
*   Returns counts for each category.

##### `getEUData()`

*   Processes EU additive data from JSON file.
*   Categorizes additives based on E-numbers and descriptions.
*   Returns counts for each category.

##### `getCombinedRegulationData()`

*   Combines processed US and EU data.
*   Returns combined data for category comparison.

##### `getObesityData()`

*   Processes WHO obesity data from JSON.
*   Transforms data into time series format.
*   Returns processed obesity trend data.

##### `getFoodborneIllnessData()`

*   Processes foodborne illness data from JSON.
*   Returns processed foodborne illness data.

### Dependencies and Requirements

*   `react`
*   `react-dom`
*   `react-router-dom`
*   `axios`
*   `bootstrap`
*   `react-bootstrap`
*   `chart.js`
*   `react-chartjs-2`
*   `d3`
*   `papaparse`