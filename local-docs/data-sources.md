# Data Sources Documentation

## US Data Sources

### FDA Indirect Additives
- **File**: `data/raw/us/IndirectAdditives.csv`
- **Source**: FDA Inventory of Food Contact Substances Listed in 21 CFR
- **Last Updated**: 10/29/2024
- **Downloaded**: 2/10/2025
- **Description**: Contains information about substances that may come into contact with food (like packaging materials)
- **Key Fields**:
  - CAS Registry No.
  - Substance name
  - Regulation references
  - Alternative names/synonyms
  - Regulatory status

## EU Data Sources

### Food Additives Database
- **File**: `data/raw/eu/food-additives.json`
- **Source**: European Union Food Additives Database
- **Description**: Contains information about authorized food additives in the EU
- **Key Components**:
  - E-codes
  - Maximum levels
  - Food categories
  - Legislation references

## WHO Data Sources

### Obesity Data
- **Directory**: `data/raw/who/obesity/`
- **Source**: WHO Global Health Observatory API
- **Files**:
  1. `us-obesity.json`: US-specific obesity data
  2. `eu-obesity.json`: European region obesity data
- **Metrics Include**:
  - Age-standardized obesity prevalence (BMI ≥ 30)
  - Data by gender (male/female/both)
  - Confidence intervals
  - Historical trends (from 1975)
- **Coverage**: 
  - US data
  - All EU member states
  - Additional European countries
- **Key Fields**:
  - Country codes
  - Year
  - Numeric values
  - Confidence intervals
  - Gender breakdown
  - Age groups

### Food Safety Data
- **Directory**: `data/raw/who/`
- **Source**: WHO Global Health Observatory API
- **Files**:
  1. `foodborne-illness.json`: Data on foodborne illnesses per 100,000 people
  2. `food-tax.json`: Information about taxation policies on foods high in fat, sugars, or salt
- **Metrics Include**:
  - Foodborne illness rates
  - Food policy indicators
  - Regional comparisons

## Data Relationships
- The US FDA data provides detailed information about indirect food additives and their regulatory status
- The EU database contains information about authorized food additives and their usage limits
- WHO data provides health outcome metrics (obesity, foodborne illness) that can be correlated with regulatory differences
- Combined, these datasets enable analysis of:
  1. Regulatory differences between US and EU
  2. Health outcomes in different regulatory environments
  3. Temporal trends in both regulations and health metrics
  4. Regional variations in food safety approaches

## Data Quality Notes
- All datasets are from authoritative sources (FDA, EU, WHO)
- WHO data includes confidence intervals for statistical reliability
- Temporal coverage varies by dataset
- Geographic coverage includes US, EU member states, and additional European countries 