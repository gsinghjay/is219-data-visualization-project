# Food Safety Regulation Analysis - US vs EU

## Overview
An analysis of food safety regulatory differences between the US and EU, examining potential health implications through data visualization.

## Essential Question
**How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?**

## Key Focus Areas
- Banned Ingredients Comparison
- Health Outcomes Analysis  
- Regulatory Body Influence

## Project Structure
- [`/data/raw`](data/raw/) - Raw data files from various sources
- [`/local-docs`](local-docs/) - Project documentation
- [`/local-research`](local-research/) - Research notes and data collection strategy

## Data Sources

### Current Data Sources

#### US Sources
- **FDA Indirect Additives Database** - [View Data](data/raw/us/IndirectAdditives.csv)
  - Comprehensive list of substances in food contact materials
  - Includes CAS Registry numbers, regulatory status, and usage conditions
  - Source: [FDA Inventory of Food Contact Substances](https://www.cfsanappsexternal.fda.gov/scripts/fdcc/?set=FoodSubstances)
  - Last Updated: 10/29/2024
  - Downloaded: 2/10/2025
  - [Data Processing Documentation](local-docs/data-sources.md#us-data-sources)

#### EU Sources
- **European Food Additives Database** - [View Data](data/raw/eu/food-additives.json)
  - Authorized food additives with E-codes
  - Maximum usage levels and food categories
  - Detailed legislation references
  - [Data Processing Documentation](local-docs/data-sources.md#eu-data-sources)

#### WHO Global Health Observatory Data
- **Obesity Statistics** - [View Directory](data/raw/who/obesity/)
  - Files:
    - [`us-obesity.json`](data/raw/who/obesity/us-obesity.json): US obesity data (1975-present)
    - [`eu-obesity.json`](data/raw/who/obesity/eu-obesity.json): EU member states obesity data
  - Age-standardized prevalence data
  - Gender-specific metrics
  - Coverage: US and all EU member states
  - [Data Processing Documentation](local-docs/data-sources.md#who-data-sources)
- **Food Safety Metrics** - [View Directory](data/raw/who/)
  - Files:
    - [`foodborne-illness.json`](data/raw/who/foodborne-illness.json): Illness rates per 100,000
    - [`food-tax.json`](data/raw/who/food-tax.json): Food taxation policies
  - Regional health outcome comparisons
  - [Data Collection Strategy](local-research/data-needs.md)

### Additional Resources
- [Data Collection Strategy](local-research/data-needs.md)
- [Comparative Data Sources](local-research/comparative-data-sources.md)
- [Data Portal Links](local-research/data-portal-links.md)

### Planned Additional Sources
- IARC Cancer Statistics Database
- Scientific studies on banned ingredients
- Regulatory policy documents

## Visualizations

### 1. Regulatory Differences
- **Interactive Ingredient Comparison Table**
  - US vs EU status for each ingredient
  - Filterable by category and status
  - Tooltips showing regulatory details
- **Regulatory Divergence Tree Map**
  - Hierarchical view of ingredient categories
  - Color-coded by regulatory status
  - Size based on number of affected products
- **Timeline of Ingredient Status**
  - Historical view of when ingredients were banned/approved
  - Parallel timelines for US and EU

### 2. Health Outcomes Correlation
- **Obesity Trends Dashboard**
  - Line charts showing obesity rates (1975-present)
  - Split by US vs EU countries
  - Gender-specific trends
  - Age group breakdown
- **Geographic Health Map**
  - Choropleth map of obesity rates
  - Toggle between different years
  - Overlay with food regulation zones
- **Food Safety Impact**
  - Bar charts of foodborne illness rates
  - Correlation with regulatory differences
  - Regional comparison heat maps

### 3. Statistical Analysis
- **Correlation Matrix**
  - Relationship between regulations and health outcomes
  - Statistical significance indicators
  - Interactive filters for time periods
- **Scatter Plots**
  - Regulatory strictness vs health metrics
  - Trend lines and confidence intervals
  - Outlier identification
- **Box Plots**
  - Distribution of health outcomes
  - Grouped by regulatory frameworks
  - Statistical test results

### Technical Implementation
- Built with D3.js and React
- Responsive design for all screen sizes
- Interactive filters and tooltips
- Data export capabilities
- Accessible color schemes
- Cross-browser compatible

### Data Updates
- Automatic data refresh when available
- Version tracking for data sources
- Data quality indicators
- Last updated timestamps

## Key Metrics
- Number of banned ingredients in each region
- Health outcomes (obesity rates, foodborne illness)
- Statistical correlations between regulations and outcomes
- Regional variations in health metrics